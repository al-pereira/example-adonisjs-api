'use strict'

const Schema = use('Schema')

class TaskSchema extends Schema {
  async up() {
    await this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    this.create('tasks', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'))
      table
        .uuid('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.text('description')
      table.timestamp('due_date', { useTz: false })
      table.timestamp('created_at', { useTz: false }).defaultTo(this.fn.now())
      table.timestamp('updated_at', { useTz: false }).defaultTo(this.fn.now())
    })
  }

  down() {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
