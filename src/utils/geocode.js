const request = require('postman-request');

const geocode = (address,callback) => {
    const geocodeurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGFyc2huZWJod2FuaSIsImEiOiJja3R2amhkOGMwbGcwMnZtcDd5ZXYxbWw1In0.yHBQfjIKS9VpUhTqrc3YVA&limit=1`;
    request(geocodeurl, function (error, response, body) {
        const data = JSON.parse(body);
        if(error)
        {
            callback("Unable to connect to mapbox geocoding api",undefined);
        }else if(data.features.length === 0)
        {
            callback("No location found, Try new search.",undefined);
        }else{
            const geodata = data.features[0].center;
            const latitude = geodata[1];
            const longitude = geodata[0];
            callback(undefined,{
                latitude:latitude,
                longitude:longitude,
                place_name:data.features[0].place_name
            });
        }
    });
};

module.exports = geocode;