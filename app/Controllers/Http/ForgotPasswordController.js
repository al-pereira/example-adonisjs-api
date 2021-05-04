'use strict'

const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email')

      const user = await User.findBy('email', email)

      if (!user) {
        return response.status(400).send({ message: 'E-mail não existe' })
      }

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        (message) => {
          message
            .to(user.email)
            .from('andre@alpsoft.com.br', 'André | Alpsoft')
            .subject('Recuperação de senhha')
        }
      )
    } catch (err) {
      return response.status(err.status).send({ message: err.message })
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all()

      const user = await User.findBy('token', token)

      // Check if token exists to user
      if (!user) {
        return response.status(400).send({ message: 'Token não existe' })
      }

      // Check if token does not expired
      const tokenExpired = moment()
        .subtract('1', 'day')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ message: 'Token de recuperação expirado' })
      }

      // If passed on verification above
      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
    } catch (err) {
      return response.status(err.status).send({ message: err.message })
    }
  }
}

module.exports = ForgotPasswordController
