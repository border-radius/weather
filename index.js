var express = require('express');
var weather = require('./weather');

var app = express();

app.get(['/', '/:iata/:date'], function (req, res) {
  if (
    !req.param('iata') ||
    !/^[A-Z]{3}$/.test(req.param('iata'))
  ) {
    return res.status(400).json({
      error: 'Undefined or invalid IATA code'
    });
  } else if (
    !req.param('date')
  ) {
    return res.status(400).json({
      error: 'Date is undefined'
    });
  }

  weather({
    iata: req.param('iata'),
    date: req.param('date')
  }, function (e, temp) {
    if (e) return res.status(500).json({
      error: e
    });

    res.json({
      temp: temp
    });
  });
});

app.listen(8030);