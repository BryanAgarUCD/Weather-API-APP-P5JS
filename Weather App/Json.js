// New York

// JSON function for new york
function jsonAssign() {
  // section of code that reassigns each variable to the correct location API, Needed to be reassigned for displaying each measuremnt and also to make the animations be affected by the right location, ie wind speed in new york affecting new york aninmation
  temp = json.main.temp - 273.15;
  humidity = json.main.humidity;
  windSpeed = json.wind.speed;
  windDirection = json.wind.deg;
  windDirection1 = json.wind.deg;
  // Section of code that makes the images of locations appear, set to true for the image that is needed to be displayed, NYCBG is set to true for new york as this is the new york, rest of images are set to false
  NYCBG = true;
  LDNBG = false;
  DUBBG = false;
  // Finds clouds amount and assigns it to clouds variable,set to int for full number and divides by 12 to give it a reasonable animation
  CloudsAmount = int(json.clouds.all / 12);
  //idnumber = json.weather[0];
  name = json.name;
  // Stops songs to stop mutiple files playing over each other
  song.stop();
  song1.stop();
  song2.stop();
  // triggers wind function
  wind();
  // sets timezone to false as it is based of NYC time
  timezone = false;
  // set to false to stop multiple functions being called
  rain = false;
  thunder = false;
  // set to 1 to reset rain speedcamount
  rainspeed = 1;

  // finds weather in location from JSON weather.main and .ID tables
  weathertrigger = json.weather[0].main;
  var trigger = json.weather[0].id;
  // prints out main weather and also weather ID
  print(json.weather[0].main);
  print(trigger);
  // Logic code for triggering weather animation based off weather.id in JSON code, used for thunderstorms code, 3 id codes used,

  // link to NYC JSON for finding values, set to current ID and main weather to trigger/test - https://api.openweathermap.org/data/2.5/weather?id=5128581&appid=f3d3283a9dd52e2fecc3e501adc54c5e

  if (trigger == 200) {
    thunder = true;
    raintrigger();
    rainspeed = 2;
    song2.play();
    weathertrigger = "Stormy";
  } else if (trigger == (201 || 202 || 210 || 211 || 212 )) {
    thunder = true;
    weathertrigger = "Stormy";
    raintrigger();
    song2.play();
    rainspeed = 5;
    // else if for using weather.main code to trigger aninmations
  }
  else if (weathertrigger == "Thunderstorm"){
    thunder = true;
    raintrigger();
    song2.play();
    rainspeed = 5;
    
  }
  else if (weathertrigger == "Clear") {
    print("New york weather is clear");
    rain = false;
    // b1 = 50;
    // b2 = 180;
    // b3 = 250;
    song1.stop();
    thunder = false;
  } else if (weathertrigger == "Rain") {
    print("Rain in New york");
    raintrigger();
  } else if (weathertrigger == "Snow") {
    print("Snow in New york");
    rain = true;
    rainspeed = 0.1;
  } else if (weathertrigger == "Drizzle") {
    print("Drizzling in London");
    raintrigger();
    rainspeed = 0.7}
  
  else {
    rain = false;
    thunder = false;
  }
  //print(idnumber);
  //jsonAssign2 == jsonselect;
}
