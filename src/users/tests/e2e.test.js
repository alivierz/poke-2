const chai = require('chai');
const chaiHttp = require('chai-http')
const {describe, it} = require('mocha')
const app = require('../../app').app
chai.use(chaiHttp)

describe('Suite de tests de integracion', () => {
    it('Should return the user bye email', (done) => {
        chai.request(app)
            .get('/api/v1/users/login')
            .send({  "email": "ademlo@academlo.com","password": "root"})
            .end((err, res) => {
                chai.assert.equal(res.status, 200)
                chai.assert.typeOf(res.body, 'object')
                chai.request(app)
                    .post('/api/v1/users/login')
                    .send({  "email": "ademlo@academlo.com","password": "root"})
                    .end((err, res) =>{
                        chai.assert.equal(res.status, 200)
                        chai.assert.property(res.body, 'token')
                        done()
                    })
            })
    })
})