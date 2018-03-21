let game;
let restart;
function setup() {
  // put setup code here
  	createCanvas(800, 601);
  	background(240,230,140);
  	console.log(width);
	game = new Game();
    restart = createButton("Restart");
    restart.position(675, 400);
    restart.mousePressed(rebegin);
	game.start();
}

function draw() {
  // put drawing code here
  //ellipse(50, 100, 80, 80);
}

function mouseClicked(){
	console.log("Y: " + mouseY);
	console.log("X: " + mouseX);
	//column 1
	game.play();
}

function rebegin(){
	game.start();
}