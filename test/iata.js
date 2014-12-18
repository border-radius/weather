var should = require('should');
var iata = require('../iata');

var VKO = iata('VKO');

(VKO === undefined).should.be.false;

VKO.should.be.an.instanceOf(Array);
VKO.should.have.length(2);
VKO[0].should.be.approximately(55.5913, 0.001);
VKO[1].should.be.approximately(37.2613, 0.001);