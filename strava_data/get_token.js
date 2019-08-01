var strava = require('strava-v3');


let code = "enter code from browser redirect here"

function done(err, data, stats) {

  if(err) {
    console.log(err);
    throw err;
  }
  console.log('data', data)
}


strava.oauth.getToken(code,done)
