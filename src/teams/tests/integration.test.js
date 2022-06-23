const chai = require('chai');
const chaiHttp = require('chai-http')
const {describe, it} = require('mocha')
const app = require('../../app').app

chai.use(chaiHttp)

describe('Suite de tests de integracion', () => {
    it('Should return the  team of the user', (done) => {
        chai.request(app)
            .get('/api/v1/team/pokemons')
            .set("Authorization", 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2NjVhMGQ0LTkwYzEtNGU4ZS04ZTQ5LWUyMmQyNjdlYjc2MCIsImVtYWlsIjoiYWxpdmllcmFjYWRlbWxvQGFjYWRlbWxvLmNvbSIsImlhdCI6MTY1NTczMDQ4MH0.4PZGyXhGYg2pq4bPAplcr5MPxCCSNwZDKuqIje7FcmI')
            .end((err, res) => {
                chai.assert.equal(res.status, 200)
                chai.assert.property(res.body, "pokemons")
                chai.assert.typeOf(res.body.pokemons, 'array')
                done()
            })
    })
    it('Should return the new pokemon from the team of the given user', (done) => {
        chai.request(app)
            .post('/api/v1/team/pokemons')
            .send({name: 'pikachu', pokedex_id: 25})
            .set("Authorization", 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2NjVhMGQ0LTkwYzEtNGU4ZS04ZTQ5LWUyMmQyNjdlYjc2MCIsImVtYWlsIjoiYWxpdmllcmFjYWRlbWxvQGFjYWRlbWxvLmNvbSIsImlhdCI6MTY1NTczMDQ4MH0.4PZGyXhGYg2pq4bPAplcr5MPxCCSNwZDKuqIje7FcmI')
            .end((err, res) => {
                chai.assert.equal(res.status, 201)
                chai.assert.equal(res.body.message, "Pokemon added succesfully on your team")
                chai.assert.property(res.body.pokemon, "name")
                chai.assert.equal(res.body.pokemon.name, 'pikachu')
                done()
            })
    })
    it('Should return the delete pokemon from the team of the given user', (done) => {
        chai.request(app)
            .delete('/api/v1/team/pokemons')
            .send({name: 'pikachu'})
            .set("Authorization", 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2NjVhMGQ0LTkwYzEtNGU4ZS04ZTQ5LWUyMmQyNjdlYjc2MCIsImVtYWlsIjoiYWxpdmllcmFjYWRlbWxvQGFjYWRlbWxvLmNvbSIsImlhdCI6MTY1NTczMDQ4MH0.4PZGyXhGYg2pq4bPAplcr5MPxCCSNwZDKuqIje7FcmI')
            .end((err, res) => {
                chai.assert.equal(res.status, 200)
                chai.assert.equal(res.body.message, "pokemon delete succesfully")
                done()
            })
    })
})

