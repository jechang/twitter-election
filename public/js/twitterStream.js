var selectedkeyword;
var liveTweets;

function initialize() {
  console.log('Initializing Google Map...')

  // Setup Google Map
  var myLatlng = new google.maps.LatLng(17.7850,-12.4183);
  var light_grey_style = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
  var myOptions = {
    zoom: 3,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    styles: light_grey_style
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  
  //Setup heat map and link to Twitter array we will append data to
  var heatmap;
  liveTweets = new google.maps.MVCArray();
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: liveTweets,
    radius: 25
  });
  heatmap.setMap(map);
  // End setting up Google Map

  if(io !== undefined) {
    // Storage for WebSocket connections
    //var socket = io.connect('http://localhost:8081'); //Jonathan enter in localhost address
    var socket = io.connect('http://twittermapjc4267-env.elasticbeanstalk.com');

    // This listens on the "twitter-steam" channel and data is 
    // received everytime a new tweet is receieved.
    socket.on('add marker', function (data) {
      console.log('New marker recieved...')
      //Add tweet to the heat map array.
      var tweetLocation = new google.maps.LatLng(data.lat,data.lng);
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
      //socket.emit("start tweets");
    });
  }
}

function myFunction() {
    var x = document.getElementById("mySelect").selectedIndex;
    var y = document.getElementById("mySelect").options;
    //alert("Index: " + y[x].index + " is " + y[x].text);

    if (y[x].text == 'Clinton') {
      //alert("Clinton selected!");

      while(liveTweets.getLength() > 0) liveTweets.pop(); // Clear current markers on map 
      //var socket = io.connect('http://localhost:8081');
      var socket = io.connect('http://twittermapjc4267-env.elasticbeanstalk.com');
      socket.emit("start tweets", { keyword: "Clinton" });
    }

    else if (y[x].text == 'Trump') {
      //alert("Trump selected!");

      while(liveTweets.getLength() > 0) liveTweets.pop(); 
      //var socket = io.connect('http://localhost:8081');
      var socket = io.connect('http://twittermapjc4267-env.elasticbeanstalk.com');
      socket.emit("start tweets", { keyword: "Trump" });
    }

    else if (y[x].text == 'Sanders') {
      //alert("Trump selected!");

      while(liveTweets.getLength() > 0) liveTweets.pop(); 
      //var socket = io.connect('http://localhost:8081');
      var socket = io.connect('http://twittermapjc4267-env.elasticbeanstalk.com');
      socket.emit("start tweets", { keyword: "Sanders" });
    }

    else if (y[x].text == 'Carson') {
      //alert("Trump selected!");

      while(liveTweets.getLength() > 0) liveTweets.pop(); 
      //var socket = io.connect('http://localhost:8081');
      var socket = io.connect('http://twittermapjc4267-env.elasticbeanstalk.com');
      socket.emit("start tweets", { keyword: "Carson" });
    }

    else if (y[x].text == 'Fiorina') {
      //alert("Trump selected!");

      while(liveTweets.getLength() > 0) liveTweets.pop(); 
      //var socket = io.connect('http://localhost:8081');
      var socket = io.connect('http://twittermapjc4267-env.elasticbeanstalk.com');
      socket.emit("start tweets", { keyword: "Fiorina" });
    }

    else if (y[x].text == 'Christie') {
      //alert("Trump selected!");

      while(liveTweets.getLength() > 0) liveTweets.pop(); 
      //var socket = io.connect('http://localhost:8081');
      var socket = io.connect('http://twittermapjc4267-env.elasticbeanstalk.com');
      socket.emit("start tweets", { keyword: "Christie" });
    }

    else if (y[x].text == 'Bush') {
      //alert("Trump selected!");

      while(liveTweets.getLength() > 0) liveTweets.pop(); 
      //var socket = io.connect('http://localhost:8081');
      var socket = io.connect('http://twittermapjc4267-env.elasticbeanstalk.com');
      socket.emit("start tweets", { keyword: "Bush" });
    }
}