// to make a file from my gps logging into geojson
let fs = require('fs')

let fileTime = "1561162675"


// want to not have lineString if less than one point.
let geojson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": []
      }
    }
  ]
}


let Feature = function(coords) {


  return     {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": coords
      }
    }
}

let filename =  './gps_logs/' + fileTime + '.txt'// proecess.arg[2];
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader(filename);


    lr.on('error', function (err) {
    	// 'err' contains error object
    });

    lr.on('line', function (line) {
    	// 'line' contains the current line without the trailing newline character.
      /*
      need to handle when lines are 2 things on aline like:
      $GPGSV,3,1,12,17,85,112,32,19,66,204,13,28,50,051,16,48,44,1$GPGGA,162824.000,3747.7920,N,12225.4030,W,1,05,1.91,33.0,M,-25.3,M,,*6A

      */
      if( line.includes('$GPGGA') ) {

        let lineArray = line.split(',')

        let lat = parseInt(lineArray[2]/100) + parseFloat(lineArray[2]) % 100 / 60.0

        console.log( 'lon = ', parseInt(lineArray[4])/100)
        let lon = (parseInt(lineArray[4]/100) + parseFloat( lineArray[4]) % 100 / 60) * -1
        console.log('line = ', lineArray)

        let feat = Feature([lon, lat])

        geojson.features[0].geometry.coordinates.push([lon,lat])
        geojson.features.push(feat)



    }
    });




    // All lines are read, file is closed now.
    lr.on('end', function () {

      // want to not have lineString if less than one point.
      let geostr = JSON.stringify(geojson);
    //  console.log('done processing file, maybe remove the line if theres only one point', JSON.stringify(geojson, null, 2))

      fs.writeFile('./gps_geojson/' + fileTime + '.geojson', geostr, (err) => {

        console.log('file should have been made or there should be an err', err)
      })
    });
