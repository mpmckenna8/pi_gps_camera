// a js file for making pictures show up

let settings = {
  playing: true,
  rotateAngle: 270,
  delay: 2000
}


let pictures = [];

// the total number of pics in the collection
let picCount = 0;
//
let pic_index = 0;

let photo_index_slider = document.getElementById('index_slider')
let pic_count_span = document.getElementById('photos_length')
let pic_index_span = document.getElementById('indexnumber');
let photocontainer = document.querySelector('#photo_container')
let play_button = document.getElementById('play');
let filename = document.getElementById('filename');

let make_gif_button = document.getElementById('make_gif');


let pic_dislpay = "";
let pics_obj = {};
let picDir = '';
let picName = "";

let pic_element = document.querySelector('#picele')
let photo_date_div = document.getElementById('photo_date')


// creates the initial picture element and div it's inside of
function pictureEle(piclink) {

  let pic_div = document.createElement('div');
  let img_div = document.createElement('div')
  let date_p = document.createElement('div')

  let imgele = document.createElement("img");

  let picname_split = piclink.split('/');
  let picname = picname_split[picname_split.length-1].split('.')[0]

  let pic_date = new Date(parseFloat(picname) * 1000)

  date_p.innerHTML = pic_date.toString();

  //console.log(pic_date)

  pic_div.setAttribute('src', 'pic_diver')
  pic_div.setAttribute('class', 'pic_div')

  imgele.setAttribute('src',  piclink);

  return pic_div;

}




function showPics( pic_uris ) {

    pics_obj = pic_uris;
    console.log(pics_obj)

    picCount = pic_uris.pictures.length;

    pic_element.setAttribute("style", "transform: rotate(" + settings.rotateAngle + "deg)");
  //for(let i = 1; i <= picCount-1; i++) {

    picDir = pic_uris.directory;

    console.log('picDir = ', picDir)
    pic_count_span.innerText = picCount;
    pic_index_span.innerText = pic_index + 1;


    photo_index_slider.setAttribute('max', picCount)


    let pico = pictureEle( pic_uris.directory + '/' + pic_uris.pictures[0])

    photo_container.appendChild(pico)

    showPic( pic_uris.directory + '/' + pic_uris.pictures[pic_index] )

  //}
}





function showPic( pic_uri ) {
  let showTime = performance.now();
  //console.log('show individual pic,', pic_uri, 'picindex = ', pic_index);

  pic_index_span.innerText = parseInt(pic_index) + 1;


  photo_index_slider.value = ( pic_index )


  pic_element.setAttribute('src',  pic_uri)

  let picname_split = pic_uri.split('/');
  let picname = picname_split[picname_split.length-1].split('.')[0]

  pic_dislpay = picname_split[picname_split.length-1];

  filename.innerText = pic_dislpay;

  let pic_date = new Date( parseFloat(picname) * 1000)

  photo_date_div.innerText = pic_date.toString()

  // make sure that playing is true and there are more pictures
  if(settings.playing === true  && pic_index < picCount - 1 ) {
    pic_index = pic_index + 1;
    setTimeout( () => { showPic( picDir + '/' + pics_obj.pictures[pic_index] ) }, settings.delay )
  }
}



fetch('./collections.json')
.then( res => res.json())
.then(json => {
      console.log('picture collections to show in dropdown: ', json)

      populate_album_select( json )

})
.catch(err => {
  console.log('there was an err getting collections', err)
})





function populate_album_select( collectionsObj ) {

  let collections = collectionsObj.collections

  console.log('need to populate select thing', collections)

  let album_select = document.getElementById('album_select');

  for( collection of collections ) {

    let collection_option = document.createElement('option');

    collection_option.setAttribute('value', collection);
    collection_option.innerText = collection

    album_select.appendChild(collection_option)
  }


  album_select.addEventListener('change', (e) => {

    console.log('this = ', this, 'and e = ', e.target.value)
    pic_index = 0;
    get_pics(e.target.value)

  })


}

document.getElementById('reset').onclick = function() {

  pic_index = 0;
  showPic( picDir + '/' + pics_obj.pictures[pic_index] )

  console.log('clicked reset')
}


    document.getElementById('play').onclick = function() {

      if(settings.playing) {
        play_button.innerText = "Play "
        settings.playing = false;
      }
      else {
        settings.playing = true;
        play_button.innerText = "Pause"
        showPic( picDir + '/' + pics_obj.pictures[pic_index] )

      }
      console.log('clicked play/pause')
    }

    document.getElementById('back').onclick = function() {

      pic_index = pic_index - 1;
    //  animateMarker();
      if( !settings.playing ) {
        showPic( picDir + '/' + pics_obj.pictures[pic_index] )
      }
      console.log('clicked back')
    }

    document.getElementById('forward').onclick = function() {

      pic_index = pic_index + 1;

      if( !settings.playing ) {

        showPic( picDir + '/' + pics_obj.pictures[pic_index] )
      }

      console.log('clicked forward')
    }

    document.getElementById('reset').onclick = function() {

      counter = 0;
      pic_index = 0;
      animateMarker();

      console.log('clicked reset')
    }

    make_gif_button.onclick = function(e) {

      console.log('make gif with', this, e)
      makeGifPost(picDir, pic_dislpay)
    }

    photo_index_slider.addEventListener('change', function() {


      let slider_value = this.value;
      pic_index = parseInt(slider_value);

      console.log('slider_value = ', slider_value)

    })

    document.getElementById('delay_input').onchange = function() {
      settings.delay = document.getElementById('delay_input').value * 1000
      console.log('changed delay to, ', settings.delay)
    }

    let rotate_input = document.getElementById('rotate_input')

    rotate_input.onchange = function() {
      changeRotate(settings, rotate_input)
    }
