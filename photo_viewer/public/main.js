// a js file for making pictures show up
console.log('need to request all the stuff for all the pictures. ')

let playing = false;



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


  console.log(pic_date)

  pic_div.setAttribute('src', 'pic_diver')

  imgele.setAttribute('src',  piclink);
  imgele.setAttribute('class', 'pi_pic')
  imgele.setAttribute('id', 'pic' + piclink.split('.')[0] )

  let rotateAngle = 270;

  imgele.setAttribute("style", "transform: rotate(" + rotateAngle + "deg)");


  img_div.appendChild(imgele)

  pic_div.appendChild(date_p)

  pic_div.appendChild(img_div)

  return pic_div;
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
