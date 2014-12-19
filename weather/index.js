var async = require('async');
var cache_manager = require('cache-manager');
var resetTime = require('../lib/resetTime');

var config = require('../config.json');

var memory_cache = cache_manager.caching({
  store: 'memory',
  max: config.CacheMax || 100,
  ttl: config.CacheTTLSeconds || 10
});

var iata = require('../iata');

var openweathermap = require('./openweathermap');
var wunderground = require('./wunderground');
var worldweatheronline = require('./worldweatheronline');

function Weather (opts, next) {
  
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

    temp = parseFloat(temp.toFixed(2));

    next(null, temp);
  });
};

module.exports = function (opts, next) {
  try {
    opts.date = resetTime(new Date(opts.date));
  } catch (e) {
    return next(e);
  }
  
  memory_cache.wrap([
    opts.iata,
    opts.date.getTime()
  ].join('/'), function (cache) {
    Weather(opts, cache);
  }, config.CacheTTLSeconds, next);
};