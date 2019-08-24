//import library express
const express = require("express");
const pokemonsRouter = require('./pokemons/router')
//create express app
const app = express();

app.use(express.json());
app.use(pokemonsRouter) 

app.get('/', (req, res) => res.send({ message: 'Hello World!!' }));

module.exports = app