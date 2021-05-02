const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=1f148af4bf08ef35a6ef29807312b8ab&query=" +
        latitude +
        "," +
        longitude;

    request({ url, json: true }, (errors, { body }) => {
        if (errors) {
            callback("unable to connect to weather service!", undefined);
        } else if (body.error) {
            console.log("unable to find location", undefined);
        } else {
            callback(
                undefined,
                `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out. it feels like ${body.current.feelslike} degrees out`
            );
        }
    });
};

module.exports = forecast;
