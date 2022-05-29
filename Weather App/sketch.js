// Variables used within script

var json;
var stars = [];
var star = false; // set to false to stop stars starting stright away
var rain = false; // set to false to stop rain starting stright away
var timezone = true; // set to true as first time zone is New york
var NYCBG = true; // New york BG, set to true as first json is New york
var LDNBG = false; // variable for London BG
var DUBBG = false; // variable for Dublin BG
var temp; // Temperature variable
var name; // name variable for cities
var windSpeed; // wind speed variable
var windDirection; // wind direction variable
var humidity; // humidity variable
var RainAmount; // rain amount variable
var currentTime = 0; // current time variable
var time; // time variable
var timer = 5000; // timer variable used in recalling JSON data
var rainspeed = 1; // variable for rain speed
var bubbles = []; // variables used for clouds
// Used in rain animation
let yoff = 0;
var drop = []; // empty array for rain function

// variables for Background, B1,B2,B3 are RGB Values
var b1 = 50;
var b2 = 180;
var b3 = 250;
// Used in rain function to affect speed
var acceleration = 0.0098;
var nDrops = 1000; // amount of drops
var drops = [];
var currenttime; // time variable used in time zone feature

// variables for image loading
let img;
let img2;
let nycimg;
let ldnimg;
let dublinimg;
// Thunder variables
var xCoord1 = 0;
var yCoord1 = 0;
var xCoord2 = 0;
var yCoord2 = 0;

// API key setup
var apiKey = "f3d3283a9dd52e2fecc3e501adc54c5e";
// Variables for mutiple cities
var city = "5128581"; // New york
var city1 = "2964574"; // dublin
var city2 = "2643743"; // london
// URL variable calling JSON data
var url = "https://api.openweathermap.org/data/2.5/weather?id=";
// Thunder variable, set to false so it doesn't start stright away
var thunder = false;
var totalTime;
var totalSec;
var timeReset = 240;
// Preload section
function preload() {
  // calling JSON data from Openweather, concatenates URL, city, test and API to call data from the created string
  json = loadJSON(url + city + "&appid=" + apiKey);
  json1 = loadJSON(url + city1 + "&appid=" + apiKey);
  json2 = loadJSON(url + city2 + "&appid=" + apiKey);
  // Song loading
  song = loadSound("wind.mp3");
  song1 = loadSound("rain.mp3");
  song2 = loadSound("thunder.mp3");
  print(json);
}

// Setup setions of code

function setup() {
  // creates canvas based off X,Y, iphone dimensions
  createCanvas(350, 500);
  textSize(25);
  //angleMode(DEGREES);
  xCoord2 = 0;
  yCoord2 = height / 2;
  // Triggers json1 function
  jsonAssign1();
  //Timeofday()
  // sets clouds amount to 10
  CloudsAmount = 10;
  //print(name);
  // for loop that creates clouds, triggers bubble()
  for (var i = 0; i < CloudsAmount; i++) {
    bubbles[i] = new Bubble();
  }
  // loads images into sketch
  nycimg = loadImage("nyc.png");
  ldnimg = loadImage("ldn1.png");
  dublinimg = loadImage("dublin.png");
  img = loadImage("phone.png");

  // WEATHER CODES TO TRIGGER TO RAIN + SNOW
  //weathertrigger = json1.weather[0].id;

  // for loop for stars, sets stars amount to 1000
  for (var i2 = 0; i2 < 1000; i2++) {
    stars[i2] = new Star();
  }
  // for loop for rain drops amounts
  for (i = 0; i < nDrops; i++) {
    drops.push(new Drop());
  }
  // Buttons on canvas, each button triggers different function which is each city
  textFont("Open Sans");
  textAlign(CENTER);
  button = createButton("New York");
  button.mouseClicked(jsonAssign);
  button.size(80, 60);
  button.position(240, 60);
  button.style("font-family", "Open Sans");
  button.style("font-size", "18px");

  button = createButton("Dublin");
  button.mouseClicked(jsonAssign1);
  button.size(80, 60);
  button.position(25, 60);
  button.style("font-family", "Open Sans");
  button.style("font-size", "18px");

  button = createButton("London");
  button.mouseClicked(jsonAssign2);
  button.size(80, 60);
  button.position(135, 60);
  button.style("font-family", "Open Sans");
  button.style("font-size", "18px");
}
// draw loop section
function draw() {
  // Sets background based off B1,B2,B3, in draw loop so it can be updated by functions
  background(b1, b2, b3, 100);

  textFont("Open Sans");
  textAlign(CENTER);
  //print(city)

  // Gets current time of computer being used.
  var Currenttime = hour();
  // assigns nyc variable to current time -5 as NYC is 5 hours behind Ireland, change here to check out morning,evening and night modes
  var nyc = Currenttime - 5;
  print(Currenttime);
  print(nyc);

  // Boolean logic for trigger rain function
  // Workaround for loop issue
  if (rain == true) {
    drops.forEach(function (d) {
      d.drawAndDrop();
    });
  }
  // Boolean logic for trigger stars function
  if (star == true) {
    for (var i2 = 0; i2 < stars.length; i2++) {
      stars[i2].draw();
      //print('stars')
    }
  }
  // Boolean logic for thunder rain function
  // Thunder
  if (thunder == true) {

    // for loop for thunder
    for (var i = 0; i < 20; i++) {
      xCoord1 = xCoord2;
      yCoord1 = yCoord2;
      // assigns random X Y coordinates, from -20 to +20
      xCoord2 = xCoord1 + int(random(-20, 20));
      yCoord2 = yCoord1 + int(random(-10, 20));
      // gives random stroke weight for 1 -3
      strokeWeight(random(1, 3));
      // gives the edges of bolts a stright ending rather then a round one
      strokeJoin(MITER);
      // Creates lines based off XY coordinates
      line(xCoord1, yCoord1, xCoord2, yCoord2);
      // if statement to make sure its within the weight and height and also X and Y coordinates are less then 0
      if (
        (xCoord2 > width) |
        (xCoord2 < 0) |
        (yCoord2 > height) |
        (yCoord2 < 0)
      ) {
        // clears screen
        clear();
        //drawBackground();
        // gives X and Y coordinates random values
        xCoord2 = int(random(0, width));
        yCoord2 = 0;
        stroke(255, 255, random(0, 255));
      }
    }
  }
  // TIMEZONE
  // Time zone code, logic flow chart can be seen in report

  // if statement to see if time zone is set to true and thunder is not set to true which would override background
  if (timezone == true && rain == false && thunder == false) {
    // if greater or equal then 9 and less the 5pm set to these values
    if (Currenttime >= 9 && Currenttime < 17) {
      b1 = 50;
      b2 = 180;
      b3 = 250;
      star = false;
      // else if less then 9 am and greater then 5 AM
    } else if (Currenttime < 9 && Currenttime > 5) {
      b1 = 255;
      b2 = 202;
      b3 = 124;
      star = false;
      // else if greater or equals to 5pm and less then 10pm
    } else if (Currenttime >= 17 && Currenttime < 22) {
      b1 = 253;
      b2 = 94;
      b3 = 83;
      star = false;
      // else trigger stars and set background to night values
    } else {
      star = true;
      b1 = 8;
      b2 = 24;
      b3 = 58;
    }
  }
// NYC TIME ZONE CODE
  
  // if statement to see if time zone is set to false which means it's NYC time and thunder is not set to true which would override background
  if (timezone == false && rain == false && thunder == false) {
    // if greater or equal then 9 and less the 5pm set to these values
    if (nyc >= 9 && nyc < 17) {
      b1 = 50;
      b2 = 180;
      b3 = 250;
      star = false;
      // else if less then 9 am and greater then 5 AM
    } else if (nyc < 9 && nyc > 5) {
      b1 = 255;
      b2 = 202;
      b3 = 124;
      star = false;
      // else if greater or equals to 5pm and less then 10pm
    } else if (nyc >= 17 && nyc < 22) {
      b1 = 253;
      b2 = 94;
      b3 = 83;
      star = false;
      // else trigger stars and set background to night values
    } else {
      star = true;
      b1 = 8;
      b2 = 24;
      b3 = 58;
    }
  }
// BACKGROUND BOOLEAN CODE
  
  
  // boolean logic for trigger images
  //NYC Background
  if (NYCBG == true) {
    // Sets image to x and Y of 0,0 and width and height
    image(nycimg, 0, 0, width, height);
  }
  // London Background
  if (LDNBG == true) {
    // Sets image to x and Y of 0,0 and width and height
    image(ldnimg, 0, 0, width, height);
  }
  if (DUBBG == true) {
    // Sets image to x and Y of -10,250 and width of 400 and height of 220
    image(dublinimg, -10, 250, 400, 220);
  }

// TEXT ON SCREEN CODE
  push(); // Push as don't want other variables affecting
  stroke(0.5);
  fill(255); // white color
  textFont("Open Sans"); // font from google fonts
  text("City: " + name, width / 2, height / 2 - 80); // city text with name of city, changes in each function

  push(); // reset
  textSize(50); // text 50 pixels
  text(int(temp) + "°", width / 2, 245); // temperature display, changed to int to have whole number, symbol added on to the end
  pop(); // start of new pop()
  push(); // new push
  textSize(15); // text set to 15 pixels
  text(weathertrigger, width / 2, height / 2 - 55); // weather trigger which display the current weather in words ie cloudy 
  text("Humidity: " + humidity, width / 2, height / 2 + 20); // humidity
  text("Wind Speed: " + windSpeed, width / 2, height / 2 + 40); // wind speed
  text("Wind Direction: " + windDirection1, width / 2, height / 2 + 60);// wind direction 
  pop();
  pop();
  push();
  noStroke();

  fill(0, 0, 0, 20);
  //rect(0,200,500,120)

  pop();
  // for loop for creating clouds
  for (var y1 = 0; y1 < bubbles.length; y1++) {
    bubbles[y1].move();
    bubbles[y1].display();
  }

  // If statement for triggering JSON loads after 1 min
  totalSec = int(millis() / 1000);
  totalTime = totalSec % timeReset;

  if (totalTime == timeReset - 1) {
    //jsonRefresh();
    print("test");
    json = loadJSON(url + city + "&appid=" + apiKey);
    json1 = loadJSON(url + city1 + "&appid=" + apiKey);
    json2 = loadJSON(url + city2 + "&appid=" + apiKey);
  }
  //   if (millis() - currentTime > timer) {
  //     json = loadJSON(url + city + "&appid=" + apiKey);
  //     json1 = loadJSON(url + city1 + "&appid=" + apiKey);
  //     json2 = loadJSON(url + city2 + "&appid=" + apiKey);
  //     currentTime = timer + millis();

  //   }
  // rectangles on top and bottom of screen to cut off corners
  rect(0, 0, 500, 55);
  rect(0, 450, 500, 60);
  // iphone png image, set to fit screen
  image(img, -1, 0, 355, 501);
  //image(img2, -1, 0,355,501);
}
// CLOUDS FUNCTION

function Bubble() {
  // gives random height
  this.x = random(0, width);
  this.y = random(0, height);
  // display function of clouds
  this.display = function () {
    // sets stroke to 255 = white
    stroke(255);
    strokeWeight(1);
    // sets fill to white and opacity to 200 to give see through effect
    fill(255, 255, 255, 200);
    // creates the 6 circles
    ellipse(this.x, this.y, 24, 24);
    ellipse(this.x + 10, this.y + 10, 24, 24);
    ellipse(this.x + 30, this.y + 10, 24, 24);
    ellipse(this.x + 30, this.y - 10, 24, 24);
    ellipse(this.x + 20, this.y - 10, 24, 24);
    ellipse(this.x + 40, this.y, 24, 24);
  };
  // Sets the cloud in motion, depending on wind speed variable from JSON data
  this.move = function () {
    this.x = this.x += windSpeed / 3;
    this.y = this.y + random(-1, 1);
    // resets the cloud postion to 0 if it passes out the right side of the frame
    if (this.x >= width) {
      this.x = 0;
    }
  };
}
// AUDIO FOR WIND
function wind() {
  // plays wind sound
  song.play();
  // if wind speed is more then 4 and less then 7, song amplitude is .5
  if (windSpeed > 3 && windSpeed < 7) {
    song.amp(0.5);
  }
  // if song wind speed is greater then 7, amplitude is 1
  if (windSpeed > 7) {
    song.amp(1);
    // else if wind speed is less then 4, stop song
  } else if (windSpeed < 4) {
    song.stop();
  }
}

// RAIN FUNCTION
function Drop() {
  //stroke(0);
  this.initX = function () {
    // GIVES X a random value mutiple by the width
    this.x = random() * width;
  };
  // gives Y a random value
  this.initY = function () {
    this.y = (-random() * height) / 3; // Initialise rain somewhat off the screen
  };
  //stroke(0);
  this.initX();
  this.y = random() * height;
  // length and speed of rain is random
  this.length = random() * 10;
  this.speed = random();

  this.drawAndDrop = function () {
    this.draw();
    this.drop();
  };
  // drawing section of the rain, based of this.y, this x and this.length
  this.draw = function () {
    line(this.x, this.y, this.x, this.y + this.length);
    stroke(255);
    strokeWeight(1);
  };

  this.drop = function () {
    if (this.y < height) {
      // affects speed of rain
      // modified script to be affect variable rain speed, thunderstorms increase this variable to between 2-5
      this.y += this.speed * 5 * rainspeed;
      this.speed += acceleration;
    } else {
      this.speed = random();
      this.initY();
      this.initX();
    }
  };
}

// RAIN TRIGGER
function raintrigger() {
  print("Rain");
  // sets rain to true
  rain = true;
  // starts rain audio
  song1.play();
  //print(city)
  // sets BG to grey color
  b1 = 125;
  b2 = 125;
  b3 = 125;
}

// references

// Clouds shapes reference - https://www.youtube.com/watch?v=76fiD5DvzeQ&ab_channel=TheCodingTrain
// https://editor.p5js.org/412065342/sketches/r1zDoHS3W, clouds inspo

// Thunder - https://thecodingtrain.com/CodingChallenges/051.1-astar.html

// Open weather ID Codes - https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

// Open weather API DOC - https://openweathermap.org/current
// https://openweathermap.org/current#current_JSON
// current time - https://p5js.org/reference/#/p5/hour
//
// Design inspo - https://support.apple.com/en-us/HT207492
// Rain code, Daniel shiftman - https://dev.tube/video/KkyIDI6rQJI
// Stars inspo and elements of code - https://editor.p5js.org/elinsterz/sketches/9KRmzsFDM
// Boolean concept - https://www.youtube.com/watch?v=lWt5GYvnQtE&ab_channel=xinxin
