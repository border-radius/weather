var request = require('../lib/request');
var resetTime = require('../lib/resetTime');

function Today (opts, next) {

  /* Today's data available on different API */

  request([
    'http://api.openweathermap.org/data/2.5/weather?lat=',
    opts.lat,
    '&lon=',
    opts.lon
  ].join(''), function (e, body) {
    if (e) return next(e);

    var temp = body.main.temp - 273.15;

    return next(null, temp);
  });

}


function History (opts, next) {

  /* Get stantion code */

  request([
    'http://api.openweathermap.org/data/2.5/station/find?lat=',
    opts.lon,
    '&lon=',
    opts.lat,
    '&cnt=1'
  ].join(''), function (e, body) {
    if (e) return next(e);

    if (
      !body ||
      !body[0].station.id
    ) {
      return next(null, null);
    }

    /* Get historical temperature data */

    request([
      'http://api.openweathermap.org/data/2.5/history/station?id=',
      body[0].station.id,
      '&type=day&start=',
      parseInt(opts.date.getTime() / 1000),
      '&end=',
      parseInt(opts.date.getTime() / 1000)
    ].join(''), function (e, body) {
      if (e) return next(e);

      if (
        !body ||
        !body.list.length ||
        !body.list[0].temp
      ) {
        return next(null, null);
      }

      var temp = body.list[0].temp.v - 273.15;

      next(null, temp);
    });

  });

}

module.exports = function (opts, next) {

  var today = resetTime(new Date());

  if (today.getTime() == opts.date.getTime()) {
    return Today(opts, next);
  } else {
    return History(opts, next);
  }
};