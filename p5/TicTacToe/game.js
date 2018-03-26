class Game{
	constructor()
	{
		this.matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];//Game table in which we store position
		this.token = 0;//Players turn(1 and -1)
		this.state = 0;//State of the game: if it ended or not(true if the game has ended)
		this.gameType = 0;//If the game is PvP or PvE or EvP
		this.turn = 0;//Variable for the turn of the game(MAX value is 9)
		this.victoryToken = 0;
		this.numNodes = 0;
		this.posX = 0;
		this.posY = 0;
	}
	start()//Game starting condition
	{
		this.token = 1;
		this.matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
		this.state = false;
		this.turn = 0;
		this.victoryToken = 0;
		this.numNodes = 0;
		clear();
		background(240,230,140);
		fill(240,230,140);
		rect(0, 0, 600, 600);
		line(0, 200, 600, 200);
		line(0, 400, 600, 400);
		line(200, 0, 200, 600);
		line(400, 0, 400, 600);
	}
	play(gamemode)//depending on the gametype, it will wait for the other player movement or the AI to play
	{
		if(gamemode == 0)
		{
			this.PlayerVSPlayer();
		}
		else if(gamemode == 1)
		{
			this.PlayerVSAI();
		}
		// console.log(this.matrix[0][0] + " " + this.matrix[0][1] + " " + this.matrix[0][2]);
		// console.log(this.matrix[1][0] + " " + this.matrix[1][1] + " " + this.matrix[1][2]);
		// console.log(this.matrix[2][0] + " " + this.matrix[2][1] + " " + this.matrix[2][2]);
	}
	
	validPlays(_i, _j)
	{
		if(this.matrix[_i][_j] == 0 )
		{
			this.matrix[_i][_j] = this.token;
			this.figure(this.matrix);
			this.state = this.checkVictory(this.matrix, this.token);
			this.token = this.token*(-1);
			this.turn++;
		}
		else{
			fill(0, 30, 40);
			text("Invalid Play!",675, 125);
		}
		this.checkGame(this.turn, this.state, this.token);
	}
	figure(matrix)
	{
		// console.log(this.matrix);
		for(let i = 0; i < 3; i++)
		{
			for(let j = 0; j < 3; j++)
			{	
				if(matrix[i][j] == 1)
				{
					fill(0, 0,255);//Pinta de azul
					ellipse(j*200 + 100, i*200 + 100, 80, 80);
				}
				else if(matrix[i][j] == -1)
				{
					fill(255, 0, 0);
					ellipse(j*200 + 100, i*200 + 100, 80, 80);
				}
			}
		}
	}
	checkVictory(matrix, token)
	{//Falta digitar as condições de vitória ainda, só fiz a primeira linha
		if((matrix[0][0] + matrix[0][1] + matrix[0][2]) == (token*3))
		{
			return token;
		}
		else if((matrix[0][0] + matrix[1][0] + matrix[2][0]) == (token*3))
		{
			return token;
		}
		else if((matrix[0][0] + matrix[1][1] + matrix[2][2]) == (token*3))
		{
			return token;
		}
		else if((matrix[2][0] + matrix[1][1] + matrix[0][2]) == (token*3))
		{
			return token;
		}
		else if((matrix[2][0] + matrix[2][1] + matrix[2][2]) == (token*3))
		{
			return token;
		}
		else if((matrix[0][2] + matrix[1][2] + matrix[2][2]) == (token*3))
		{
			return token;
		}
		else if((matrix[1][0] + matrix[1][1] + matrix[1][2]) == (token*3))
		{
			return token;
		}
		else if((matrix[0][1] + matrix[1][1] + matrix[2][1]) == (token*3))
		{
			return token;
		}
		return 0;
	}
	displayVictory(state)
	{
		fill(0, 30, 40);
		text("Jogador " + state + " Venceu!",675, 300);
	}
	checkGame(turn, state)
	{
		if((turn == 9) && (state == 0))
		{
			fill(0, 30, 40);
			text("Tie!",675, 300);
			return 0;
		}
		else if(state != 0)
		{
			this.displayVictory(state);
			return state;
		}
	}
	checkAIGame(depth)
	{
		if((this.turn + depth) > 9)
		{
			return true; // return true if the game has ended
		}
		else 
			return false; // the game has not ended
	}
	PlayerVSPlayer()
	{
			// console.log(this.matrix);
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
	}
	PlayerVSAI()
	{
		if(this.token == 1)
		{
			// console.log(this.matrix);
			this.PlayerVSPlayer();
		}
		else
		{
			// console.log(this.matrix);
			this.minmaxCall();
			// console.log(pos);
			// console.log(this.posY + " " + this.posX);
			this.figure(this.matrix);
			this.token = this.token*(-1);
			this.turn++;
			// this.minmax(this.matrix, this.token, 0);
			// console.log(this.maxBy([new PlayPosition(0, 0, -3), new PlayPosition(0, 0, -5), new PlayPosition(0, 0, -10)]).cost);
		}
	}
	minmaxCall()
	{
		// console.log(this.matrix);
		var copyMatrix = [[0, 0, 0],[0 ,0 ,0], [0, 0, 0]];
		for(let i = 0; i < 3; i++)
			{
				for(let j = 0; j < 3; j++)
				{
					copyMatrix[i][j] = this.matrix[i][j];	
				}	
			}
		this.minmax(copyMatrix, this.token, 0);
		this.matrix[this.posY][this.posX] = this.token;
	}
	minmax(copyMatrix, player, depth)
	{
		if((this.checkVictory(copyMatrix,player) == true) || (depth == 1)) 
		{
			return this.chanceOfWinning(copyMatrix, player);
		}
		else if(player == -1)
		{
			console.log(copyMatrix);
			let tempScore;
			let moveI;
			let moveJ;
			let score = 10;
			for(let i = 0; i < 3; i++)
			{
				for(let j = 0; j < 3; j++)
				{
					if(copyMatrix[i][j] == '0')
					{
						copyMatrix[i][j] = player;
						tempScore = this.minmax(copyMatrix, player*(-1), depth+1);
						copyMatrix[i][j] = 0;
						if(tempScore < score)
						{
							score = tempScore;
							moveI = i;
							moveJ = j;
						}
						copyMatrix[i][j] =  0;
					}
					else continue;
				}		
			}
			this.posX = moveJ;
			this.posY = moveI;
			return score;
		}
		else if(player == '1')
		{
			// console.log(this.matrix)
			let copyMatrix;
			for(let i = 0; i < 3; i++)
			{
				for(let j = 0; j < 3; j++)
				{
					copyMatrix[i][j] = matrix[i][j];	
				}	
			}
			let tempScore;
			let moveI;
			let moveJ;
			let score = -10;
			for(let i = 0; i < 3; i++)
			{
				for(let j = 0; j < 3; j++)
				{
					if(copyMatrix[i][j] == '0')
					{
						copyMatrix[i][j] = player;
						tempScore = this.minmax(copyMatrix, player*(-1), depth+1);
						copyMatrix[i][j] = 0;
						if(tempScore > score)
						{
							score = tempScore;
							moveI = i;
							moveJ = j;
						}
					}
				}		
			}
			this.posX = moveJ;
			this.posY = moveI;		
			return score;
		}
		
	}
	chanceOfWinning(matrix, player)
	{
		for(let i = 0; i < 3; i++)
		{
			for(let j = 0; j < 3; j++)
			{
				if(matrix[i][j] == '0')
				{
					matrix[i][j] = player;
				}
			}		
		}


		// let vector = [];
		let chance = 0;
		// let copyMatrix = matrix;
		// console.log(copyMatrix);

		// vector = [copyMatrix[0][0], copyMatrix[0][1], copyMatrix[0][2]];
		// chance += this.chanceOfWinningLine(vector, player);

		// vector = [copyMatrix[0][0],copyMatrix[1][0], copyMatrix[2][0]];
		// chance += this.chanceOfWinningLine(vector, player);

		// vector = [copyMatrix[0][0], copyMatrix[1][1], copyMatrix[2][2]];
		// chance += this.chanceOfWinningLine(vector, player);
		// // console.log()
		// vector = [copyMatrix[2][0], copyMatrix[1][1], copyMatrix[0][2]];
		// chance += this.chanceOfWinningLine(vector, player);

		// vector = [copyMatrix[2][0], copyMatrix[2][1], copyMatrix[2][2]];
		// chance += this.chanceOfWinningLine(vector, player);

		// vector = [copyMatrix[0][2], copyMatrix[1][2], copyMatrix[2][2]];
		// chance += this.chanceOfWinningLine(vector, player);

		// vector = [copyMatrix[1][0], copyMatrix[1][1], copyMatrix[1][2]];
		// chance += this.chanceOfWinningLine(vector, player);

		// vector = [copyMatrix[0][1], copyMatrix[1][1], copyMatrix[2][1]];
		// chance += this.chanceOfWinningLine(vector, player);

		// // enemy player
		// vector = [copyMatrix[0][0], copyMatrix[0][1], copyMatrix[0][2]];
		// chance += this.chanceOfWinningLine(vector, player*(-1));

		// vector = [copyMatrix[0][0],copyMatrix[1][0], copyMatrix[2][0]];
		// chance += this.chanceOfWinningLine(vector, player*(-1));

		// vector = [copyMatrix[0][0], copyMatrix[1][1], copyMatrix[2][2]];
		// chance += this.chanceOfWinningLine(vector, player*(-1));
		// // console.log()
		// vector = [copyMatrix[2][0], copyMatrix[1][1], copyMatrix[0][2]];
		// chance += this.chanceOfWinningLine(vector, player*(-1));

		// vector = [copyMatrix[2][0], copyMatrix[2][1], copyMatrix[2][2]];
		// chance += this.chanceOfWinningLine(vector, player*(-1));

		// vector = [copyMatrix[0][2], copyMatrix[1][2], copyMatrix[2][2]];
		// chance += this.chanceOfWinningLine(vector, player*(-1));

		// vector = [copyMatrix[1][0], copyMatrix[1][1], copyMatrix[1][2]];
		// chance += this.chanceOfWinningLine(vector, player*(-1));

		// vector = [copyMatrix[0][1], copyMatrix[1][1], copyMatrix[2][1]];
		// chance += this.chanceOfWinningLine(vector, player*(-1));
		// console.log(chance);
		return 0;

	}
	chanceOfWinningLine(vector, player)
	{
		let sumChances = 0;
		for(let i = 0; i < 3; i++)
		{
			sumChances += vector[i];
		}
		if(sumChances == player*(3))
			return player;
		return 0;
	}
	maxBy(list)//ver depois como fazer essa função retornar o objeto com maior valor de M
	{
		let maxVal = list[0].cost;
		let maxElement = list[0];
		for(let i = 1; i < list.length; i++)
		{
			if(list[i].cost > maxVal)
			{
				maxVal = list[i].cost;
				maxElement = list[i];
			}
		}
		return maxElement;
	}
	minBy(list)
	{
		let minVal = list[0].cost;
		let minElement = list[0];
		for(let i = 1; i < list.length; i++)
		{
			if(list[i].cost < minVal)
			{
				minVal = list[i].cost;
				minElement = list[i];
			}
		}
		return minElement;
	}

	
};
class PlayPosition
{
	constructor(_i, _j, _cost)
	{
		this.i = _i;
		this.j = _j;
	}
};