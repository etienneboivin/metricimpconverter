'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let spellOutUnit = convertHandler.spellOutUnit(input);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    if(initNum == 'invalid number' && initUnit == 'invalid units') {
      res.json('invalid number and unit');
    }

    if(initNum == 'invalid number') {
      res.json('invalid number');
    }

    if(initUnit == 'invalid units') {
      res.json('invlaid units');
    }

    res.json({"initNum": initNum, "initUnit": initUnit, "returnNum": returnNum,
              "returnUnit": returnUnit, "string": string});
  });

};
