// function to get photo directory names.
let fs = require('fs');

console.log('getting files')
module.exports = function( cb ) {

  fs.readdir( './public/pics', (err, files) => {
    if(err) {
      console.log('err getting phto files', err)
    }

// get rid of hidden files like .ds_store
    let endfi = files.filter( (file) => file[0] !== '.')

    console.log('files', endfi)
    if( cb ) {
      cb(endfi)
    }
  })
}
