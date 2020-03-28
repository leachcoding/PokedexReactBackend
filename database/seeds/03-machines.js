exports.seed = function (knex) {
  return knex('').truncate()
    .then(function () {
        return knex('').insert([
          {
            name: 'tm01',
            id: 2,
            user_id: 1,
            count: 1,
            move: 'mega-punch'
          }
        ]);
    });
};
