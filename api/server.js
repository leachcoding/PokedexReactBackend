const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');

const berryRouter = require('../berries/berryRouter.js');
const itemRouter = require('../items/itemRouter.js');
// const machineRouter = require('../machines/machineRouter.js');
// const pokemonRouter = require('../pokemon/pokemonRouter.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ test: "LISTENING" })
})

server.use('/api/auth', authRouter); // For the trainer

 server.use('/api/berries', berryRouter); // For the berries
server.use('/api/items', itemRouter); // For the items
// server.use('/api/machines', machineRouter); // For the machines
// server.use('/api/pokemon', pokemonRouter); // For the pokemon

module.exports = server;
