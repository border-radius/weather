var request = require('request');

module.exports = function (coords, date, next) {

  /* Get stantion code */

  request([
    'http://api.openweathermap.org/data/2.5/station/find?lat=',
    coords[0],
    '&lon=',
    coords[1],
    '&cnt=1'
  ].join(''), function (e, res, body) {
    if (!e && res.statusCode !== 200) e = new Error('Server responded with status code ' + res.statusCode);
    if (e) return next(e);
    
    body = JSON.parse(body);

    if (!body || !body[0].station.id) return next(new Error('Could not receive station id'));

    /* Get historical temperature data */

    request([
      'http://api.openweathermap.org/data/2.5/history/station?id=',
      body[0].station.id,
      '&type=day&start=',
      date,
      '&end=',
      date
    ].join(''), function (e, res, body) {
      if (!e && res.statusCode !== 200) e = new Error('Server responded with status code ' + res.statusCode);
      if (e) return next(e);

      body = JSON.parse(body);

      if (!body || !body.list || !body.list[0].temp) return next(new Error('Could not receive temperature data'));

      var temp = body.list[0].temp.v - 273.15;

      next(null, temp);
    });

  });

};