var should = require('should');
var owm = require('../weather/openweathermap');
var wunderground = require('../weather/wunderground');
var wwo = require('../weather/worldweatheronline');
var weather = require('../weather');

describe('OpenWeatherMap', function () {
  it('should return valid historical data', function (done) {
    owm([55.5913, 37.2613], 1416528000, function (e, temp) {
      (e === null).should.be.true;
      temp.should.be.approximately(-6.77, 0.01);
      done();
    });
  });
});

describe('Wunderground', function () {
  it('should return valid historical data', function (done) {
    wunderground([55.5913, 37.2613], 1416528000, function (e, temp) {
      (e === null).should.be.true;
      temp.should.be.equal(-7);
      done();
    });
  });
});

describe('WorldWeatherOnline', function () {
  it('should return valid historical data', function (done) {
    wwo([55.5913, 37.2613], 1416528000, function (e, temp) {
      (e === null).should.be.true;
      temp.should.be.equal(-1);
      done();
    });
  });
});

describe('Weather mediator', function () {
  it('should return valid average historical data', function (done) {
    weather('VKO', 1416528000, function (e, temp) {
      (e === null).should.be.true;
      temp.should.be.approximately(-4.92, 0.01);
      done();
    });
  });
});