// a js file for making pictures show up
console.log('need to request all the stuff for all the pictures. ')

let playing = false;

let rotateAngle = 270;


let photocontainer = document.querySelector('#photo_container')



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

  imgele.setAttribute('class', 'pi_pic')
  imgele.setAttribute('id', 'pic' + piclink.split('.')[0] )


  imgele.setAttribute("style", "transform: rotate(" + rotateAngle + "deg)");


  img_div.appendChild(imgele)

  pic_div.appendChild(date_p)

  pic_div.appendChild(img_div)

  return pic_div;

}




function showPics( pic_uris ) {


  let picCount = pic_uris.pictures.length;

  

  for(let i = 1; i <= picCount-1; i++) {

    let pico = pictureEle( pic_uris.directory + '/' + pic_uris.pictures[i])

    photo_container.appendChild(pico)
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

    get_pics(e.target.value)


  })



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
        //  console.log('pictures to request and show are: ', json)

          showPics(json)

    })
    .catch(err => {
      throw err
    })


}
