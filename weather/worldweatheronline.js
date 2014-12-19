var request = require('../lib/request');
var leadingZero = require('../lib/leadingzero');
var APIKey = require('../config.json').WorldWeatherOnlineAPIKey;

module.exports = function (coords, date, next) {

  date = new Date(date * 1000);

  request([
    'http://api.worldweatheronline.com/free/v2/past-weather.ashx?key=',
    APIKey,
    '&date=',
    date.getUTCFullYear(),
    '-',
    leadingZero(date.getUTCMonth() + 1),
    '-',
    leadingZero(date.getUTCDate()),
    '&q=',
    coords[0],
    ',',
    coords[1],
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