'use strict'

const moment = use('moment')
const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static formatDates(field, value) {
    return moment(value).utc().format('YYYY-MM-DD HH:mm:ssZZ')
  }

  static get hidden() {
    return ['password']
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  projects() {
    return this.hasMany('App/Models/Project')
  }

  tasks() {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = User
