const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/a8395a5e29737e17ae936082d76b4218/${latitude},${longitude}?units=si`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("unalbe to find server", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} it is currently ${body.currently.temperature}C degrees out.There is a ${body.currently.precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
