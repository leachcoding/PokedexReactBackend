 exports.seed = function (knex) {
   return knex('machines').truncate()
     .then(function () {
         return knex('machines').insert([
           {
             name: 'tm01',
             pokeid: 2,
             user_id: 1,
             count: 1,
             move: 'mega-punch'
           }
         ]);
     });
 };
