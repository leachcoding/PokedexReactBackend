const express = require('express');
const router = express.Router();
const dbUsers = require('../auth/auth-model');
const classDb = require('./classModel');
const classesData = require('./classModel');


//GET all available classes

router.get('/classes', (req, res) => {
    classesData.getClasses()
        .then( posts =>{
            res.status(200).json(posts);
            console.log(posts);
        })
        .catch(({ name, message, code, stack }) => {
      res.status(404).json({ name, message, code, stack })
    })
})

// gets all classes for single user
router.get('/:id/classes', (req, res) => {

  const { id } = req.params;

  classesData
    .getClassesFilter(id)
    .then(classes => {
      res.status(200).json(classes)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })
});


// gets single class
router.get('/classes/:id', validateClass, (req, res) => {
  const { id } = req.params;

  classesData
    .getClassesById(id)
    .then(issue => {
      res.status(200).json(issue)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })

})

// adds class to database with user id
router.post('/:id/classes/', validateUser, (req, res) => {

  const { id } = req.params;
  const issue = { ...req.body, user_id: id }

  classesData
    .addClass(issue)
    .then(issue => {
      res.status(200).json(issue)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })
})

// edits single class
router.put("/classes/:id", validateClass, (req, res) => {
  const { id } = req.params
  const changes = { ...req.body}
  classesData.updateClass(id, changes)
  .then(issue => {
    console.log(`this is class`, issue)
    res.status(200).json(issue)
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})

// edits current_attendees of classes
router.patch("/classes/:id", validateClass, (req, res) => {

  const { id } = req.params
  const join = req.body;
  classesData
    .updateClassSize(id, join)
  .then(classes=> {
    res.status(200).json({ message: `Attendees for Class# ${id} Updated Successfully`, classes})
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})

// deletes an issue
router.delete("/classes/:id", (req, res) => {
  const { id } = req.params
  classesData.deleteClass(id)
  .then(classes => {
    res.status(200).json(classes)
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})



// Validation MiddleWare

async function validateUser(req, res, next) {
  // validates all POST requests for new ISSUE (not new user)
  const { id } = req.params;
  const issue = { ...req.body, user_id: id} ;
  console.log(`validate issue:`, issue)

  const userCheck = await dbUsers.getUserById(id)

    !userCheck
    ? res.status(404).json({ message: "User does not exist!" })
    : !issue ?
    res.status(404).json({ message: "Class does not exist!" })
    : !issue.title || !issue.description || !issue.type || !issue.start || !issue.location || !issue.intensity || !issue.max_class
    ? res.status(406).json({ message: "Please make sure the required fields are completed. " })
    : next();
}

async function validateClass(req, res, next) {
  // validates all POST requests for new ISSUE (not new user)
  const { id } = req.params;
  const classes = req.body;
  console.log(`validate class:`, classes)

  const issueCheck = await classDb.getClassesById(id)

    !issueCheck
    ? res.status(404).json({ message: "Class does not exist!" })
    : next();
}



module.exports = router;
