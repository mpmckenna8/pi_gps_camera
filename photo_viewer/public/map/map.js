// Javascript to make the map and pictures go

// when set to true the annimation through the pictures and points will start.
let play = false;
let delay = 500; 

let timep = document.getElementById('timep');
let pic_element = document.getElementById('photo_img');
let pic_dir = "";

mapboxgl.accessToken =  'pk.eyJ1IjoibXBtY2tlbm5hOCIsImEiOiJfYWx3RlJZIn0.v-vrWv_t1ytntvWpeePhgQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [ -122.3789,37.7859],
    zoom: 12
});

var radius = 20;

var point = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {"bearing": 0},
    "geometry": {
    "type": "Point",
    "coordinates": [0,0]
    }
  }]
};


var line_animate = {
  "type": "FeatureCollection",
  "features": [{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      ]
    }
  }]
};

let counter = 0;
let num_points =  0;
let start_time;
var trip_time = Date.parse('01 Jan 1970 03:00:00 GMT')/100;
let interval = 1;
let pictures = []
let pic_index = 0;

let liner = {}


map.on('load', function () {
    // Add a source and layer displaying a point which will be animated with a bicycle svg.
    fetch('./map.geojson')

      .then(res => res.json())
      .then(json => {

        liner = json.features[0];

        console.log('critical mass data', json.features[0])

    //    console.log(point)

        point.features[0].geometry.coordinates = liner.geometry.coordinates[0];

        start_time = new Date(liner.properties.time)
    //    trip_time = liner.properties.elapsed_time;
        num_points = liner.geometry.coordinates.length;

        console.log('interval, ', interval, ' , trip_time', trip_time)


        interval = trip_time / num_points;

        console.log('interval, ', interval, ' , trip_time', trip_time)

        point.features[0].properties.time = start_time;

        console.log('start time', start_time)
        start_time.setSeconds( start_time.getSeconds() + interval )

        console.log('num_points = ', num_points)


        //timep.append(start_time)
        timep.textContent = ( start_time.toString() )


        map.addSource('point', {
            "type": "geojson",
            "data": point
        });


        map.addLayer({
          "id": "point",
          "source": "point",
          "type": "symbol",
          "layout": {
          "icon-image": "bicycle-15",
          "icon-rotate": ["get", "bearing"],
          "icon-rotation-alignment": "map",
          "icon-allow-overlap": true,
          "icon-ignore-placement": true
          }
        });

        let sendObj = {"directory": "home2fortpoint_8-3"}
        fetch('/pictures.json', {
          body: JSON.stringify(sendObj),
          method: 'POST', // or 'PUT'
          headers:{
            'Content-Type': 'application/json'
          }
        })
          .then( res => res.json())
          .then(json => {


                console.log('pictures to request and show are: ', json)
                pictures = json.pictures;
                pic_dir = '/' + json.directory + "/"
                pic_element.setAttribute('src', '/' + pic_dir + pictures[0])

                let rotateAngle = 270

                pic_element.setAttribute("style", "transform: rotate(" + rotateAngle + "deg)");

                animateMarker(0);

            //    showPics(json)



          })
          .catch(err => {
            console.log('err getting pictures', err)
            throw err
          })

        // Start the animation.
      })
      .catch(err => {
        console.log('there was an err with the geojson req', err)
      })

    // add the line which will be modified in the animation
    map.addLayer({
      'id': 'liner',
      'type': 'line',
      'source': {
      'type': 'geojson',
      "data": './map.geojson'
    },
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ed6498',
      'line-width': 5,
      'line-opacity': .8
    }
    });

    map.addLayer({
      'id': 'line-animation',
      'type': 'line',
      'source': {
      'type': 'geojson',
      'data': line_animate
      },
      'layout': {
      'line-cap': 'round',
      'line-join': 'round'
      },
      'paint': {
      'line-color': '#00ff98',
      'line-width': 5,
      'line-opacity': .8
      }
      });


    document.getElementById('play').onclick = function() {

      if(play) {
        play = false;
        this.innerHTML = "play"
      }
      else {
        play = true;
        // make button say pause inside;
        this.innerHTML = "pause"
        animateMarker();
      }
      console.log('clicked play')
    }

    document.getElementById('back').onclick = function() {
      counter = counter - Math.floor(interval);
      animateMarker();
      console.log('clicked play')
    }

    document.getElementById('forward').onclick = function() {
      counter = counter + Math.floor(interval);
      animateMarker();
      console.log('clicked forward')
    }

    document.getElementById('reset').onclick = function() {

      counter = 0;
      pic_index = 0;
      animateMarker();

      console.log('clicked reset')
    }


    function animateMarker(timestamp) {
        // Update the data to a new position based on the animation timestamp. The

  //      console.log(source)
        // Request the next frame of the animation.
        if(counter < num_points - interval ) {


          map.getSource('point').setData(point);


          point.features[0].geometry.coordinates = liner.geometry.coordinates[counter]
          line_animate.features[0].geometry.coordinates.push(liner.geometry.coordinates[counter])

          map.getSource('line-animation').setData(line_animate);

          counter = counter + 1;
          start_time.setSeconds( start_time.getSeconds() + interval )


          let picname = pictures[pic_index].split('/')
          picname = picname [picname.length-1].split('.')[0]
      //    console.log('picname', picname)

          let pic_time = new Date(parseFloat(picname) * 1000);
            //    console.log(pic_time, 'start_time', start_time)
          //      console.log('start_time, ', pic_time < start_time)
          // could also try and do it by matching up times but it doesn't work well with strava data b/c I take lots of long breaks.
                  if( pic_index * (num_points / pictures.length)  < counter ) {

                    pic_index = pic_index + 1;

                    document.getElementById('photo_img').setAttribute('src', pic_dir + pictures[pic_index])

                  }
                  else {
                    document.getElementById('photo_img').setAttribute('src', pic_dir + pictures[pic_index])

                    pic_index = pic_index - 1;

                  }
          
          // console.log(point)

          point.features[0].properties.bearing = turf.bearing(
                turf.point(liner.geometry.coordinates[counter >= num_points ? counter - 1 : counter]),
                turf.point(liner.geometry.coordinates[counter >= num_points ? counter : counter + 1])) - 90;

          document.getElementById('timep').innerText =  ( start_time.toString() )


          if(play && pictures[pic_index]) {

            setTimeout( () => { requestAnimationFrame(animateMarker) }, delay  );
        }

      }
    }

    document.getElementById('delay_input').onchange = function() {
      delay = document.getElementById('delay_input').value * 1000
    }


});
