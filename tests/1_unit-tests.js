const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Test convertHandler.getNum', function(){
    test('Whole number input', function(done) {
      var input = '24L';
      assert.equal(convertHandler.getNum(input), 24);
      done();
    });
    test('Decimal number input', function(done) {
      var input = '24.4gal';
      assert.equal(convertHandler.getNum(input), 24.4);
      done();
    })
    test('Fractional number input', function(done) {
      var input = '3/8mi';
      assert.equal(convertHandler.getNum(input), 0.3750)
      done();
    })
    test('Double-fraction input', function(done) {
      var input = '3/2/3mi';
      assert.equal(convertHandler.getNum(input), 'invalid number')
      done();
    })
    test('No number provided', function(done) {
      var input = 'kg';
      assert.equal(convertHandler.getNum(input), '1')
      done();
    })
  })
  suite('Test convertHandler.getUnit', function(){
    test('Correctly read each valid input unit', function(done){
      var inputs = ['L',
                    'gal',
                    'lbs',
                    'kg',
                    'mi',
                    'km'];
      inputs.forEach(function(element) {
        assert.equal(convertHandler.getUnit('24' + element),
                        element);
      })
      done();
    })
    test('Correctly return an error for invalid input unit', function(done){
      assert.equal(convertHandler.getUnit('24feet'), 'invalid units');
      done();
    })
  });
  suite('Test convertHandler.getReturnUnit', function(){
    test('Return correct unit for each valid input unit', function(done){
      var inputs = ['L', 'gal', 'lbs', 'kg', 'mi', 'km'];
      var outputs = ['gal', 'L', 'kg', 'lbs', 'km', 'mi'];
      inputs.forEach(function(element, index) {
        assert.equal(convertHandler.getReturnUnit(element), outputs[index]);
      })
      done();
    })
  });
  suite('Test convertHandler.spellOutUnit', function(){
    test('Return spelled out string unit for each valid input', function(done) {
      var inputs = ['L', 'gal', 'lbs', 'kg', 'mi', 'km'];
      var outputs = ['liters', 'gallons', 'pounds', 'kilograms', 'miles',
                  'kilometers'];
      inputs.forEach(function(element, index){
        assert.equal(convertHandler.spellOutUnit(element), outputs[index])
      })
      done();
    })
  });
  suite('Test convertHandler.convert', function(){
    test('Correctly convert gal to L', function(done){
      assert.approximately(convertHandler.convert(3, 'gal'), 11.35623, 0.1)
      done();
    })
    test('Correctly convert L to gal', function(done){
      assert.approximately(convertHandler.convert(7, 'L'), 1.84920, 0.1)
      done();
    })
    test('Correctly convert mi to km', function(done){
      assert.approximately(convertHandler.convert(2, 'mi'), 3.21869, 0.1)
      done();
    })
    test('Correctly convert km to mi', function(done){
      assert.approximately(convertHandler.convert(5, 'km'), 3.10686, 0.1)
      done();
    })
    test('Correctly convert lbs to kg', function(done){
      assert.approximately(convertHandler.convert(8, 'lbs'), 3.62874, 0.1)
      done();
    })
    test('Correctly convert kg to lbs', function(done){
      assert.approximately(convertHandler.convert(6, 'kg'), 13.22774, 0.1)
      done();
    })
  })
});
