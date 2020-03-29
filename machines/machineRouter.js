const express = require('express');
const router = express.Router();
const dbUsers = require('../auth/auth-model');
const machineDb = require('./machineModel');
const machinesData = require('./machineModel');

// GET all available machines
router.get('/machines', (req, res) => {
    machinesData.getMachines()
        .then( posts =>{
            res.status(200).json(posts);
            console.log(posts);
        })
        .catch(({ name, message, code, stack }) => {
      res.status(404).json({ name, message, code, stack })
    })
})

// gets all machines for single user
router.get('/:id/machines', (req, res) => {

  const { id } = req.params;

  machinesData
    .getMachinesFilter(id)
    .then(machines => {
      res.status(200).json(machines)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })
});


// gets single machine
router.get('/machines/:id', validateMachine, (req, res) => {
  const { id } = req.params;

  machinesData
    .getMachinesById(id)
    .then(machine => {
      res.status(200).json(machine)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })

})

// adds machineto database with user id
router.post('/:id/machines/', validateUser, (req, res) => {

  const { id } = req.params;
  const machine = { ...req.body, user_id: id }

  machinesData
    .addBerry(machine)
    .then(machine => {
      res.status(200).json(machine)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })
})

// edits single machine
router.put("/machines/:id", validateMachine, (req, res) => {
  const { id } = req.params
  const changes = { ...req.body}
  machinesData.updateMachine(id, changes)
  .then(machine => {
    console.log(`this is machine`, machine)
    res.status(200).json(machine)
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})

// edits count of machines
router.patch("/machines/:id", validateMachine, (req, res) => {

  const { id } = req.params
  const join = req.body;
  machinesData
    .updateMachineCount(id, join)
  .then(machines=> {
    res.status(200).json({ message: `Count for Machine# ${id} Updated Successfully`, machines})
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})

// deletes an machine
router.delete("/machines/:id", (req, res) => {
  const { id } = req.params
  machinesData.deleteMachine(id)
  .then(machines => {
    res.status(200).json(machines)
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})



// Validation MiddleWare

async function validateUser(req, res, next) {
  // validates all POST requests for new machine (not new user)
  const { id } = req.params;
  const machine = { ...req.body, user_id: id} ;
  console.log(`validate machine:`, machine)

  const userCheck = await dbUsers.getUserById(id)

    !userCheck
    ? res.status(404).json({ message: "User does not exist!" })
    : !machine ?
    res.status(404).json({ message: "Machine does not exist!" })
    : !machine.name || !machine.pokeid || !machine.move
    ? res.status(406).json({ message: "Please make sure the required fields are completed. " })
    : next();
}

async function validateMachine(req, res, next) {
  // validates all POST requests for new machine (not new user)
  const { id } = req.params;
  const machines = req.body;
  console.log(`validate machine:`, machines)

  const issueCheck = await machineDb.getMachinesById(id)

    !issueCheck
    ? res.status(404).json({ message: "Machine does not exist!" })
    : next();
}



module.exports = router;
