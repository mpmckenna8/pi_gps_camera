// a function to take the path of a directory as a arg and return an array of all the jpgs in theres


let fs = require('fs');


//let picsync = fs.readdirSync('../ride' )

//console.log('getting pictures', picsync)
let picasync = function( dir, cb ) {

  let pics_array = [];

  fs.readdir(dir, (err, files ) => {

    if(err) {
      console.log('err getting the pictures list')
    }

    console.log(files)
    cb(files)
    return files
  })

}

//picasync('../ride', () => {})


module.exports = picasync
