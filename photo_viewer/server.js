// simple express server

const express = require('express')
const app = express()
const port = 3001

let pictureArray = require('./pictureArray.js');


app.use(express.static('public'))


app.get('/pictures.json', (req, res) => {


  let picsdir = '/pics/home2nb-7-15'

  pictureArray('./public/' + picsdir, (pics) => {

    console.log('pics are =', pics)
    res.json({
      "pictures":pics,
      "directory": picsdir
    })


  })

})

app.get('/', (req, res) => {

    res.send('Hello World!')

  }
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
