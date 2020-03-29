 exports.seed = function (knex) {
   return knex('pokemon').truncate()
     .then(function () {
         return knex('pokemon').insert([
           {
             pokeid: 1,
             name: 'bulbasaur',
             img: 'https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif',
             height: 7,
             weight: 69,
             types: ['poison', 'grass'],
             speed: 45,
             specialAttack: 65,
             specialDefense: 65,
             defense: 45,
             attack: 49,
             hp: 45,
             abilities: ['chlorophyll', 'overgrow'],
             moves: ['razor-wind', 'swords-dance', 'cut', 'bind'],
             user_id: 1
           }
         ]);
     });
 };
