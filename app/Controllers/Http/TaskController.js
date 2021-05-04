'use strict'

const Task = use('App/Models/Task')
const Project = use('App/Models/Project')

class TaskController {
  async index({ params }) {
    const tasks = await Task.query()
      .where('project_id', params.projects_id)
      .with('user')
      .fetch()

    return tasks
  }

  async store({ params, request, response }) {
    try {
      const project = await Project.find(params.projects_id)

      if (!project) {
        return response.status(400).send({ message: 'Projeto não encontrado' })
      }

      const data = request.only([
        'user_id',
        'title',
        'description',
        'due_date',
        'file_id'
      ])

      const task = await Task.create({
        ...data,
        project_id: project.id
      })

      return task
    } catch (err) {
      return response.status(err.status).send({ message: err.message })
    }
  }

  async show({ params, response }) {
    try {
      const task = await Task.find(params.id)

      if (!task) {
        return response.status(400).send({ message: 'Tarefa não encontrada' })
      }

      return task
    } catch (err) {
      return response.status(err.status).send({ message: err.message })
    }
  }

  async update({ params, request, response }) {
    try {
      const task = await Task.find(params.id)

      if (!task) {
        return response.status(400).send({ message: 'Tarefa não encontrada' })
      }

      const data = request.only([
        'user_id',
        'title',
        'description',
        'due_date',
        'file_id'
      ])

      task.merge(data)

      await task.save()

      return task
    } catch (err) {
      return response.status(err.status).send({ message: err.message })
    }
  }

  async destroy({ params, response }) {
    try {
      const task = await Task.find(params.id)

      if (!task) {
        return response.status(400).send({ message: 'Tarefa não encontrada' })
      }

      await task.delete()
    } catch (err) {
      return response.status(err.status).send({ message: err.message })
    }
  }
}

module.exports = TaskController
