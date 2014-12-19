var async = require('async');

var iata = require('../iata');

var openweathermap = require('./openweathermap');
var wunderground = require('./wunderground');
var worldweatheronline = require('./worldweatheronline');

module.exports = function (city, date, next) {
  
  city = iata(city);

  if (!city) return next(new Error('Location not found'));

  async.parallel([
    function (next) {
      openweathermap(city, date, next);
    },
    function (next) {
      wunderground(city, date, next);
    },
    function (next) {
      worldweatheronline(city, date, next);
    }
  ], function (e, temps) {
    if (e) return next(e);

    /* Filtering "null" results (if data not available in all services) */
    temps = temps.filter(function (temp) {
      return !!temp;
    });

    /* Calculating average */
    var temp = temps.reduce(function (sum, temp) {
      return sum + temp;
    }, 0) / temps.length;

    next(null, temp);
  });
};