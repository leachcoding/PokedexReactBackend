const express = require('express');
const router = express.Router();
const dbUsers = require('../auth/auth-model');
const pokemonDb = require('./pokemonModel');
const pokemonData = require('./pokemonModel');

// GET all available pokemon
router.get('/pokemon', (req, res) => {
    pokemonData.getPokemon()
        .then( posts =>{
            res.status(200).json(posts);
            console.log(posts);
        })
        .catch(({ name, message, code, stack }) => {
      res.status(404).json({ name, message, code, stack })
    })
})

// gets all pokemon for single userpokemon
router.get('/:id/pokemon', (req, res) => {

  const { id } = req.params;

  pokemonData
    .getPokemonFilter(id)
    .then(pokemon => {
      res.status(200).json(pokemon)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })
});


// gets single pokemon
router.get('/pokemon/:id', validatePokemon, (req, res) => {
  const { id } = req.params;

  pokemonData
    .getPokemonById(id)
    .then(pokemon => {
      res.status(200).json(pokemon)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })

})

// addspokemon to database with user id
router.post('/:id/pokemon/', validateUser, (req, res) => {

  const { id } = req.params;
  const pokemon = { ...req.body, user_id: id }

  pokemonData
    .addPokemon(pokemon)
    .then(pokemon=> {
      res.status(200).json(pokemon)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })
})

// edits single pokemon
router.put("/pokemon/:id", validatePokemon, (req, res) => {
  const { id } = req.params
  const changes = { ...req.body}
  pokemonData.updatePokemon(id, changes)
  .then(pokemon => {
    console.log(`this is pokemon`, pokemon)
    res.status(200).json(pokemon)
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})

// deletes an pokemon
router.delete("/pokemon/:id", (req, res) => {
  const { id } = req.params
  pokemonData.deletePokemon(id)
  .then(pokemon => {
    res.status(200).json(pokemon)
  })
  .catch(({ name, message, code, stack }) => {
    res.status(500).json({ name, message, code, stack })
  })
})



// Validation MiddleWare

async function validateUser(req, res, next) {
  // validates all POST requests for new berry (not new user)
  const { id } = req.params;
  const pokemon = { ...req.body, user_id: id} ;
  console.log(`validate pokemon:`, pokemon)

  const userCheck = await dbUsers.getUserById(id)

    !userCheck
    ? res.status(404).json({ message: "User does not exist!" })
    : !pokemon ?
    res.status(404).json({ message: "Berry does not exist!" })
    : !pokemon.name || !pokemon.pokeid || !pokemon.img || !pokemon.height || !pokemon.weight || !pokemon.types || !pokemon.speed || !pokemon.specialAttack || !pokemon.specialDefense || !pokemon.defense || !pokemon.attack || !pokemon.hp || !pokemon.abilities || !pokemon.moves
    ? res.status(406).json({ message: "Please make sure the required fields are completed. " })
    : next();
}

async function validatePokemon(req, res, next) {
  // validates all POST requests for new pokemon (not new user)
  const { id } = req.params;
  const pokemon = req.body;
  console.log(`validate pokemon:`, pokemon)

  const issueCheck = await pokemonDb.getPokemonById(id)

    !issueCheck
    ? res.status(404).json({ message: "Pokemon does not exist!" })
    : next();
}



module.exports = router;
