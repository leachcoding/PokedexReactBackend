const db = require('../database/dbConfig');

module.exports={
    registerUser,
    getUserById,
    getUsers,
    userLogin
}



// Users
function getUsers() {
    return db('users')
        .select('id', 'username')
}

function userLogin(user){
  return db('users').where(user)
}

function getUserById(id) {
  return db('users')
    .select('id', 'username')
    .where({id})
    .first();
}

function registerUser(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return getUserById(id)
    })
}
