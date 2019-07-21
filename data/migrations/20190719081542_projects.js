
exports.up = function(knex) {
    return knex.schema.createTable('projects', tbl => {
        tbl.increments()
  
        tbl
          .string('project_name')
          .notNullable()
          .unique()

        tbl
          .string('project_description')
          .notNullable()   
    })

    .createTable('actions', tbl => {
        tbl.increments()
        
        tbl
            .string('action_description')
            .notNullable()
    
        tbl
            .string('action_notes')
            .notNullable()

        tbl
            .integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
    })

    .createTable('project_actions', tbl => {
        tbl.increments()
    
        tbl
            .integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        
    
        tbl
            .integer('actions_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('actions')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('actions')
    .dropTableIfExists('project_actions')
};
