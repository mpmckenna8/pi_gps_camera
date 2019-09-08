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
      {"id":20232528,"username":null,"resource_state":2,"firstname":"Matthew","lastname":"McKenna","city":null,"state":null,"country":null,"sex":"M","premium":false,"summit":false,"created_at":"2017-03-03T21:58:14Z","updated_at":"2019-06-10T06:14:41Z","badge_type_id":0,"profile_medium":"https://graph.facebook.com/10106329342455454427/picture?height=256\u0026width=256","profile":"https://graph.facebook.com/1q02110645364155454427/picture?height=256\u0026width=256","friend":null,"follower":null}


3.  But if you want to read activities you need to further authenticate so that you have the scope to read activities by getting a code then a special token you can refresh. Authenticate in a browser to get a code so you can then get a token which will allow you to access more API endpoints than basic profile info. Replace the XXXXXXXX's in the following link with the client id from https://www.strava.com/settings/api and the redirect URI you entered as well by replacing the YYYYYYY's (eg. http://localhost:8000). Then paste the link into your browser and on which you don't mind logging into Strava.

 https://www.strava.com/oauth/authorize?client_id=XXXXXX&response_type=code&redirect_uri=YYYYYYYY&scope=read,activity:read,activity:read_all&approval_prompt=force


After you successfully authenticate you should be redirected back to your site. With a querystring appended to the uri. like if you use localhost:8019 for your redirect uri it might look like:

http://localhost:8011/?state=&code=30697ac116643;lkjkj;lkj0c6e32303434309f25237bffa90&scope=read,activity:read,activity:read_all


4. The next step requires a POST req not a GET like you can just navigate to in your browser. But you can do a post from you browser with javascript to complete this part, see [/photo_viewer/public/strava_auth.html](/photo_viewer/public/strava_auth.html) and the js file it loads to see an example of how to do this.  

After running that use the data returned (which should be printed to the JavaScript console if successful) to make Strava API calls with way more scopes and build cool stuff.

For example now if you use HTTPie and put in the auth:
$ http GET "https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=" "Authorization: Bearer [[token]]"


or you can use just node (like in ./strava_data/get_activities.js) or make requests in a browser.


resources:

node module for strava api npm page: https://www.npmjs.com/package/strava-v3

Strava Developers auth page: https://developers.strava.com/docs/authentication/

Strava API Documentation: http://developers.strava.com/docs/reference/
