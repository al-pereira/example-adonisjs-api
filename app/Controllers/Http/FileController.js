'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
  async show({ params, response }) {
    try {
      const file = await File.find(params.id)

      if (!file) {
        return response.status(400).send({ message: 'Arquivo não encontrado' })
      }

      // makes available to download
      return response.download(Helpers.tmpPath(`uploads/${file.file}`))
    } catch (err) {
      return response.status(err.status).send({ message: err.message })
    }
  }

  async store({ request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', { size: '2mb' })

      const newFileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: newFileName
      })

      // Checks if moved the file
      if (!upload.moved()) {
        throw upload.error
      }

      // Creates register on database
      const file = await File.create({
        file: newFileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (err) {
      response.status(err.status).send({ message: err.message })
    }
  }
}

module.exports = FileController
