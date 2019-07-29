// example of authenticating with the Strava oAuth2 api
let client_id = "your client id as a String"
let client_secret = "your client secret as a string."
let code = "the code=(this part) from the auth redirect."


let auth_url = "https://www.strava.com/oauth/token?client_id=" + client_id +
"&code=" + code + "&grant_type=authorization_code&client_secret=" + client_secret;



console.log('JS loaded and should start the auth req.')

fetch( auth_url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.)
  })
  .then(res => res.json())
  .then(json => {

    console.log('res is ', json)
    // then use that stuff in the json to fire off more requrests using the credentials to get your info and make cool stuff!
  })
  .catch(err => {
    console.log('err with strava auth req', err)
  })
