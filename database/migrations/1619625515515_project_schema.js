'use strict'

const Schema = use('Schema')

class ProjectSchema extends Schema {
  async up() {
    await this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    this.create('projects', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'))
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.timestamp('created_at', { useTz: false }).defaultTo(this.fn.now())
      table.timestamp('updated_at', { useTz: false }).defaultTo(this.fn.now())
    })
  }

  down() {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
