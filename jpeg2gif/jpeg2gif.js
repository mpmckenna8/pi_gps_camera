// jpeg 2 gif thing

var getPixels = require('get-pixels')
var GifEncoder = require('gif-encoder');
var gif = new GifEncoder(720, 480);

var file = require('fs').createWriteStream('./img.gif');
var pics = ['../photo_viewer/public/pics/09-08_gg_park/1567951224.jpg', '../photo_viewer/public/pics/09-08_gg_park/1567951229.jpg', '../photo_viewer/public/pics/09-08_gg_park/1567951233.jpg'];

gif.pipe(file);
gif.setQuality(6);
gif.setDelay(1000);
gif.writeHeader();

var addToGif = function(images, counter = 0) {
  getPixels(images[counter], function(err, pixels) {

    console.log('pixels = , ', pixels)
    gif.addFrame(pixels.data);
  //  gif.read();
    if (counter === images.length - 1) {
      gif.finish();
    } else {
      addToGif(images, ++counter);
    }
  })
}

addToGif(pics);
