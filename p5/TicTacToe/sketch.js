let game;
let restart;//button for restart the game while playing it;
let beginPVP;//button to begin the pvp mode
let menuButton;//button from game to main menu
let menu = true;
let pvp = false;
function setup() {
  // put setup code here
	game = new Game();
	menuConfig();
	restart = createButton("Restart");
	restart.position(675, 400);
	restart.mousePressed(rebegin);
	restart.hide();
	menuButton = createButton("Menu");
	menuButton.position(675, 450);
	menuButton.mousePressed(menuConfig);
	menuButton.hide();

	beginPVP = createButton("PVP");
	beginPVP.position(400, 300);
	beginPVP.mouseReleased(begin);
	//game.start();
}

function draw() {
  // put drawing code here
  //ellipse(50, 100, 80, 80);
 	if(menu == true)
	{
		beginPVP.show();
		restart.hide();
		menuButton.hide();
		menuConfig();
	}
	else if(pvp == true)
	{
	    beginPVP.hide();
	    restart.show();
	    menuButton.show();    
	}
}
//Falta colocar uma variavel de estado pra quando o menu trocar pro jogo não jogar automaticamente assim que entra no jogo
function mousePressed(){
	console.log("Y: " + mouseY);
	console.log("X: " + mouseX);
	if(pvp == true)
	{
		game.play(1);
	}
	
	//column 1
	//game.play();
}

function mouseReleased()
{
	
}

function rebegin(){
	game.start();
}

function begin()
{
	game.start();
	pvp = true;
	menu = false;
}

function menuConfig()
{
	clear();
	createCanvas(800, 601);
  	background(240,230,140);
	pvp = false;	
	menu = true;
}
