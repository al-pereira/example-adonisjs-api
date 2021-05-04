'use strict'

const moment = use('moment')
const Model = use('Model')
const Env = use('Env')

class File extends Model {
  // Fix problem with timezone
  static formatDates(field, value) {
    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ssZZ'
    return moment(value).utc().format(DATE_FORMAT)
  }

  static get computed() {
    return ['url']
  }

  getUrl({ id }) {
    return `${Env.get('APP_URL')}/files/${id}`
  }
}

module.exports = File
