// a js file for making pictures show up
console.log('need to request all the stuff for all the pictures. ')

let playing = true;

let rotateAngle = 270;


let photocontainer = document.querySelector('#photo_container')

let pictures = [];

let picCount = 0;
let pic_index = 0;


let delay = 3000;


let pics_obj = {};
let picDir = '';

let pic_element = document.querySelector('#picele')
let photo_date_div = document.getElementById('photo_date')

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

    picCount = pic_uris.pictures.length;

    pic_element.setAttribute("style", "transform: rotate(" + rotateAngle + "deg)");
  //for(let i = 1; i <= picCount-1; i++) {

    picDir = pic_uris.directory;

    let pico = pictureEle( pic_uris.directory + '/' + pic_uris.pictures[0])

    photo_container.appendChild(pico)

    showPic( pic_uris.directory + '/' + pic_uris.pictures[pic_index] )

  //}
}





function showPic( pic_uri ) {
  let showTime = performance.now();
  console.log('show individual pic,', pic_uri)


  pic_element.setAttribute('src',  pic_uri)

  console.log('picuri', pic_uri)
  let picname_split = pic_uri.split('/');
  let picname = picname_split[picname_split.length-1].split('.')[0]

  let pic_date = new Date(parseFloat(picname) * 1000)



  photo_date_div.innerText = pic_date.toString()

  if(playing === true  && pic_index < picCount - 1 ) {

    pic_index = pic_index + 1;
  //  console.log('show next pic')

    setTimeout( () => { showPic( picDir + '/' + pics_obj.pictures[pic_index] ) }, 1000 )

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


    document.getElementById('play').onclick = function() {

      if(playing) {
        playing = false;
      }
      else {
        playing = true;
        showPic( picDir + '/' + pics_obj.pictures[pic_index] )

      }
      console.log('clicked play')
    }

    document.getElementById('back').onclick = function() {

      pic_index = pic_index - 1;
    //  animateMarker();
        showPic( picDir + '/' + pics_obj.pictures[pic_index] )
      console.log('clicked back')
    }

    document.getElementById('forward').onclick = function() {

      pic_index = pic_index + 1;
              showPic( picDir + '/' + pics_obj.pictures[pic_index] )

      console.log('clicked forward')
    }

    document.getElementById('reset').onclick = function() {

      counter = 0;
      pic_index = 0;
      animateMarker();

      console.log('clicked reset')
    }


function get_pics( pic_dir ) {

  let sendObj = {directory:pic_dir}
  console.log('trying to send', sendObj)
  fetch('./pictures.json', {
    body: JSON.stringify(sendObj),
    method: 'POST', // or 'PUT'
    headers:{
  'Content-Type': 'application/json'
}
  })
    .then( res => res.json())
    .then(json => {
          console.log('pictures to request and show are: ', json)

          showPics(json)



    })
    .catch(err => {
      throw err
    })


}
