exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('username', 128).unique().notNullable();
      tbl.string('password', 256).notNullable();
      tbl.string('user_type');
  })

  .createTable('items', tbl => {
    tbl.string('name').notNullable();
    tbl.integer('id');
    tbl.integer('cost');
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl.integer('total_count');
    tbl.integer('count').defaultTo(0);
  })

  .createTable('machines', tbl => {
    tbl.string('name').notNullable();
    tbl.integer('id');
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl.integer('count').defaultTo(0);
    tbl.string('mega-punch').notNullable();
  })

  .createTable('berries', tbl => {
    tbl.string('name').notNullable();
    tbl.integer('id');
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl.integer('size');
    tbl.integer('smoothness');
    tbl.integer('naturalGiftPower');
    tbl.integer('soilDryness');
    tbl.integer('growthTime');
    tbl.integer('maxHarvest');
  })

  .createTable('pokemon', tbl => {
    tbl.integer('id');
    tbl.string('name').notNullable();
    tbl.string('img').notNullable();
    tbl.integer('height');
    tbl.integer('weight');
    tbl.specificType('types', 'text ARRAY');
    tbl.integer('speed');
    tbl.integer('specialAttack');
    tbl.integer('specialDefense');
    tbl.integer('defense');
    tbl.integer('attack');
    tbl.integer('hp');
    tbl.specificType('abilities', 'text ARRAY');
    tbl.specificType('moves', 'text ARRAY');
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('pokemon')
    .dropTableIfExists('berries')
    .dropTableIfExists('machines')
    .dropTableIfExists('items')
    .dropTableIfExists('users')
};
