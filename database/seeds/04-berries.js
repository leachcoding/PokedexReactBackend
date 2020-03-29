 exports.seed = function (knex) {
   return knex('berries').truncate()
     .then(function () {
         return knex('berries').insert([
           {
             name: 'chesto',
             pokeid: 2,
             user_id: 1,
             size: 80,
             smoothness: 25,
             naturalGiftPower: 60,
             soilDryness: 15,
             growthTime: 3,
             maxHarvest: 5,
             count: 2
           }
         ]);
     });
 };
