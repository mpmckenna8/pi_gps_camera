# Using the strava api

Getting the strava API to work for getting my actual gps traces was a little difficult as you have to oAuth authenticate so I'll try and give a little overview of how I figured out how to get it to work.

1. Set up an application
    - First thing to do is to log into strava in an internet browser.https://www.strava.com/
    - Navigate to the settings tab then the api option, or just go to https://www.strava.com/settings/api
    - Create an app.
    - set the Authorization Callback Domain as localhost:8011 while replacing 8011 with whatever port you like running you local servers on. The other fields don't really matter.
    - Make note of your client id, secret key and access token. It might help if you put the values in the proper places in the file /data/strava_config which is a text file with a simple JSON object.
2. Test that your basic stuff is working. By trying to curl or visiting in your browser https://www.strava.com/api/v3/athlete?access_token=XXXXXXXXXXXX replacing the X's with your access token which should be available from https://www.strava.com/settings/api.
    - If successful it should return a JSON object, which for me was:
      {"id":20232528,"username":null,"resource_state":2,"firstname":"Matthew","lastname":"McKenna","city":null,"state":null,"country":null,"sex":"M","premium":false,"summit":false,"created_at":"2017-03-03T21:58:14Z","updated_at":"2019-06-10T06:14:41Z","badge_type_id":0,"profile_medium":"https://graph.facebook.com/10106452455454427/picture?height=256\u0026width=256","profile":"https://graph.facebook.com/10106452455454427/picture?height=256\u0026width=256","friend":null,"follower":null}




Strava Developers auth page: https://developers.strava.com/docs/authentication/

Strava API Documentation: http://developers.strava.com/docs/reference/
