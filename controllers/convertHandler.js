function ConvertHandler() {

  let regexStr = /[a-z]+|[^a-z]+/gi;
  let units = {"gal": "L", "L": "gal", "lbs": "kg", "kg": "lbs", "mi": "km", "km": "mi"};
  let spellUnits = {"gal": "gallons", "L": "liters", "lbs": "pounds", "kg": "kilograms",
                      "mi": "miles", "km": "kilometers"}
  this.getNum = function(input) {
    let result = input.match(regexStr)[0];
    console.log("Here is the result of the first regex match: " + result);
    let numberRegex = /\d/;

    if(!numberRegex.test(result)) {
      result = 1;
    }

    if(result.toString().includes('/')) {
      fraction = result.split('/');
      if (fraction.length != 2) {
        return 'invalid number';
      }
      fraction[0] = parseFloat(fraction[0]);
      fraction[1] = parseFloat(fraction[1]);
      result = parseFloat(fraction[0]/fraction[1]).toFixed(5);
    }

    if(isNaN(result)) {
      return 'invalid number';
    }
    console.log(parseFloat(result));
    return parseFloat(result);
  };

  this.getUnit = function(input) {
    let validUnits = ['L', 'gal', 'lbs', 'kg', 'mi', 'km']
    let result = input.match(regexStr)[1];
    if(!result) {
      result = input.match(regexStr)[0];
    }

    if(!(validUnits.includes(result))) {
      return "invalid units";
    }
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result = units[initUnit];

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = spellUnits[unit];
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    switch(initUnit) {
      case "gal":
        result = parseFloat(initNum * galToL);
        break;
      case "L":
        result = parseFloat(initNum / galToL);
        break;
      case "lbs":
        result = parseFloat(initNum * lbsToKg);
        break;
      case "kg":
        result = parseFloat(initNum / lbsToKg);
        break;
      case "km":
        result = parseFloat(initNum / miToKm);
        break;
      case "mi":
        result = parseFloat(initNum * miToKm);
        break;
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + " " + spellUnits[initUnit] + " converts to " +
                returnNum + " " + spellUnits[returnUnit];

    return result;
  };

}

module.exports = ConvertHandler;
