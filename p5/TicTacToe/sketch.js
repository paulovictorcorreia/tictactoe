let game;
let restart;//button for restart the game while playing it;
let beginPVP;//button to begin the pvp mode
let beginPvAI;
let beginAIvP;
let beginPvAI_Easy;
let beginAIvP_Easy;

let menuButton;//button from game to main menu
let easy;
let hard;
let difficulty;
let menu = true;//Menu scene
let menuDifficult = false;//Difficult selection menu
let pvp = false;//Pvp Scene game
let AIvP = false;//AIvP scene game
let PvAI = false;//PvAI game scene
let AIvP_Easy = false;
let PvAI_Easy = false;
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

	easy = createButton("Easy");
	easy.position(400, 300);
	easy.mousePressed(menuConfig);
	easy.hide();

	hard = createButton("Hard");
	hard.position(400, 450);
	hard.mousePressed(menuConfig);
	hard.hide();

	beginPVP = createButton("PVP");
	beginPVP.position(400, 300);
	beginPVP.mouseReleased(begin1);

	beginPvAI = createButton("PvAI Hard");
	beginPvAI.position(400, 400);
	beginPvAI.mouseReleased(begin2);

	beginPvAI_Easy = createButton("PvAI Easy");
	beginPvAI_Easy.position(600, 400);
	beginPvAI_Easy.mouseReleased(begin22);

	beginAIvP = createButton("AIvP Hard");
	beginAIvP.position(400, 500);
	beginAIvP.mouseReleased(begin3);

	beginAIvP_Easy = createButton("AIvP Easy");
	beginAIvP_Easy.position(600, 500);
	beginAIvP_Easy.mouseReleased(begin33);



	//game.start();
}

function draw() {
  // put drawing code here
  //ellipse(50, 100, 80, 80);
 	if(menu == true)
	{
		beginPVP.show();
		beginAIvP.show();
		beginAIvP_Easy.show();
		beginPvAI.show();
		beginPvAI_Easy.show();
		restart.hide();
		menuButton.hide();
		menuConfig();
	}
	else if(pvp == true || AIvP === true || PvAI === true || AIvP_Easy === true || PvAI_Easy === true)
	{
	    beginPVP.hide();
	    beginAIvP.hide();
	    beginAIvP_Easy.hide();
		beginPvAI.hide();
		beginPvAI_Easy.hide();
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
		game.play(0);
	}
	else if (PvAI ===  true) 
	{
		game.play(1);
	}
	else if (AIvP ===  true) 
	{
		game.play(2);
	}
	else if (AIvP_Easy === true)
	{
		game.play(3)
	}
	else if (PvAI_Easy === true)
	{
		game.play(4);
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

function begin1()
{
	game.start();
	pvp = true;
	PvAI = false;
	PvAI_Easy = false;
	AIvP = false;
	AIvP_Easy = false;
	menu = false;

}

function begin2()
{
	game.start();
	pvp = false;
	PvAI = true;
	PvAI_Easy = false;
	AIvP = false;
	AIvP_Easy = false;
	menu = false;
}
function begin22()
{
	game.start();
	pvp = false;
	PvAI = false;
	PvAI_Easy = true;
	AIvP = false;
	AIvP_Easy = false;
	menu = false;
}


function begin3()
{
	game.start();
	pvp = false;
	PvAI = false;
	PvAI_Easy = false;
	AIvP = true;
	AIvP_Easy = false;
	menu = false;
}
function begin33()
{
	game.start();
	pvp = false;
	PvAI = false;
	PvAI_Easy = false;
	AIvP = false;
	AIvP_Easy = true;
	menu = false;
}
function menuConfig()
{
	clear();
	createCanvas(800, 601);
  	background(240,230,140);
	pvp = false;
	AIvP = false;
	PvAI = false;	
	menu = true;
}
