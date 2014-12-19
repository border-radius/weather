var request = require('../lib/request');
var leadingZero = require('../lib/leadingzero');
var resetTime = require('../lib/resetTime');
var APIKey = require('../config.json').WunderGroundAPIKey;

function History (opts, next) {

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

}


function Forecast (opts, next) {

  request([
    'http://api.wunderground.com/api/',
    APIKey,
    '/forecast/',
    '/q/',
    opts.lat,
    ',',
    opts.lon,
    '.json'
  ].join(''), function (e, body) {
    if (e) return next(e);

    var temp = body.forecast.simpleforecast.forecastday.reduce(function (nearest, current) {
      if (
        Math.abs(current.date.epoch - opts.date.getTime()/1000)
        <
        Math.abs(nearest.date.epoch - opts.date.getTime()/1000)
      ) {
        return current;
      } else {
        return nearest;
      }
    }, body.forecast.simpleforecast.forecastday[0]);

    temp = (parseInt(temp.high.celsius) + parseInt(temp.low.celsius)) / 2;

    next(null, parseFloat(temp.toFixed(2)));

  });

}


module.exports = function (opts, next) {
  var today = resetTime(new Date());

  if (today.getTime() < opts.date.getTime()) {
    return Forecast(opts, next);
  } else {
    return History(opts, next);
  }
};