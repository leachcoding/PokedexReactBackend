const db = require('../database/dbConfig');

module.exports = {
    getPokemon,
    getPokemonById,
    addPokemon,
    getPokemonFilter,
    updatePokemon,
    deletePokemon
};

function getPokemon() {
  return db('pokemon');
}

function addPokemon(post) {
  return db('pokemon as p')
    .insert(post)
    .then(ids => {
      console.log('ADD Pokemon', ids)
      const [id] = ids;
      return getPokemonById(id);
    })
}

function getPokemonById(id) {
  return db('pokemon')
    .select('*')
    .where({id})
    .first()
}

async function updatePokemon(id, changes) {
  await db('pokemon')
  .where({id})
  .update(changes)

  return getPokemonById(id);
}

function deletePokemon(id) {
  return db('pokemon')
  .where('id', id)
  .delete()
}

function getPokemonFilter(filter) {
  return db('pokemon')
  .select('*')
  .where('user_id', filter)
}
