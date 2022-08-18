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
            callback(undefined, body.daily.data[0].summary+" .It is currently "+body.currently.temperature+" degrees out. There is a "+body.currently.precipProbability+"% chance of rain")
        }
    })
}

module.exports = forecast