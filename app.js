//import library express 
const express = require('express')
//create express app 
const app = express()
const port = 3000

app.use(express.json())
app.get('/',(req,res) => res.send('Hello Worldff!'))

/*  get  /pokemon -> list all
*/


let pokemons = [
{ name: 'Bulbasaur',type : 'Grass'},
{ name: 'Lycanroc',type : 'Rock'},
{ name: 'Toxapex',type : 'Poison'}

]

//เรียกเราชื่อออกมา
app.get('/pokemons',(req,res) => res.send(pokemons))




/* 
POST /pokemon -> add pokemon to list 
 */
//เพิ่มเข้าไปในฐานข้อมุล
app.post('/pokemons',(req,res) =>{
    //req is request
    //res is response 
    pokemons.push(req.body)
    //ค่าที่ได้ออกมา แสดงว่ามันเก็บ object มา ขึ้นอยู่ว่ามันส่งอะไรมา ดังนั้นเราก็สารถเก็บค่านั้นได้เลย 
    res.sendStatus(201)
})



app.listen(port,() => console.log(`Pokemon App  listening on port ${port}!`))













