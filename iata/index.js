var fs = require('fs');

var IATA = {}, ready;

module.exports = function (code) {
  if (!ready) {
    var db = fs.readFileSync(__dirname + '/GlobalAirportDatabase', { encoding: 'utf8' });

    db.split('\n').forEach(function (airport) {
      airport = airport.split(':');
      IATA[airport[1]] = [
        parseInt(airport[5]) + 
        ( parseInt(airport[6]) / 60 ) +
        ( parseInt(airport[7]) / 3600 ) *
        ( airport[8] === 'N' ? 1 : -1 ),
        parseInt(airport[9]) +
        ( parseInt(airport[10]) / 60 ) +
        ( parseInt(airport[11]) / 3600 ) *
        ( airport[12] === 'E' ? 1 : -1 )
      ];
    });

    ready = true;
  }

  return IATA[code];
};