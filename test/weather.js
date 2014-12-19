var should = require('should');
var owm = require('../weather/openweathermap');
var wunderground = require('../weather/wunderground');
var wwo = require('../weather/worldweatheronline');

describe('OpenWeatherMap', function () {
  it('should return valid historical data', function () {

    owm([55.5913, 37.2613], 1416528000, function (e, temp) {
      e.should.be.not.ok;
      temp.should.be.approximately(-6.77, 0.01);
    });

  });
});

describe('Wunderground', function () {
  it('should return valid historical data', function () {
    wunderground([55.5913, 37.2613], 1416528000, function (e, temp) {
      e.should.be.not.ok;
      temp.should.be.equal(-7);
    });
  });
});

describe('WorldWeatherOnline', function () {
  it('should return valid historical data', function () {
    wwo([55.5913, 37.2613], 1416528000, function (e, temp) {
      e.should.be.not.ok;
      temp.should.be.equal(-1);
    });
  });
});
