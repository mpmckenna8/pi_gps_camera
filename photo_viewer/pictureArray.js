// a function to take the path of a directory as a arg and return an array of all the jpgs in theres

let fs = require('fs');


let picasync = function( dir, cb ) {

  let pics_array = [];
  console.log('dir = ', dir.slice(1,))

  fs.readdir(dir, (err, files ) => {

    if(err) {
      console.log('err getting the pictures list', err)
      cb([])

    }

    files = files.filter( (file) => file[0] !== '.')


  //  console.log(files)
    cb(files)
    return files
  })

}

// sample call
//picasync('./public/pics/home2fortpoint_8-3', () => {})


module.exports = picasync
