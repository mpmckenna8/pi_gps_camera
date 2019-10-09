// thing to rotate a given pictures

let Jimp = require('jimp')
let rotate_pic = function(pic_path) {

  Jimp.read(pic_path)
    .then(image => {
    // Do stuff with the image.
    console.log('want to rotate, ', image)
    let newPath = './jpeg2gif/temp/' + pic_path.split('/')[ pic_path.split('/').length - 1]

    console.log("new pic should be at", newPath);

    image.rotate(90, true)
      .write( './jpeg2gif/temp/' + pic_path.split('/')[ pic_path.split('/').length - 1] )
  })
  .catch(err => {
    // Handle an exception.
    console.log('there was an err', err)
  });


}


rotate_pic("./photo_viewer/public/pics/home2fortpoint_8-3/1564867077.jpg")
