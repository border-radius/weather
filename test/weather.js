var should = require('should');
var owm = require('../weather/openweathermap');

describe('OpenWeatherMap', function () {
  it('should return valid historical data', function () {

    owm([55.5913, 37.2613], 1416528000, function (e, temp) {
      e.should.be.not.ok;
      temp.should.be.approximately(-6.77, 0.01);
    });

  });
});