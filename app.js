//import library express
const express = require("express");
//create express app
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => res.send("Hello Worldff!"));

class Pokemon {
    constructor(name, type) {
        this.name = name
        this.type = type
        this.id = null
        this.type2 = null
    }
 }
 
let pokemons = [];
pokemons.push(createPokemon('kittiya', 'beauty'))
pokemons.push(createPokemon('sorawit', 'handsome'))

function generateNewID(num) {
  let newID = num + 1
  return newID
}

function createPokemon(name, type) {
  let p = new Pokemon(name, type)
  p.id = generateNewID(pokemons.length)
  return p;
}

 function isInsufficientParam(){
     return v!== undefined &&  v!== null && v!== ''
 }
app.get("/pokemons", (req, res) => res.send(pokemons));
app.post("/pokemons", (req, res) => {
  if(isInsufficientParam(req.body.name) || isInsufficientParam(req.body.type))
    {
    res.sendStatus(404).send({error : 'Insufficient parameters: name and type are required parameter'})
    return 
  }
  let p = createPokemon(req.body.name, req.body.type);
  pokemons.push(p);
  res.sendStatus(201);
});


// GET http://localhost:3000/pokemons/1
app.get('/pokemon/:id' , (req,res)=> {
    let.id = req.params.id
    let p = pokemons[id-1]
    res.send(p)
})
// PUT http://localhost:3000/pokemons/1
// Add type 2 

app.put('/pokemon/:id' , (req,res)=> {
    if(!isInsufficientParam(req.body.type2)){
        res.status(400).send({error : 'Insufficient parameters: name and type2 are required parameter'})
        return
    }
    if(!isInsufficientParam(req.body.id)){
        res.status(400).send({error : 'Insufficient parameters: name and id are required parameter'})
        return
    }

    let id = req.params.id
    let p = pokemons[id-1]
    if(p === undefined){
        res.status(400).send({error :'Cannot update pokemon: Pokemon is not found'})
        return
    }
    p.type2 = req.body.type2
    pokemons[id-1] = p 
    res.sendStatus(201)
})



app.listen(port, () => console.log(`Pokemon App  listening on port ${port}!`));
