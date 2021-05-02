const request = require("postman-request");

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1Ijoic2h1YmhhbS1wYXNzaSIsImEiOiJja25sd3V2cWkwOWxrMnhsaW45bTUxMjlvIn0._zPioJJnL7AE9t3SYYwGSg&limit=1";
    request({ url, json: true }, (errors, { body } = {}) => {
        if (errors || !body) {
            return callback("unable to connect to Mapbox service!", undefined);
        } else if (body.features.length === 0) {
            return callback(
                "Unable to find location. Please try again with a different location.",
                undefined
            );
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
