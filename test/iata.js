var should = require('should');
var iata = require('../iata');

describe('IATA', function () {
  it('should return valid coordinates', function (done) {
    var VKO = iata('VKO');

    (VKO === undefined).should.be.false;

    VKO.should.be.an.instanceOf(Object);
    VKO.should.have.property('lon');
    VKO.should.have.property('lat');
    VKO.lat.should.be.approximately(55.5913, 0.001);
    VKO.lon.should.be.approximately(37.2613, 0.001);

    done();
  });
});