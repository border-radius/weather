var should = require('should');
var owm = require('../weather/openweathermap');
var wunderground = require('../weather/wunderground');
var wwo = require('../weather/worldweatheronline');
var resetTime = require('../lib/resetTime');

var nov21 = new Date('2014-11-21');

var today = resetTime(new Date());

var tomorrow = resetTime(new Date());
tomorrow.setDate(tomorrow.getDate() + 1);

describe('OpenWeatherMap', function () {
  it('should return valid historical data', function (done) {
    owm({
      lat: 55.5913,
      lon: 37.2613,
      date: nov21
    }, function (e, temp) {
      (e === null).should.be.true;
      temp.should.be.approximately(-6.77, 0.01);
      done();
    });
  });

  it('should return today data', function (done) {
    owm({
      lat: 55.5913,
      lon: 37.2613,
      date: today
    }, function (e, temp) {
      (e === null).should.be.true;
      (temp === null).should.be.false;
      done();
    });
  });

  it('should return tomorrow data', function (done) {
    owm({
      lat: 55.5913,
      lon: 37.2613,
      date: tomorrow
    }, function (e, temp) {
      (e === null).should.be.true;
      (temp === null).should.be.false;
      done();
    });
  });
});

describe('Wunderground', function () {
  it('should return valid historical data', function (done) {
    wunderground({
      lat: 55.5913,
      lon: 37.2613, 
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
      lat: 55.5913,
      lon: 37.2613, 
      date: nov21
    }, function (e, temp) {
      (e === null).should.be.true;
      temp.should.be.equal(-1);
      done();
    });
  });
});