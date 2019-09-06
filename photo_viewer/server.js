// simple express server

const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const port = 8011

let pictureArray = require('./pictureArray.js');
let get_pic_directories = require('./get_photo_dirs.js')

// serve all files in public directory as static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// to req a list of pictures from a directory given in the body of the req
app.post('/pictures.json', (req, res) => {

  console.log('req body for /pictures.json: ', req.body)

  let picsdir = 'pics/' + req.body.directory

  pictureArray('./public/' + picsdir, (pics) => {

    //console.log('pics are =', pics)
    res.json({
      "pictures":pics,
      "directory": picsdir
    })

  })

})


// Route to return all the directories with pictures as an array in a json obj for the response
app.get('/collections.json', (req, res) => {
  let collections = [];
  get_pic_directories((photo_dirs) => {
    collections = photo_dirs;
    res.json({"collections":collections})
  })

})



app.get('/', (req, res) => {
    res.send('Hello World!, this server doesnt know what to do with that uri')
  }
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
