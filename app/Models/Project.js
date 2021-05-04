'use strict'

const Model = use('Model')

class Project extends Model {
  // relationships
  user() {
    return this.belongsTo('App/Models/User')
  }

  tasks() {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
