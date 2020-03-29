exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('username', 128).unique().notNullable();
      tbl.string('password', 256).notNullable();
      tbl.string('user_type');
  })

  .createTable('items', tbl => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.integer('pokeid');
    tbl.integer('costAmount');
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('pokeid')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl.integer('total_count');
    tbl.integer('count').defaultTo(0);
  })

  .createTable('machines', tbl => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.integer('pokeid');
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('pokeid')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl.integer('count').defaultTo(0);
    tbl.string('move').notNullable();
  })

  .createTable('berries', tbl => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.integer('pokeid');
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('pokeid')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl.integer('size');
    tbl.integer('smoothness');
    tbl.integer('naturalGiftPower');
    tbl.integer('soilDryness');
    tbl.integer('growthTime');
    tbl.integer('maxHarvest');
    tbl.integer('count').defaultTo(0);
  })

  .createTable('pokemon', tbl => {
    tbl.increments();
    tbl.integer('pokeid');
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
    tbl.string('abilities1').notNullable();
    tbl.string('abilities2').notNullable();
    tbl.string('abilities3').notNullable();
    tbl.string('moves1').notNullable();
    tbl.string('moves2').notNullable();
    tbl.string('moves3').notNullable();
    tbl.string('moves4').notNullable();
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('pokeid')
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
