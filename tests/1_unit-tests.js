%const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Test convertHandler.getNum', function(){
    test('Whole number input', function(done) {
      var input = '24L';
      assert.equal(convertHandler.getNum(input), '24');
      done();
    });
    test('Decimal number input', function(done) {
      var input = '24.4gal';
      assert.equals(convertHandler.getNum(input), '24.4');
      done();
    })
    test('Fractional number input', function(done) {
      var input = '3/8mi';
      assert.equals(convertHandler.getNum(input), '0.3750')
      done();
    })
    test('Double-fraction input', function(done) {
      var input = '3/2/3mi';
      assert.equals(convertHandler.getNum(input), 'invalid number')
      done();
    })
    test('No number provided', function(done) {
      var input = 'kg';
      assert.equals(convertHandler.getNum(input), '1')
      done();
    })
  })
  suite('Test convertHandler.getUnit', function(){
    test('Correctly read each valid input unit', function(done){
      var inputs = ['l', 'L',
                    'gal', 'GAL',
                    'lbs', 'LBS',
                    'kg', 'KG',
                    'mi', 'MI',
                    'km', 'KM'];
      inputs.forEach(function(element) {
        assert.equals(convertHandler.getUnit('24' + element),
                        element);
      })
      done();
    })
    test('Correctly return an error for invalid input unit', function(done){
      assert.equals(convertHandler.getUnit('24feet'), 'invalid units');
      done();
    })
  });
  suite('Test convertHandler.getReturnUnit', function(){
    test('Return correct unit for each valid input unit', function(done){
      inputs = ['L', 'gal', 'lbs', 'kg', 'mi', 'km'];
      outputs = ['gal', 'L', 'kg', 'lbs', 'km', 'mi'];
      inputs.forEach(function(element, index) {
        assert.equals(convertHandler.getUnit(element), outputs[index]);
      })
      done();
    })
  });
  suite('Test convertHandler.spellOutUnit', function(){
    test('Return spelled out string unit for each valid input', function(done) {
      inputs = ['L', 'gal', 'lbs', 'kg', 'mi', 'km'];
      outputs = ['litres', 'gallons', 'pounds', 'kilograms', 'miles',
                  'kilometres'];
      inputs.forEach(function(element, index){
        assert.equals(convertHandler.spellOutUnit(element), outputs[index])
      })
      done();
    })
  });
  suite('Test convertHandler.convert', function(){
    test('Correctly convert gal to L', function(done){
      assert.equals(convertHandler.convert(3, 'gal'), 11.3562)
      done();
    })
    test('Correctly convert L to gal', function(done){
      assert.equals(convertHandler.convert(7, 'L'), 1.8492)
      done();
    })
    test('Correctly convert mi to km', function(done){
      assert.equals(convertHandler.convert(2, 'mi'), 3.2187)
      done();
    })
    test('Correctly convert km to mi', function(done){
      assert.equals(convertHandler.convert(5, 'km'), 2.1069)
      done();
    })
    test('Correctly convert lbs to kg', function(done){
      assert.equals(convertHandler.convert(8, 'lbs'), 3.6287)
      done();
    })
    test('Correctly convert kg to lbs', function(done){
      assert.equals(convertHandler.convert(6, 'kg'), 13.2277)
      done();
    })
  })
});
