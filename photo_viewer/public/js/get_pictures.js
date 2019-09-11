// used in main.js

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
