'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async index({ request }) {
    const { page } = request.get()

    const projects = await Project.query().with('user').paginate(page)

    return projects
  }

  async store({ request, response, auth }) {
    try {
      const data = request.only(['title', 'description'])

      const project = await Project.create({ ...data, user_id: auth.user.id })

      return project
    } catch (err) {
      return response.status(err.status).send({ message: err.message })
    }
  }

  async show({ params, response }) {
    try {
      const project = await Project.find(params.id)

      if (!project) {
        return response.status(400).send({ message: 'Projeto não encontrado.' })
      }

      await project.load('user')
      await project.load('tasks')

      return project
    } catch (err) {
      return response.status(err.status).send({ message: err.message })
    }
  }

  async update({ params, request, response }) {
    try {
      const project = await Project.find(params.id)

      if (!project) {
        return response.status(400).send({ message: 'Projeto não encontrado' })
      }

      const data = request.only(['title', 'description'])

      project.merge(data)

      await project.save()

      return project
    } catch (err) {
      return response.status(err.status).send({ message: err.message })
    }
  }

  async destroy({ params, response }) {
    try {
      const project = await Project.find(params.id)

      if (!project) {
        return response.status(400).send({ message: 'Projeto não encontrado' })
      }

      await project.delete()
    } catch (err) {
      return response.status(err.status).send({ message: err.message })
    }
  }
}

module.exports = ProjectController
