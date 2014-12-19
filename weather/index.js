var async = require('async');

var iata = require('../iata');

var openweathermap = require('./openweathermap');
var wunderground = require('./wunderground');
var worldweatheronline = require('./worldweatheronline');

module.exports = function (opts, next) {
  
  var search = iata(opts.iata);

  if (!search) return next(new Error('Location not found'));

  search.date = opts.date;

  async.parallel([
    function (next) {
      openweathermap(search, next);
    },
    function (next) {
      wunderground(search, next);
    },
    function (next) {
      worldweatheronline(search, next);
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