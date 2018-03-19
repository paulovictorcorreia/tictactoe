function setup() {
  // put setup code here
  createCanvas(600, 600);
  background(153);
  line(0, 200, width, 200);
  line(0, 400, width, 400);
  line(200, 0, 200, height);
  line(400, 0, 400, height);
}

function draw() {
  // put drawing code here
  //ellipse(50, 100, 80, 80);
}

function mouseClicked(){
	console.log("Y: " + mouseY);
	console.log("X: " + mouseX);
	//column 1
	if(mouseX <= 200 && mouseY <= 200 ){
		ellipse(100, 100, 80, 80);
	}
	else if(mouseX <= 200 && mouseY <= 400){
		ellipse(100, 300, 80, 80);
	}
	else if(mouseX <= 200 && mouseY <= 600){
		ellipse(100, 500, 80, 80);
	}
	//Column 2
	else if(mouseX <= 400 && mouseY <= 200){
		ellipse(300, 100, 80, 80);
	}
	else if(mouseX <= 400 && mouseY <= 400){
		ellipse(300, 300, 80, 80);
	}
	else if(mouseX <= 400 && mouseY <= 600){
		ellipse(300, 500, 80, 80);
	}
	//column 3
	else if(mouseX <= 600 && mouseY <= 200){
		ellipse(500, 100, 80, 80);
	}
	else if(mouseX <= 600 && mouseY <= 400){
		ellipse(500, 300, 80, 80);
	}
	else{
		ellipse(500, 500, 80, 80);	
	}
}