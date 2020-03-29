const db = require('../database/dbConfig');

module.exports = {
    getBerries,
    getBerriesById,
    addBerry,
    getBerryFilter,
    updateBerry,
    deleteBerry,
    updateBerryCount
};

function getBerries() {
  return db('berries');
}

function addBerry(post) {
  return db('berries as i')
    .insert(post)
    .then(ids => {
      console.log('ADD ITEM', ids)
      const [id] = ids;
      return getBerriesById(id);
    })
}

function getBerriesById(id) {
  return db('berries')
    .select('*')
    .where({id})
    .first()
}

async function updateBerry(id, changes) {
  await db('berries')
  .where({id})
  .update(changes)

  return getBerriesById(id);
}

async function updateBerryCount(id, changes) {
  await db('berries')
  .where({id})
  .update(changes)

  return db('berries')
  .select('count')
  .where({id})
  .first()
}

function deleteBerry(id) {
  return db('berries')
  .where('id', id)
  .delete()
}

function getBerriesFIlter(filter) {
  return db('berries')
  .select('*')
  .where('user_id', filter)
}
