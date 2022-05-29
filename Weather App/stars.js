// STAR code
class Star {
	constructor() {
      // Gives elements of stars a random XY and size
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.25, 3);
    // https://p5js.org/reference/#/p5/TAU
		this.t = random(TAU);
	}
	// drawing of stars
	draw() {
		this.t += 0.1;
		var scale = this.size + sin(this.t) * 2;
		noStroke();
      // makes ellipse based off x,y and scale parameters 
		ellipse(this.x, this.y, scale, scale);
	}
}
