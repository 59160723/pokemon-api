const express = require('express')
const router = express.Router()
const pokemon = require('./pokemon')


function isSufficientParam(v) {
   return v !== undefined && v !== '' && v !== null
}


router.get('/pokemons', (req, res) => res.send(pokemon.getPokemons()))

router.post('/pokemons', (req, res) => {
   if (!isSufficientParam(req.body.name) || !isSufficientParam(req.body.type)) {
       res.status(400).send({ error: 'Insufficient parameters: name and type are required parameter' })
       return //return for make sure is end API stage in this case
   }

   let success = pokemon.savePokemon(req.body.name, req.body.type)
   if (!success) {
       res.status(400).send({ error: 'Create pokemon is unsuccessfully: invalid parameters' })
   }
   res.sendStatus(201)
})

router.get('/pokemon/:id', (req, res) => {
   if (!isSufficientParam(req.params.id)) {
       res.status(400).send({ error: 'Insufficient parameters: id are required parameter' })
       return
   }

   let id = req.params.id
   if (!pokemon.isPokemonExitsted(id)) {
       res.status(400).send({ error: 'The Pokemon could be not found' })
       return
   }

   res.send(pokemon.getPokemon(id))
})

router.put('/pokemon/:id', (req, res) => {
   if (!isSufficientParam(req.body.type2)) {
       res.status(400).send({ error: 'Insufficient parameters: type2 are required parameter' })
       return
   }

   if (!isSufficientParam(req.params.id)) {
       res.status(400).send({ error: 'Insufficient parameters: id are required parameter' })
       return
   }

   let id = req.params.id

   if (!pokemon.isPokemonExitsted(id)) {
       res.status(400).send({ error: 'Cannot update pokemon: Pokemon is not found' })
       return
   }

   let p = pokemon.getPokemon(id)

   p.type2 = req.body.type2
   let success = pokemon.update(p)

   if (!success) {
       res.status(400).send({ error: 'Update type2 is unsuccessfully' })
   }
   res.sendStatus(200)
})

router.delete('/pokemon/:id', (req, res) => {
   if (!isSufficientParam(req.params.id)) {
       res.status(400).send({ error: 'Insufficient parameters: id are required parameter' })
       return
   }
   let id = req.params.id
   if (!pokemon.isPokemonExitsted(id)) {
       res.status(400).send({ error: 'Cannot delete pokemon: Pokemon is not found' })
       return
   }

   delete pokemons[id - 1]
   res.sendStatus(204)
})

module.exports = router
