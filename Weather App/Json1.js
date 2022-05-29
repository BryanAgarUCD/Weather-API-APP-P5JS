// DUBLIN

function jsonAssign1() {
  // section of code that reassigns each variable to the correct location API, Needed to be reassigned for displaying each measuremnt and also to make the animations be affected by the right location, ie wind speed in new york affecting new york aninmation
  temp = json1.main.temp - 273.15;
  humidity = json1.main.humidity;
  windSpeed = json1.wind.speed;
  windDirection = json1.wind.deg;
  windDirection1 = json1.wind.deg;
  song.stop();
  wind();
  rain = false;
  thunder = false;
  timezone = true;
  // Section of code that makes the images of locations appear, set to true for the image that is needed to be displayed, DUBBG is set to true for Dublin as this is the Dublin, rest of images are set to false
  NYCBG = false;
  DUBBG = true;
  LDNBG = false;
  rainspeed = 1;
  song2.stop();
  song1.stop();
  // Finds clouds amount and assigns it to clouds variable,set to int for full number and divides by 12 to give it a reasonable animation
  CloudsAmount = int(json1.clouds.all / 12);
  //Bubble();
  //idnumber = json.weather[0];
  print(json1.weather[0].main + " in Dublin");
  name = json1.name;
  name1 = json1.name;
  //print(idnumber);
  weathertrigger = json1.weather[0].main;

  // TRIGGER for weather id
  var trigger = json1.weather[0].id;
  print(json1.weather[0].main);
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
  // else if for using weather.main code to trigger aninmations
  else if (weathertrigger == "Clouds") {
    print("Dublin weather is cloudy");
    rain = false;
    // b1 = 50;
    // b2 = 180;
    // b3 = 250;
    thunder = false;
  } else if (weathertrigger == "Snow") {
    print("Snow in Dublin");
    rain = true;
    rainspeed = 0.1;
  } else if (weathertrigger == "Rain") {
    print("Rain in Dublin");
    raintrigger();
    //rain = true;
  } else if (weathertrigger == "Drizzle") {
    print("Drizzling in Dublin");
    raintrigger();
    rainspeed = 0.7}
  else {
    rain = false;
    thunder = false;
  }
}
