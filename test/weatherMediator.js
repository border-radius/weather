var should = require('should');
var weather = require('../weather');

var nov21 = new Date('2014-11-21');

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