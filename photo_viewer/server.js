// simple express server

const express = require('express')
const app = express()
const port = 8011

let pictureArray = require('./pictureArray.js');


let get_pic_directories = require('./get_photo_dirs.js')

app.use(express.static('public'))


//
app.get('/pictures.json', (req, res) => {


  let picsdir = '/pics//home2gg_8-25'

  console.log('req body: ', req.body)

  pictureArray('./public/' + picsdir, (pics) => {

    //console.log('pics are =', pics)
    res.json({
      "pictures":pics,
      "directory": picsdir
    })


  })

})

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
