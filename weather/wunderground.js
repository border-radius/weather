var request = require('../lib/request');
var leadingZero = require('../lib/leadingzero');
var APIKey = require('../config.json').WunderGroundAPIKey;

module.exports = function (opts, next) {

  request([
    'http://api.wunderground.com/api/',
    APIKey,
    '/history_',
    opts.date.getUTCFullYear(),
    leadingZero(opts.date.getUTCMonth() + 1),
    leadingZero(opts.date.getUTCDate()),
    '/q/',
    opts.lat,
    ',',
    opts.lon,
    '.json'
  ].join(''), function (e, body) {
    if (e) return next(e);

    if (
      !body ||
      !body.history ||
      !body.history.dailysummary.length
    ) {
      return next(null, null);
    }

    next(null, parseFloat(body.history.dailysummary[0].meantempm));

  });

};