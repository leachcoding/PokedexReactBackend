exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {

  tbl.increments();
  tbl.string('username', 128).unique().notNullable();
    tbl.string('password', 256).notNullable();
    tbl.string('user_type');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
};
