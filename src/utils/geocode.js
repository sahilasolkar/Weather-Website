const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiMXRyb3kiLCJhIjoiY2w0MnJsMng2MDNuazNqbjgyaDc4emZ0ayJ9.wuM0JvCaczwYKSFNHRl3NA&limit=1&limit=1'

    request({url, json:true}, (error, {body})=>{
        if(error)
        {
            callback('unable to connect to the location services', undefined)
        }
        else if(body.features.length==0)
        {
            callback('unable to find the location. Try another location.', undefined)
        }
        else
        {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode
