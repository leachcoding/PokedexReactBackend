exports.seed = function (knex) {
  return knex('').truncate()
    .then(function () {
        return knex('').insert([
          {
            id: 1,
            name: bulbasaur,
            img: '',
            height: 0.7,
            weight: 6.9,
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
