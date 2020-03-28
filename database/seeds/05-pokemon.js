exports.seed = function (knex) {
  return knex('').truncate()
    .then(function () {
        return knex('').insert([
          {}
        ]);
    });
};
