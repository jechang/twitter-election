//Setup web server and socket
var twitter = require('twitter'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
    mysql = require('mysql');

/*
// Start connect to MySQl database
var connection = mysql.createConnection({  //MySQL database connection
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'MyTwitterStream'
});
// End connect to MySQl database
*/

// Start Amazon RDS mySQL connection
var connection = mysql.createConnection({
  host     : 'twitterdb.cvszelfjqssa.us-west-1.rds.amazonaws.com',
  user     : 'Jonathan',
  password : 'amazoncloud',
  port     : '3306',
  database : 'MyTwitterStream'
});
// End Amazon RDS mySQL connection


var interval;
console.log("Troubleshoot ... \n\n"); 
connection.connect(function(err){
  if(!err) {
      console.log("Database is connected ... \n\n");  
  } else {
      console.log("Error connecting database ... \n\n");  
  }
});
// End connect to MySQl database

// Start reading from database for tweet locations

var queryString = 'SELECT * FROM TWEETS';

connection.query(queryString, function(err, rows, fields) {
  if (err) throw err;
  
  for (var i in rows) {
    console.log('Status is: ', rows[i].latitude);
    //process.stdout.write('Status is: ', rows[i].latitude);
  }
});

//connection.end();
// End reading from database for tweet locations
 
//Setup twitter stream api
var twit = new twitter({
  consumer_key: '97awir09gMiKoUitNnIc6e11n',
  consumer_secret: '4vUtj7jDw2iGyYOCL3i28hDRhSFTTKpJgqsHSIQWzRWM6JgWIi',
  access_token_key: '3943692555-8ere0NGBIeVIor9fXnbvIry1OyJWk6XrH3rCTtE',
  access_token_secret: 'i6xFpnDfNArsYTXgrRvZ3VZI6SQtR8NWh14ASGeHDVUfT'
}),
stream = null;

//Use the default port (for beanstalk) or default to 8081 locally
server.listen(process.env.PORT || 8081);

//Setup rotuing for app
app.use(express.static(__dirname + '/public'));

//Create web sockets connection.
io.sockets.on('connection', function (socket) {
  console.log("Server recieved connection...");

  socket.on("start tweets", function(data) {
    console.log("Server start tweets...");
    console.log(data);

    //var obj = JSON.parse(data);
    console.log(data.keyword);

    clearInterval(interval);
    
    // START reading from database for tweet locations
    var queryString = 'SELECT * FROM TWEETS WHERE category = "' + data.keyword + '"';

    connection.query(queryString, function(err, rows, fields) {
      if (err) throw err;

      for (var i in rows) {
        console.log('Status is of category: ', rows[i].category, ' with latitude: ', rows[i].latitude, 'and longitude: ', rows[i].longitude);
        var outputPoint = {"lat": rows[i].latitude,"lng": rows[i].longitude};
        socket.broadcast.emit("add marker", outputPoint);
        //Send out to web sockets channel.
        socket.emit('add marker', outputPoint);
        console.log('Server just sent new marker...');
        //process.stdout.write('Status is: ', rows[i].latitude);
        }

      }); 

    interval = setInterval(function(){
      console.log('Checking for new tweets...');

      var queryString = 'SELECT * FROM TWEETS WHERE category = "' + data.keyword + '"';

      connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;

        for (var i in rows) {
          console.log('Status is of category: ', rows[i].category, ' with latitude: ', rows[i].latitude, 'and longitude: ', rows[i].longitude);
          var outputPoint = {"lat": rows[i].latitude,"lng": rows[i].longitude};
          socket.broadcast.emit("add marker", outputPoint);
          //Send out to web sockets channel.
          socket.emit('add marker', outputPoint);
          console.log('Server just sent new marker...');
          //process.stdout.write('Status is: ', rows[i].latitude);
          }

        }); 

    }, 3000)
    // END reading from database for tweet locations
  
  });

    // Emits signal to the client telling them that the
    // they are connected and can start receiving Tweets
    socket.emit("connected");
    console.log("Server emitting connected...");
});

 /*    
    if(stream == null) {

      stream.on('data', function(data) {
        // START reading from database for tweet locations
        var queryString = 'SELECT * FROM TWEETS';

        connection.query(queryString, function(err, rows, fields) {
          if (err) throw err;

          for (var i in rows) {
            console.log('Status is of category: ', rows[i].category, ' with latitude: ', rows[i].latitude, 'and longitude: ', rows[i].longitude);

            var outputPoint = {"lat": rows[i].latitude,"lng": rows[i].longitude};

            socket.broadcast.emit("twitter-stream", outputPoint);
            //process.stdout.write('Status is: ', rows[i].latitude);
          }
        // END reading from database for tweet locations

        stream.on('limit', function(limitMessage) {
              return console.log(limitMessage);
            });

        stream.on('warning', function(warning) {
          return console.log(warning);
        });

        stream.on('disconnect', function(disconnectMessage) {
          return console.log(disconnectMessage);
        });
        }

      });
      //connection.end();
      
    }
    */
     
    /*
    if(stream === null) {
      //Connect to twitter stream passing in filter for entire world.
      twit.stream('statuses/filter', {'locations':'-180,-90,180,90'}, function(stream) {
          stream.on('data', function(data) {
              // Does the JSON result have coordinates
              if (data.coordinates){
                if (data.coordinates !== null){
                  //If so then build up some nice json and send out to web sockets
                  var outputPoint = {"lat": data.coordinates.coordinates[0],"lng": data.coordinates.coordinates[1]};

                  socket.broadcast.emit("twitter-stream", outputPoint);

                  //Send out to web sockets channel.
                  socket.emit('twitter-stream', outputPoint);
                  //process.stdout.write("Tweet geolocation added! | ");
                  //console.log("Tweet geolocation added! | ");
                }
                
                else if(data.place){
                  if(data.place.bounding_box === 'Polygon'){
                    // Calculate the center of the bounding box for the tweet
                    var coord, _i, _len;
                    var centerLat = 0;
                    var centerLng = 0;

                    for (_i = 0, _len = coords.length; _i < _len; _i++) {
                      coord = coords[_i];
                      centerLat += coord[0];
                      centerLng += coord[1];
                    }
                    centerLat = centerLat / coords.length;
                    centerLng = centerLng / coords.length;

                    // Build json object and broadcast it
                    var outputPoint = {"lat": centerLat,"lng": centerLng};
                    socket.broadcast.emit("twitter-stream", outputPoint);

                  }
                }
                
              }
              stream.on('limit', function(limitMessage) {
                return console.log(limitMessage);
              });

              stream.on('warning', function(warning) {
                return console.log(warning);
              });

              stream.on('disconnect', function(disconnectMessage) {
                return console.log(disconnectMessage);
              });
          });
      });
    }
    
    */

