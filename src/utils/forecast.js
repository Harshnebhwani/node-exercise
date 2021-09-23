const request = require('postman-request');

const forecast = (data,callback) => {
    const geocodeurl = `http://api.weatherstack.com/current?access_key=9bd5c93918563c512b2f89640aa2ea93&query=${data.latitude},${data.longitude}&unit=f`;
    request(geocodeurl, function (error, response, body) {
        if(error)
        {
            callback("Unable to connect to mapbox geocoding api",undefined);
        }else if(body.error)
        {
            callback(body.error,undefined);
        }else{
            const newdata = JSON.parse(body);
            callback(undefined,{
                desc : newdata.current.weather_descriptions[0],
                temperature : newdata.current.temperature,
                feelslike : newdata.current.feelslike
            })
        }
    });
};

module.exports = forecast;