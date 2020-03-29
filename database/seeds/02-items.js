exports.seed = function (knex) {
  return knex('items').truncate()
    .then(function () {
        return knex('items').insert([
          {
            name: 'timer-ball',
            pokeid: 10,
            costAmount: 1000,
            user_id: 1,
            total_count: 2000,
            count: 2
          }
        ]);
    });
};
