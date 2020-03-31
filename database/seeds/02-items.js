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
          },
          {
            name: 'master-ball',
            pokeid: 1,
            costAmount: 0,
            user_id: 3,
            total_count: 0,
            count: 8

          },
          {
            name: 'heal-ball',
            pokeid: 14,
            costAmount: 300,
            user_id: 1,
            total_count: 1500,
            count: 5

          },
          {
            name: 'antidote',
            pokeid: 18,
            costAmount: 200,
            user_id: 1,
            total_count: 4200,
            count: 21

          },
          {
            name: 'abomasite',
            pokeid: 713,
            costAmount: 0,
            user_id: 2,
            total_count: 0,
            count: 14

          },
          {
            name: 'poke-toy',
            pokeid: 618,
            costAmount: 100,
            user_id: 2,
            total_count: 5600,
            count: 56

          },
          {
            name: 'ghost-gem',
            pokeid: 603,
            costAmount: 200,
            user_id: 2,
            total_count: 4600,
            count: 23

          },
          {
            name: 'level-ball',
            pokeid: 450,
            costAmount: 0,
            user_id: 3,
            total_count: 0,
            count: 2

          },
          {
            name: 'zinc',
            pokeid: 52,
            costAmount: 10000,
            user_id: 1,
            total_count: 950000,
            count: 95

          },
          {
            name: 'iron',
            pokeid: 47,
            costAmount: 10000,
            user_id: 23,
            total_count: 210000,
            count: 21

          }
        ]);
    });
};
