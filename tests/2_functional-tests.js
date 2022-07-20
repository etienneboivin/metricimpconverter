const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  suite('Integration tests with chai-http', function(){
    test('Test GET /api/convert with valid input', function(done){
      chai
        .request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.initNum, 10)
          assert.equal(res.initUnit, 'l')
          assert.approximately(res.returnNum, 2.6417, 0.1)
          assert.equal(res.returnUnit, 'gal')
        })
    })
    test('Test GET /api/convert with invalid units', function(done){
      chai
        .request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end(function(err, res) {
          assert.equal(res.body, 'invalid units')
        })
    })
    test('Test GET /api/convert with invalid number', function(done){
      chai
        .request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kg'})
        .end(function(err, res) {
          assert.equal(res.body, 'invalid number')
      })
    })
    test('Test GET /api/convert with invalid number and units', function(done){
      chai
        .request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kilomegagram'})
        .end(function(err, res) {
          assert.equal(res.body, 'invalid number and units')
      })
    })
    test('Test GET /api/convert with no number', function(done){
      chai
        .request(server)
        .get('/api/convert')
        .query({input: 'kg'})
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.initNum, 1)
          assert.equal(res.initUnit, 'kg')
          assert.approximately(res.returnNum, 2.2046, 0.1)
          assert.equal(res.returnUnit, 'lbs')
        })
    })
  })

});
