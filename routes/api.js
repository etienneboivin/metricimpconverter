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
    let finalString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    console.log(initNum);
    console.log(initUnit);
    console.log(returnNum);
    console.log(returnUnit);
    console.log(spellOutUnit);
    if(initNum == 'invalid number' && initUnit == 'invalid units') {
      res.json('invalid number and units');
    }

    if(initNum == 'invalid number') {
      res.json('invalid number');
    }

    if(initUnit == 'invalid units') {
      res.json('invalid units');
    }

    let responseObject = {}
    responseObject['initNum'] = initNum
    responseObject['initUnit'] = initUnit
    responseObject['returnNum'] = returnNum
    responseObject['returnUnit'] = returnUnit
    responseObject['string'] = finalString

    res.json(responseObject)
  });

};
