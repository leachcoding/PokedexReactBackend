const db = require('../database/dbConfig');

module.exports = {
    getItems,
    getItemsById,
    addItem,
    getItemsFilter,
    updateItem,
    deleteItem,
    updateItemCount
};

function getItems() {
  return db('items');
}

function addItem(post) {
  return db('items as i')
    .insert(post)
    .then(ids => {
      console.log('ADD ITEM', ids)
      const [id] = ids;
      return getItemsById(id);
    })
}

function getItemsById(id) {
  return db('items')
    .select('*')
    .where({id})
    .first()
}

async function updateItem(id, changes) {
  await db('classes')
  .where({id})
  .update(changes)

  return getClassesById(id);
}

async function updateItemCount(id, changes) {
  await db('items')
  .where({id})
  .update(changes)

  return db('items')
  .select('count')
  .where({id})
  .first()
}

function deleteItem(id) {
  return db('items')
  .where('id', id)
  .delete()
}

function getItemsFilter(filter) {
  return db('items')
  .select('*')
  .where('user_id', filter)
}
