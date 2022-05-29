function edt(){
if (nyc > 9 && (nyc < 17)) {
      b1 = 50;
      b2 = 180;
      b3 = 250;
      star = false;
    } else if (nyc < 9 && nyc > 5) {
      b1 = 255;
      b2 = 202;
      b3 = 124;
      star = false;

    } else if (nyc > 17 && nyc < 22) {
      b1 = 253;
      b2 = 94;
      b3 = 83;
      star = false;

    } else {
      star = true;
      b1 = 8;
      b2 = 24;
      b3 = 58;

    }
}