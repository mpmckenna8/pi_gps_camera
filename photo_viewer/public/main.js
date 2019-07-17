// a js file for making pictures show up
console.log('need to request all the stuff for all the pictures. ')

let playing = false;



let photocontainer = document.querySelector('#photo_container')

function pictureEle(piclink) {
  let imgele = document.createElement("img");

  imgele.setAttribute('src',  piclink);
  imgele.setAttribute('class', 'pi_pic')
  imgele.setAttribute('id', 'pic' + piclink.split('.')[0] )

  let rotateAngle = 270;

  imgele.setAttribute("style", "transform: rotate(" + rotateAngle + "deg)");


  return imgele;
  /*
  <img alt="Image" draggable="false" src="https://pbs.twimg.com/media/D_pwJQMXUAA4mVi?format=png&amp;name=small" class="css-9pa8cd">

  */
}




function showPics( pic_uris ) {



  let picCount = pic_uris.pictures.length;

  for(let i = 1; i <= picCount-1; i++) {

    let pico = pictureEle( pic_uris.directory + '/' + pic_uris.pictures[i])

    photo_container.appendChild(pico)
  }
}


fetch('./pictures.json')
  .then( res => res.json())
  .then(json => {

        console.log('pictures to request and show are: ', json)



        showPics(json)



  })
  .catch(err => {
    throw err
  })
