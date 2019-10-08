const request = require("request");
const apiKey =
  "pk.eyJ1IjoieWd5YXNoIiwiYSI6ImNrMWV3dGtxaTBsdjMzY281M2M4cDN1bDEifQ.kdor1tpyuIeE0_Ds1ZYMOA";

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey}&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to conncet to locations services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location,try another search", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geoCode;
