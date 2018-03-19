let game;
function setup() {
  // put setup code here
  createCanvas(600, 600);
  game = new Game();
  game.start()
}

function draw() {
  // put drawing code here
  //ellipse(50, 100, 80, 80);
}

function mouseClicked(){
	console.log("Y: " + mouseY);
	console.log("X: " + mouseX);
	//column 1
	game.play(mouseX, mouseY);
}