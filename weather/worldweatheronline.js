var request = require('../lib/request');
var leadingZero = require('../lib/leadingzero');
var APIKey = require('../config.json').WorldWeatherOnlineAPIKey;

module.exports = function (opts, next) {

  request([
    'http://api.worldweatheronline.com/free/v2/past-weather.ashx?key=',
    APIKey,
    '&date=',
    opts.date.getUTCFullYear(),
    '-',
    leadingZero(opts.date.getUTCMonth() + 1),
    '-',
    leadingZero(opts.date.getUTCDate()),
    '&q=',
    opts.lat,
    ',',
    opts.lon,
    '&format=json'
  ].join(''), function (e, body) {
    if (e) return next(e);

    if (
      !body ||
      !body.data.weather
    ) {
      return next(null, null);
    }

    var temp = (
      parseFloat(body.data.weather[0].mintempC) +
      parseFloat(body.data.weather[0].maxtempC)
    ) / 2;

    next(null, temp);
  });
};