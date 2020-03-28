exports.seed = function (knex) {
  return knex('items').truncate()
    .then(function () {
        return knex('items').insert([
          {
            name: 'timer-ball',
            id: 10,
            cost: 1000,
            user_id: 1,
            total_count: cost * count,
            count: 2
          }
        ]);
    });
};
