var request = require('request');
var APIKey = require('../config.json').WorldWeatherOnlineAPIKey;

function leadingZero (num) {
  if (num < 10) return '0' + num;
}

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
  ].join(''), function (e, res, body) {
    if (!e && res.statusCode !== 200) e = new Error('Server responded with status code ' + res.statusCode);
    if (e) return next(e);
    
    body = JSON.parse(body);

    if (
      !body ||
      !body.data.weather
    ) {
      return next(new Error('Could not receive historical data'));
    }

    var temp = (body.data.weather[0].mintempC + body.data.weather[0].maxtempC) / 2;

    next(null, temp);
  });
};