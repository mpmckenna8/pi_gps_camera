
var strava = require('strava-v3');

let token = "replace with the token from the /strava_data/get_token.js script";

let args = process.argv;

//console.log('args = ', args);



strava.athlete.listActivities({'access_token':token},function(err,payload,limits) {
    //do something with your payload, track rate limits

    console.log("activities = ,", payload)
    let activities = payload;
    let count = activities.length

    if(err) {
      console.log('there was an err with activities', err)
    }
});
