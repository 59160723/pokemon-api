
let pokemons = []

class Pokemon {
   constructor(name, type) {
       this.name = name
       this.type = type
       this.id = null
       this.type2 = null
   }
}

function mockPokemon() {
   pokemons.push(createPokemon('Kirlia', 'Psychic'))
   pokemons.push(createPokemon('Ralts', 'Psychic'))
}

function generateNewId(num) {
   let newId = num + 1
   return newId
}

function savePokemon(name, type) {
   let p = createPokemon(name, type)
   pokemons.push(p)
   return true
}

function createPokemon(name, type) {
   let p = new Pokemon(name, type)
   p.id = generateNewId(pokemons.length)
   return p
}

function isPokemonExitsted(id) {
   return pokemons[id - 1] !== undefined && pokemons[id - 1] !== null
}

function getPokemons() {
   return pokemons
}

function getPokemon(id) {
   let p = pokemons[id - 1]
   return p
}

function update(pokemon) {
   pokemons[pokemon.id - 1] = pokemon
   return true
}

mockPokemon()

module.exports.isPokemonExitsted = isPokemonExitsted
module.exports.savePokemon = savePokemon
module.exports.getPokemons = getPokemons
module.exports.getPokemon = getPokemon
module.exports.update = update
