const db = require('../database/dbConfig');

module.exports = {
    getMachines,
    getMachinesById,
    addMachine,
    getMachinesFilter,
    updateMachine,
    deleteMachine,
    updateMachineCount
};

function getMachines() {
  return db('machines');
}

function addMachine(post) {
  return db('machines as m')
    .insert(post)
    .then(ids => {
      console.log('ADD MACHINE', ids)
      const [id] = ids;
      return getMachinesById(id);
    })
}

function getMachinesById(id) {
  return db('machines')
    .select('*')
    .where({id})
    .first()
}

async function updateMachine(id, changes) {
  await db('machines')
  .where({id})
  .update(changes)

  return getMachinesById(id);
}

async function updateMachineCount(id, changes) {
  await db('machines')
  .where({id})
  .update(changes)

  return db('machines')
  .select('count')
  .where({id})
  .first()
}

function deleteMachine(id) {
  return db('machines')
  .where('id', id)
  .delete()
}

function getMachinesFilter(filter) {
  return db('machines')
  .select('*')
  .where('user_id', filter)
}
