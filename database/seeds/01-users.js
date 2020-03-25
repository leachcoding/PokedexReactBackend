const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        { username: "Trainer1", password: bcrypt.hashSync("password", 16), user_type: 'user' },
        { username: "Trainer2", password: bcrypt.hashSync("password", 16), user_type: 'user' },
        { username: "Trainer3", password: bcrypt.hashSync('password', 16), user_type: 'user'}
      ]);
    });
};
