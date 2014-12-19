var request = require('../lib/request');
var leadingZero = require('../lib/leadingzero');
var APIKey = require('../config.json').WunderGroundAPIKey;

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
  ].join(''), function (e, body) {
    if (e) return next(e);

    if (
      !body ||
      !body.history ||
      !body.history.dailysummary
    ) {
      return next(null, null);
    }

    next(null, parseFloat(body.history.dailysummary[0].meantempm));

  });

};