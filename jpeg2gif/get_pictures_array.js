// to get some get_pictures

let get_pictures = require('../photo_viewer/pictureArray.js')

let pic_fold = '10-1_home2nb';

let get_pics = function( dir, fileName, num_pics, cb ) {

  get_pictures( dir, (files) => {

    console.log('dir = ', dir)
    let start_index = files.indexOf(fileName)
//  console.log('first file thing is, ', files[start_index])

    let gif_pics = [];

    for( let i = 0; i < num_pics; i++ ) {
      gif_pics.push( dir +  '/' + files[ start_index + i ] )
    }

    console.log('gif_pics', gif_pics)
    if( cb ) {
      cb(gif_pics)
    }
  })
}


module.exports = get_pics;

//get_pics('./photo_viewer/public/pics/' + pic_fold , '1569956082.jpg', 7)
