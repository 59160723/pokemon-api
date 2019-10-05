const mongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const DB_URL = 'mongodb+srv://59160723:Each0885265689@cluster0-ndwf8.gcp.mongodb.net/admin?retryWrites=true&w=majority'
const DB_NAME = 'example'
const options = { useNewUrlParser: true, useUnifiedTopology: true }
let pokemons = []

class Pokemon {
    constructor(name, type) {
        this.name = name
        this.type = type
        this.id = null
        this.type2 = null
    }
}
async function connectDatabase() {
    client = await mongoClient.connect(DB_URL, options).catch(err => console.error(err))
    return client
}
async function getCollection(name) {
    client = await connectDatabase().catch(err => console.error(err))
    database = client.db(DB_NAME)
    collection = database.collection(name)
    return collection
}

function mockPokemon() {
    pokemons.push(createPokemon('Kirlia', 'Psychic'))
    pokemons.push(createPokemon('Ralts', 'Psychic'))
}

function generateNewId(num) {
    let newId = num + 1
    return newId
}
async function getPokemons() {
    //  var collection, database
    //  var client = await mongoClient.connect(DB_URL, options).catch(err => console.error(err))
    //  database = client.db(DB_NAME)
    //  collection = database.collection('pokemons')




    var collection = await getCollection('pokemons')
    try {
        var result = await collection.find({}).toArray()
        return result
    } catch (err) {
        console.error(err)
        return null
    } finally {
        client.close()
    }

}

async function getPokemon(id) {

    // db.inventory.find( { status: "D" } )

    var collection = await getCollection('pokemons')
    try {
        var result = await collection.findOne({ _id: ObjectID(id) })
        return result
    } catch (err) {
        console.error(err)
        return err
    } finally {
        client.close()
    }

}


async function savePokemon(name, type) {
    let p = createPokemon(name, type)

    //  var collection, database
    //  var client = await mongoClient.connect(DB_URL, options).catch(err => console.error(err))
    //  database = client.db(DB_NAME)
    //  collection = database.collection('pokemons')
    var collection = await getCollection('pokemons')


    try {
        var result = await collection.insert(p)
        return true
    } catch (err) {
        console.error(err)
        return false
    } finally {
        client.close()
    }
}

function createPokemon(name, type) {
    let p = new Pokemon(name, type)
    p.id = generateNewId(pokemons.length)
    return p
}

function isPokemonExitsted(id) {
    return pokemons[id - 1] !== undefined && pokemons[id - 1] !== null
}



// async function update(id, type2) {
//     var collection = await getCollection('pokemons')
//     try {
//         var result = await collection.updateOne({ _id: ObjectID(id) }, { $set: { type2: type2 } });
//         return result
//     } catch (err) {
//         console.error(err)
//         return false
//     } finally {
//         client.close()
//     }
// }



async function update(pokemon) {
    var collection = await getCollection('pokemons')

    try {
        var result = await collection.updateOne({ _id: ObjectID(pokemon._id) }, { $set: { type2: pokemon.type2 } })
        return true
    } catch (err) {
        console.error(err)
        return false
    } finally {
        client.close()
    }

}



mockPokemon()

module.exports.isPokemonExitsted = isPokemonExitsted
module.exports.savePokemon = savePokemon
module.exports.getPokemons = getPokemons
module.exports.getPokemon = getPokemon
module.exports.update = update