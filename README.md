# Weather API

Simple JSON API provides average temperature in IATA area by date from three sources: OpenWeatherMap, WorldWeatherOnline and Wunderground.

### Installation

```
git clone https://github.com/border-radius/weather && cd weather
npm install
cp config.sample.json config.json
```

Don't forget to set up your API keys in config.

To launch server execute `node index`.

### Testing

```
npm test
```

## API use example

API requires two parameters: IATA code and date (in any format which can be parsed with Date()).

```
$ curl http://localhost:8030/VKO/2014-11-21
{"temp":-4.93}

$ curl http://localhost:8030/VKO/2014-12-19
{"temp":-2.2}

$ curl http://localhost:8030/VKO/2014-12-22
{"temp":-1.08}