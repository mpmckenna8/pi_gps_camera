
var strava = require('strava-v3');

let token = "replace with the token from the /strava_data/get_token.js script";

let args = process.argv;

//console.log('args = ', args);


strava.athlete.listActivities({'access_token':token},function(err,payload,limits) {


  if(err) {
    console.log('there was an err with getting the list of activities for the user: ', err)
  }

    //do something with your payload, track rate limits with the limits var 
    console.log("activities = ,", payload)
    let activities = payload;
    let count = activities.length;


});
