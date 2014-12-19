var should = require('should');
var owm = require('../weather/openweathermap');
var wunderground = require('../weather/wunderground');
var wwo = require('../weather/worldweatheronline');
var weather = require('../weather');

var nov21 = new Date('2014-11-21');

describe('OpenWeatherMap', function () {
  it('should return valid historical data', function (done) {
    owm({
      lon: 55.5913,
      lat: 37.2613,
      date: nov21
    }, function (e, temp) {
      (e === null).should.be.true;
      temp.should.be.approximately(-6.77, 0.01);
      done();
    });
  });
});

describe('Wunderground', function () {
  it('should return valid historical data', function (done) {
    wunderground({
      lon: 55.5913,
      lat: 37.2613, 
      date: nov21
    }, function (e, temp) {
      (e === null).should.be.true;
      temp.should.be.equal(-7);
      done();
    });
  });
});

describe('WorldWeatherOnline', function () {
  it('should return valid historical data', function (done) {
    wwo({
      lon: 55.5913,
      lat: 37.2613, 
      date: nov21
    }, function (e, temp) {
      (e === null).should.be.true;
      temp.should.be.equal(-1);
      done();
    });
  });
});

describe('Weather mediator', function () {
  it('should return valid average historical data', function (done) {
    this.timeout(6000);

    weather({
      iata: 'VKO', 
      date: nov21
    }, function (e, temp) {
      (e === null).should.be.true;
      temp.should.be.approximately(-4.92, 0.01);
      done();
    });
  });

  it('should return cached data', function (done) {
    this.timeout(100);

    weather({
      iata: 'VKO', 
      date: nov21
    }, function (e, temp) {
      (e === null).should.be.true;
      temp.should.be.approximately(-4.92, 0.01);
      done();
    });
  });
});