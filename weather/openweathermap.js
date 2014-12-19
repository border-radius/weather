var request = require('../lib/request');

module.exports = function (opts, next) {

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
        !body.list ||
        !body.list[0].temp
      ) {
        return next(null, null);
      }

      var temp = body.list[0].temp.v - 273.15;

      next(null, temp);
    });

  });

};