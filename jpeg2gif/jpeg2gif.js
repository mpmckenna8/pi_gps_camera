// jpeg 2 gif thing

var getPixels = require('get-pixels')
var GifEncoder = require('gif-encoder');

var get_pics = require('./get_pictures_array.js')
var rotate_pic = require('./rotate_picture.js');


let num_pics = process.argv[4] || 45;

let gif_name =  process.argv[5] || "giffer.gif";

let first_pic_name = process.argv[3] || "1570847604.jpg";

let pic_fold = process.argv[2] || '10-11_eb-bike-party';
let pics_path = './photo_viewer/public/pics/'


const fs = require('fs');



var addToGif = function(images, counter = 0, gif) {

  getPixels(images[counter], function(err, pixels) {

    console.log('pixels = , ', pixels)
    gif.addFrame(pixels.data);
  //  gif.read();
    if (counter === images.length - 1) {
      gif.finish();
    } else {
      addToGif(images, ++counter, gif);
    }
  })
}



module.exports = function( pic_path, first_pic, number_pics, delay) {
  pics_path = '../photo_viewer/public/' + pic_path

get_pics( pics_path, first_pic, number_pics, ( gif_pics ) => {
  let gif = new GifEncoder( 482, 600, 4 );
  let file = fs.createWriteStream(gif_name);
  gif.pipe(file);
  gif.setQuality(5);
  gif.setDelay(delay * 1000);
  gif.writeHeader();

  let rotated_pics = [];

  gif_pics.forEach( (d) => {
    rotate_pic(d, (rot_path) => {
      rotated_pics.push(rot_path)
      if(rotated_pics.length === gif_pics.length) {
        console.log('rotated_pics', rotated_pics)
        addToGif(rotated_pics, 0, gif)
      }
    })
  })

})
}
