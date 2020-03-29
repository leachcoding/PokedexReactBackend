const express = require('express');
const router = express.Router();
const dbUsers = require('../auth/auth-model');
const berryDb = require('./berryModel');
const berriesData = require('./berryModel');

// GET all available berries
router.get('/berries', (req, res) => {
    berriesData.getBerries()
        .then( posts =>{
            res.status(200).json(posts);
            console.log(posts);
        })
        .catch(({ name, message, code, stack }) => {
      res.status(404).json({ name, message, code, stack })
    })
})

// gets all berries for single user
router.get('/:id/berries', (req, res) => {

  const { id } = req.params;

  berriesData
    .getBerriesFilter(id)
    .then(berries => {
      res.status(200).json(berries)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })
});


// gets single berry
router.get('/berries/:id', validateBerry, (req, res) => {
  const { id } = req.params;

  berriesData
    .getItemsById(id)
    .then(berry => {
      res.status(200).json(berry)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })

})

// adds berry to database with user id
router.post('/:id/berries/', validateUser, (req, res) => {

  const { id } = req.params;
  const berry = { ...req.body, user_id: id }

  berriesData
    .addBerry(berry)
    .then(berry => {
      res.status(200).json(berry)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })
})

// edits single berry
router.put("/berries/:id", validateBerry, (req, res) => {
  const { id } = req.params
  const changes = { ...req.body}
  berriesData.updateBerry(id, changes)
  .then(berry => {
    console.log(`this is berry`, berry)
    res.status(200).json(berry)
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})

// edits count of berries
router.patch("/berries/:id", validateBerry, (req, res) => {

  const { id } = req.params
  const join = req.body;
  berriesData
    .updateBerryCount(id, join)
  .then(berries=> {
    res.status(200).json({ message: `Count for Berry# ${id} Updated Successfully`, berries})
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})

// deletes an berry
router.delete("/berries/:id", (req, res) => {
  const { id } = req.params
  berriesData.deleteBerry(id)
  .then(berries => {
    res.status(200).json(berries)
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})



// Validation MiddleWare

async function validateUser(req, res, next) {
  // validates all POST requests for new berry (not new user)
  const { id } = req.params;
  const berry = { ...req.body, user_id: id} ;
  console.log(`validate berry:`, berry)

  const userCheck = await dbUsers.getUserById(id)

    !userCheck
    ? res.status(404).json({ message: "User does not exist!" })
    : !berry ?
    res.status(404).json({ message: "Berry does not exist!" })
    : !berry.name || !berry.pokeid || !berry.size || !berry.smoothness || !berry.naturalGiftPower || !berry.soilDryness || !berry.growthTime || !berry.maxHarvest
    ? res.status(406).json({ message: "Please make sure the required fields are completed. " })
    : next();
}

async function validateBerry(req, res, next) {
  // validates all POST requests for new berry (not new user)
  const { id } = req.params;
  const berries = req.body;
  console.log(`validate berry:`, berries)

  const issueCheck = await berryDb.getBerriesById(id)

    !issueCheck
    ? res.status(404).json({ message: "Berry does not exist!" })
    : next();
}



module.exports = router;
