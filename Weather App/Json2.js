// LONDON

function jsonAssign2() {
  // section of code that reassigns each variable to the correct location API, Needed to be reassigned for displaying each measuremnt and also to make the animations be affected by the right location, ie wind speed in new york affecting new york aninmation
  temp = json2.main.temp - 273.15;
  humidity = json2.main.humidity;
  windSpeed = json2.wind.speed;
  windDirection = json2.wind.deg;
  windDirection1 = json2.wind.deg;
  rain = false;
  thunder = false;
  timezone = true;
  // Section of code that makes the images of locations appear, set to true for the image that is needed to be displayed, LDNCBG is set to true for London, rest of images are set to false
  NYCBG = false;
  LDNBG = true;
  DUBBG = false;
  song.stop();
  song1.stop();
  song2.stop();

  wind();
  CloudsAmount = int(json2.clouds.all / 12);
  //idnumber = json.weather[0];
  name = json2.name;

  // finds weather in location from JSON weather.main and .ID tables
  weathertrigger = json2.weather[0].main;

  var trigger = json2.weather[0].id;
  print(json2.weather[0].main);
  print(trigger);
  // Logic code for triggering weather animation based off weather.id in JSON code, used for thunderstorms code, 3 id codes used
  if (trigger == 200) {
    thunder = true;
    raintrigger();
    song2.play();
    rainspeed = 2;
    weathertrigger = "Stormy";
  } else if (trigger == (201 || 202 || 210 || 211 || 212 )) {
    thunder = true;
    raintrigger();
    song2.play();
    rainspeed = 5;
    weathertrigger = "Stormy";
  } 
  else if (weathertrigger == "Thunderstorm"){
    thunder = true;
    raintrigger();
    song2.play();
    rainspeed = 5;
    
  }
  
  else if (weathertrigger == "Clouds") {
    print("Cloudy in London");

    rain = false;
    // b1 = 50;
    // b2 = 180;
    // b3 = 250;
    song1.stop();
  } else if (weathertrigger == "Rain") {
    print("Rain in London");
    raintrigger();
  } 
  else if (weathertrigger == "Drizzle") {
    print("Drizzling in London");
    raintrigger();
    rainspeed = 0.7}
  
  else if (weathertrigger == "Snow") {
    print("Snow in London");
    rain = true;
    rainspeed = 0.1;
  } else {
    rain = false;
    // b1 = 50;
    // b2 = 180;
    // b3 = 250;
    song1.stop();
  }
  //print(idnumber);
  //jsonAssign2 == jsonselect;
}
