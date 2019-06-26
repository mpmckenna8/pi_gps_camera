// to make a file from my gps logging into geojson
let fs = require('fs')

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

let filename =  './gps_logs/1561425612.txt'// proecess.arg[2];
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader(filename);


    lr.on('error', function (err) {
    	// 'err' contains error object
    });

    lr.on('line', function (line) {
    	// 'line' contains the current line without the trailing newline character.
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





    lr.on('end', function () {
    	// All lines are read, file is closed now.
      let geostr = JSON.stringify(geojson);
    //  console.log('done processing file, maybe remove the line if theres only one point', JSON.stringify(geojson, null, 2))

      fs.writeFile('./gps_geojson/1561425612.geojson', geostr, (err) => {

        console.log('file should have been made or there should be an err', err)
      })
    });
