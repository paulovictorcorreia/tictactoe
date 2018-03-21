class Game{
	constructor()
	{
		this.matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];//Game table in which we store position
		this.token = 0;//Players turn(1 and -1)
		this.state = false;//State of the game: if it ended or not(true if the game has ended)
		this.gameType = 0;//If the game is PvP or PvE
		this.turn = 0;//Variable for the turn of the game(MAX value is 9)
	}
	start()//Game starting condition
	{
		this.token = 1;
		this.matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
		this.state = false;
		this.turn = 0;
		//background(200);
		clear();
		background(240,230,140);
		fill(240,230,140);
		rect(0, 0, 600, 600);
		line(0, 200, 600, 200);
		line(0, 400, 600, 400);
	  	line(200, 0, 200, 600);
	  	line(400, 0, 400, 600);
	}
	play()//depending on the gametype, it will wait for the other player movement or the AI to play
	{
		if(mouseX <= 200 && mouseY <= 200 )
		{
			this.validPlays(0, 0);
		}
		else if(mouseX <= 200 && mouseY <= 400)
		{
			this.validPlays(1, 0);
		}
		else if(mouseX <= 200 && mouseY <= 600)
		{
			this.validPlays(2, 0);
		}
		//Column 2
		else if(mouseX <= 400 && mouseY <= 200)
		{
			this.validPlays(0, 1);
		}
		else if(mouseX <= 400 && mouseY <= 400)
		{
			this.validPlays(1, 1);
		}
		else if(mouseX <= 400 && mouseY <= 600)
		{
			this.validPlays(2, 1);
		}
		//column 3
		else if(mouseX <= 600 && mouseY <= 200)
		{
			this.validPlays(0, 2);
		}
		else if(mouseX <= 600 && mouseY <= 400)
		{
			this.validPlays(1, 2);
		}
		else if(mouseX <= 600 && mouseY <= 600)
		{
			this.validPlays(2, 2);
		}
		console.log(this.matrix[0][0] + " " + this.matrix[0][1] + " " + this.matrix[0][2]);
		console.log(this.matrix[1][0] + " " + this.matrix[1][1] + " " + this.matrix[1][2]);
		console.log(this.matrix[2][0] + " " + this.matrix[2][1] + " " + this.matrix[2][2]);
	}

	validPlays(_i, _j)
	{
		if(this.matrix[_i][_j] == 0 ){
			this.matrix[_i][_j] = this.token;
			this.figure(_i, _j);
			this.state = this.checkVictory();
			this.turn++;
		}
		else{
			console.log("Invalid Play!");
		}
		this.checkGame();
	}
	figure(_i, _j)
	{
		if(this.token == 1)
		{
			fill(0, 0,255);//Pinta de azul
			ellipse(_j*200 + 100, _i*200 + 100, 80, 80);
		}
		else
		{
			fill(255, 0, 0);
			ellipse(_j*200 + 100, _i*200 + 100, 80, 80);
		}
	}
	checkVictory()
	{//Falta digitar as condições de vitória ainda, só fiz a primeira linha
		if((this.matrix[0][0] + this.matrix[0][1] + this.matrix[0][2]) == (this.token*3))
		{
			console.log("Jogador " + this.token + " Venceu!");
			fill(0, 30, 40);
			text("Jogador " + this.token + " Venceu!",675, 300);
			return true;
		}
		else if((this.matrix[0][0] + this.matrix[1][0] + this.matrix[2][0]) == (this.token*3))
		{
			console.log("Jogador " + this.token + " Venceu!");
			fill(0, 30, 40);
			text("Jogador " + this.token + " Venceu!",675, 300);
			return true;
		}
		else if((this.matrix[0][0] + this.matrix[1][1] + this.matrix[2][2]) == (this.token*3))
		{
			console.log("Jogador " + this.token + " Venceu!");
			fill(0, 30, 40);
			text("Jogador " + this.token + " Venceu!",675, 300);
			return true;
		}
		else if((this.matrix[2][0] + this.matrix[1][1] + this.matrix[0][2]) == (this.token*3))
		{
			console.log("Jogador " + this.token + " Venceu!");
			fill(0, 30, 40);
			text("Jogador " + this.token + " Venceu!",675, 300);
			return true;
		}
		else if((this.matrix[2][0] + this.matrix[2][1] + this.matrix[2][2]) == (this.token*3))
		{
			console.log("Jogador " + this.token + " Venceu!");
			fill(0, 30, 40);
			text("Jogador " + this.token + " Venceu!",675, 300);
			return true;
		}
		else if((this.matrix[0][2] + this.matrix[1][2] + this.matrix[2][2]) == (this.token*3))
		{
			console.log("Jogador " + this.token + " Venceu!");
			fill(0, 30, 40);
			text("Jogador " + this.token + " Venceu!",675, 300);
			return true;
		}
		else if((this.matrix[1][0] + this.matrix[1][1] + this.matrix[1][2]) == (this.token*3))
		{
			console.log("Jogador " + this.token + " Venceu!");
			fill(0, 30, 40);
			text("Jogador " + this.token + " Venceu!",675, 300);
			return true;
		}
		else if((this.matrix[0][1] + this.matrix[1][1] + this.matrix[2][1]) == (this.token*3))
		{
			console.log("Jogador " + this.token + " Venceu!");
			fill(0, 30, 40);
			text("Jogador " + this.token + " Venceu!",675, 300);
			return true;
		}
		this.token = this.token*(-1);
		return false;
	}
	checkGame()
	{
		if((this.turn == 9) && (this.state == false))
		{
			fill(0, 30, 40);
			text("Tie!",675, 300);
		}
	}
	
	
};