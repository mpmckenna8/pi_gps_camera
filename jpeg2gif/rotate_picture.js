// thing to rotate a given pictures

let Jimp = require('jimp')
let rotate_pic = function(pic_path, cb) {

  Jimp.read(pic_path)
    .then(image => {
    // Do stuff with the image.
    console.log('want to rotate, ', image)
    let newPath = './jpeg2gif/temp/' + pic_path.split('/')[ pic_path.split('/').length - 1]

    console.log("new pic should be at", newPath);
    let tempPath = './jpeg2gif/temp/' + pic_path.split('/')[ pic_path.split('/').length - 1];
    image.rotate(90, true)
      .crop(0, 0, 482, 600)
      .write( './jpeg2gif/temp/' + pic_path.split('/')[ pic_path.split('/').length - 1] )
      if(cb) {
        cb(tempPath)
      }

  })
  .catch(err => {
    // Handle an exception.
    console.log('there was an err', err)
  });


}



module.exports = rotate_pic;


// example call
//rotate_pic("./photo_viewer/public/pics/home2fortpoint_8-3/1564867077.jpg")
