var request = require('request');
var APIKey = require('../config.json').WunderGroundAPIKey;

function leadingZero (num) {
  if (num < 10) return '0' + num;
}

module.exports = function (coords, date, next) {

  date = new Date(date * 1000);

  request([
    'http://api.wunderground.com/api/',
    APIKey,
    '/history_',
    date.getUTCFullYear(),
    leadingZero(date.getUTCMonth() + 1),
    leadingZero(date.getUTCDate()),
    '/q/',
    coords[0],
    ',',
    coords[1],
    '.json'
  ].join(''), function (e, res, body) {
    if (!e && res.statusCode !== 200) e = new Error('Server responded with status code ' + res.statusCode);
    if (e) return next(e);

    body = JSON.parse(body);

    if (
      !body ||
      !body.history ||
      !body.history.dialysummury
    ) {
      return next(new Error('Could not fetch weather data'));
    }

    next(null, body.history.dialysummury[0].meantempm);

  });

};