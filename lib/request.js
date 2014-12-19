var request = require('request');

module.exports = function (url, next) {
  request({
    url: url,
    json: true
  }, function (e, res, body) {
    if (!e && res.statusCode !== 200) e = new Error('Server responded with status code ' + res.statusCode);
    if (e) return next(e);
    
    next(null, body);
  });
};