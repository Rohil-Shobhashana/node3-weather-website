const request = require("request")
const geocode = (address, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=77f83ba884a240db0e57ac6dcb387084&query=" + encodeURIComponent(address) + "&units=m"
    request({ url, json: true }, (error, { body }) => {
     
        if (error ) {
            
            callback("unable to connect location services", undefined)
        } else if (!body?.location) {
            
            callback("Try it again",undefined)
            console.log("unable to find location", undefined)
        } else {
            

            callback(undefined, {
                latitude: body.location["lat"],
                longitude: body.location["lon"],
                location: body.location["name"]
            })
        }
    })
}
module.exports = geocode