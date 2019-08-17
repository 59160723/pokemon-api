const request = require('supertest')
const chai = require('chai')
const app = require('../app')
chai.should()


describe('Pokemon API', () => {
    describe('GET /', () => {
        it('should return 200 ok with "Hello World!!"', (done) => {
            request(app).get('/')
                .expect(200)
                .end((err, res) => {
                    res.body.should.deep.equal({ message: 'Hello World!!' })
                    done()
                })
        })
    })

    describe('GET /pokemons/:id', () => {
        it('should return 200 ok with object', (done) => {
            request(app).get('/pokemons/1')
                .expect(200)
                .end((err, res) => {
                    res.body.should.to.be.an('object')
                    res.body.should.to.have.property('id')
                    res.body.should.to.have.property('name')
                    res.body.should.to.have.property('type')

                    done()
                })
        })
        it('should return 400 bad request', (done) => {
            request(app).get('/pokemons/99')
                .expect(400)
                .end((err, res) => {
                    res.body.error.should.equal('The Pokemon could be not found')
                    done()
                })
        })
    })




    describe('POST /pokemons', () => {
        it('should return 201 Created and have new pokemon', (done) => {
            request(app).post('/pokemons')
                .send({ name: 'Seiyon', type: 'Bug' })
                .set('Accept', 'application/json')
                .expect(201, done)
        })


        it('should return 400 Bad Request when missed field', (done) => {
            request(app).post('/pokemons')
                .expect(400)
                .end((err, res) => {
                    res.body.error.should.equal('Insufficient parameters: name and type are required parameter')
                    done()
                })
        })

    })
    describe('PUT /pokemons/:id', () => {
        it('should return 200 OK and the pokemon has type2', (done) => {
            request(app).put('/pokemons/1')
                .send({ type2: 'Bug' })
                .set('Accept', 'application/json')
                .expect(200, done)
        })
        it('should return 400 Bad Request when try to update not existed pokemon', (done) => {
            request(app).put('/pokemons/1000')
                .send({ type2: 'Bug' })
                .set('Accept', 'application/json')
                .expect(400)
                .end((err, res) => {
                    res.body.error.should.equal('Cannot update pokemon: Pokemon is not found')
                    done()
                })
        })
    })
})


describe('Integration Test', () => {
    it('GET /pokemons should return list of pokemons', (done) => {
        request('http://localhost:3000').get('/pokemons')
            .expect(200)
            .end((err,res) => {
                res.body.should.be.a('array')
                done()
            })
    })
})