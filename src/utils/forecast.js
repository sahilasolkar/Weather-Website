const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.pirateweather.net/forecast/ajPcgwoSRh7trkbq2HHLpaqAsItxuMdD3VSmSWIU/'+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)+'?units=si'

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('unable to connect to the weather services', undefined)
        }
        else if(body.message)
        {
            callback('unable to find the location', undefined)
        }
        else{
            callback(undefined, "Status: "+body.daily.data[0].summary+". Temperature: "+body.currently.temperature+" degrees. Chance Of Rain: "+body.currently.precipProbability+"%. Humidity: "+(body.daily.data[0].humidity)*100+"%. Windspeed: "+body.daily.data[0].windSpeed+" km/hr")
        }
    })
}

module.exports = forecast