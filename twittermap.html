<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Heatmaps</title>
    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #map {
        height: 100%;
      }
#floating-panel {
  position: absolute;
  top: 10px;
  left: 25%;
  z-index: 5;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #999;
  text-align: center;
  font-family: 'Roboto','sans-serif';
  line-height: 30px;
  padding-left: 10px;
}

      #floating-panel {
        background-color: #fff;
        border: 1px solid #999;
        left: 25%;
        padding: 5px;
        position: absolute;
        top: 10px;
        z-index: 5;
      }
    </style>
  </head>

  <body>
    <div id="floating-panel">
      <button onclick="toggleHeatmap()">Toggle Heatmap</button>
      <button onclick="changeGradient()">Change gradient</button>
      <button onclick="changeRadius()">Change radius</button>
      <button onclick="changeOpacity()">Change opacity</button>
    </div>
    
    <div id="map"></div>
	
	<form id="filter" method="POST" action='#'>
        <select id='keywords' name='keywords'>
            <option value='all'>All</option>
            <option value='movies'>Movies</option>
            <option value='music'>Music</option>
            <option value='sports'>Sports</option>
            <option value='finance'>Finance</option>
            <option value='technology'>Technology</option>
            <option value='fashion'>Fashion</option>
            <option value='science'>Science</option>
            <option value='travel'>Travel</option>
            <option value='health'>Health</option>
            <option value='cricket'>Cricket</option>
            <option value='india'>India</option>
          </select>
          <input type="submit" value="Filter">
    </form>

    <script>

    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    //Setup heat map and link to Twitter array we will append data to
    var heatmap;
    var liveTweets = new google.maps.MVCArray();
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: liveTweets,
      radius: 25
    });
    heatmap.setMap(map);

    if(io !== undefined) {
      // Storage for WebSocket connections
      var socket = io.connect('http://localhost:8081/');

      // This listens on the "twitter-steam" channel and data is 
      // received everytime a new tweet is receieved.
      socket.on('twitter-stream', function (data) {

        //Add tweet to the heat map array.
        var tweetLocation = new google.maps.LatLng(data.lng,data.lat);
        liveTweets.push(tweetLocation);

        //Flash a dot onto the map quickly
        var image = "css/small-dot-icon.png";
        var marker = new google.maps.Marker({
          position: tweetLocation,
          map: map,
          icon: image
        });
        setTimeout(function(){
          marker.setMap(null);
        },600);

      });

      // Listens for a success response from the server to 
      // say the connection was successful.
      socket.on("connected", function(r) {

        //Now that we are connected to the server let's tell 
        //the server we are ready to start receiving tweets.
        socket.emit("start tweets");
      });
    }
    
    </script>
    <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDLvSZuLTHdjoM20vW0TPIFor_S-isz7wo&signed_in=true&libraries=visualization&callback=initMap">
    </script>
  </body>
</html>