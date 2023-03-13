const request = require("request");

const forecast = (latitude, longitude, callback) => {
  console.log("abc")
  const url ="http://api.weatherstack.com/current?access_key=bece4d643b6d8370ccf0e6154fec24e8&query=" +latitude +"," +longitude;
  request({ url, json: true }, (error, {body}) => {
    console.log(error)
    console.log(body)
    if (error) {
      callback("unable to connect location services", undefined);
    } else if (body.location === 0) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out . There is a " + body.current.feelslike + "% chance of rain.");
    }
  });
};

module.exports = forecast;