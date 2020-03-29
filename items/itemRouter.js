const express = require('express');
const router = express.Router();
const dbUsers = require('../auth/auth-model');
const itemDb = require('./itemModel');
const itemsData = require('./itemModel');

// GET all available items

router.get('/items', (req, res) => {
    itemsData.getItems()
        .then( posts =>{
            res.status(200).json(posts);
            console.log(posts);
        })
        .catch(({ name, message, code, stack }) => {
      res.status(404).json({ name, message, code, stack })
    })
})

// gets all items for single user
router.get('/:id/items', (req, res) => {

  const { id } = req.params;

  itemsData
    .getItemsFilter(id)
    .then(items => {
      res.status(200).json(items)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })
});


// gets single item
router.get('/items/:id', validateItem, (req, res) => {
  const { id } = req.params;

  itemsData
    .getItemsById(id)
    .then(item => {
      res.status(200).json(item)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })

})

// adds item to database with user id
router.post('/:id/items/', validateUser, (req, res) => {

  const { id } = req.params;
  const item = { ...req.body, user_id: id }

  itemsData
    .addItem(item)
    .then(item => {
      res.status(200).json(item)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })
})

// edits single item
router.put("/items/:id", validateItem, (req, res) => {
  const { id } = req.params
  const changes = { ...req.body}
  itemsData.updateItem(id, changes)
  .then(item => {
    console.log(`this is item`, item)
    res.status(200).json(item)
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})

// edits current_attendees of items
router.patch("/items/:id", validateItem, (req, res) => {

  const { id } = req.params
  const join = req.body;
  itemsData
    .updateItemCount(id, join)
  .then(items=> {
    res.status(200).json({ message: `Count for Item# ${id} Updated Successfully`, items})
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})

// deletes an item
router.delete("/items/:id", (req, res) => {
  const { id } = req.params
  itemsData.deleteItem(id)
  .then(items => {
    res.status(200).json(items)
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})



// Validation MiddleWare

async function validateUser(req, res, next) {
  // validates all POST requests for new item (not new user)
  const { id } = req.params;
  const item = { ...req.body, user_id: id} ;
  console.log(`validate item:`, item)

  const userCheck = await dbUsers.getUserById(id)

    !userCheck
    ? res.status(404).json({ message: "User does not exist!" })
    : !item ?
    res.status(404).json({ message: "Item does not exist!" })
    : !item.name || !item.id || !item.cost || !item.total_count
    ? res.status(406).json({ message: "Please make sure the required fields are completed. " })
    : next();
}

async function validateItem(req, res, next) {
  // validates all POST requests for new ISSUE (not new user)
  const { id } = req.params;
  const items = req.body;
  console.log(`validate item:`, items)

  const issueCheck = await itemDb.getItemsById(id)

    !issueCheck
    ? res.status(404).json({ message: "Item does not exist!" })
    : next();
}



module.exports = router;
