// simple express server

const express = require('express')
const app = express()
const port = 3001

let pictureArray = require('./pictureArray.js');


app.use(express.static('public'))

app.get('/pictures.json', (req, res) => {

  let picsdir = '../ride'
  pictureArray(picsdir, (pics) => {
    res.json({
      'pictures':pics,
      "directory": picsdir
    })


  })

})

app.get('/', (req, res) => {

    res.send('Hello World!')

  }
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
