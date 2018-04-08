class Game{
    constructor()
    {
        this.matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];//Game table in which we store position
        this.token = 0;//Players turn(1 and -1)
        this.state = 0;//State of the game: if it ended or not(true if the game has ended)
        this.gameType = 0;//If the game is PvP or PvE or EvP
        this.turn = 0;//Variable for the turn of the game(MAX value is 9)
        this.posX = 0;
        this.posY = 0;
    }
    start()//Game starting condition
    {
        this.token = 1;
        this.matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.state = 0;
        this.turn = 0;
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
        else if(gamemode == 2)
        {
        	this.AIvsPlayer()
        }
        else if(gamemode == 3)
        {
        	this.AIvsPlayer_Easy();
        }
        else if(gamemode == 4)
        {
        	this.PlayerVSAI_Easy();
        }
    }
    /*
	Checa se a posição dada pelo o humano é válida para se jogar, e se for, imprime na tela o novo tabuleiro e atualiza
	as variáveis de estado, turno e token;
		_i: posição vertical no tabuleiro
		_j: posição horizontal no tabuleiro
    */
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
        this.checkGame(this.turn, this.state);
    }
    /*
    Método para imprimir as figuras no tabuleiro
    	matrix: estado do jogo que se deseja imprimir na tela
    */
    figure(matrix)
    {
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
    /*
	Método para checar em todas as combinações possíveis se o jogador ganhou o jogo
		matrix: tabuleiro que se quer verificar se alguém ganhou
		token: jogador que se quer saber se ganhou
    */
    checkVictory(matrix, token)
    {
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
    displayVictory(state)//Mostra na tela o jogador que ganho o jogo
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
    /*
    Método para jogar Player vs Player, o qual verifica onde foi clicado, se a posição é válida e se a jogada é válida.
    */
    PlayerVSPlayer()
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
    }
    PlayerVSAI()//Método para chamar jogar Player vs IA no modo dificil
    {
        if(this.token === 1)
        {
            this.PlayerVSPlayer();
        }
        else
        {
            this.minmaxCall();
            this.printMatrix(this.matrix);
            this.figure(this.matrix);
            this.state = this.checkVictory(this.matrix, this.token);
            if(this.state != 0)
            {
            	this.displayVictory(this.state);
            }
            this.token = this.token*(-1);
            this.turn++;
        }
    }
    PlayerVSAI_Easy()//Método para chamar jogar Player vs IA no modo fácil
    {
    	if(this.token === 1)
        {
            this.PlayerVSPlayer();
        }
        else
        {
            this.minmaxCall_Easy();
            this.printMatrix(this.matrix);
            this.figure(this.matrix);
            this.state = this.checkVictory(this.matrix, this.token);
            if(this.state != 0)
            {
            	this.displayVictory(this.state);
            }
            this.token = this.token*(-1);
            this.turn++;
        }
    }
    AIvsPlayer()//Método para chamar jogar AI vs Player no modo difícil
    {
    	if(this.token === -1)
        {
            this.PlayerVSPlayer();
        }
        else
        {
            this.minmaxCall();
            this.printMatrix(this.matrix);
            this.figure(this.matrix);
            this.state = this.checkVictory(this.matrix, this.token);
            if(this.state != 0)
            {
            	this.displayVictory(this.state);
            }
            this.token = this.token*(-1);
            this.turn++;
        }
    }
    AIvsPlayer_Easy()//Método para chamar jogar AI vs Player no modo fácil
    {
    	if(this.token === -1)
        {
            this.PlayerVSPlayer();
        }
        else
        {
            this.minmaxCall_Easy();
            this.printMatrix(this.matrix);
            this.figure(this.matrix);
            this.state = this.checkVictory(this.matrix, this.token);
            if(this.state != 0)
            {
            	this.displayVictory(this.state);
            }
            this.token = this.token*(-1);
            this.turn++;
        }
    }
    /*
	verifica se há empate no jogo.
		matrix: matrix que se quer verificar o empate
		depth: profundidade da arvore de busca, que foi definida em 1 para o código todo
    */
    checkTie(matrix, depth)
    {
        if((this.checkVictory(matrix, -1)===0) && (this.checkVictory(matrix, 1)===0))
        {
            return true;
        }
        return false;
    }
    minmaxCall()//Função que chama o minmax com as hard rules
    {
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
    minmaxCall_Easy()//Função que chama o minmax sem as hardrules
    {
    	var copyMatrix = [[0, 0, 0],[0 ,0 ,0], [0, 0, 0]];
        for(let i = 0; i < 3; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                    copyMatrix[i][j] = this.matrix[i][j];   
                }   
            }
        this.minmax_Easy(copyMatrix, this.token, 0);
        this.matrix[this.posY][this.posX] = this.token;	
    }
    /*
    minmax:Calcula os custos da jogada posterior da IA e minimiza-os caso não entre em certas regras, caso entre nessas regras, a máquina joga onde foi especificado
    	copyMatrix: uma cópia do tabuleiro na jogada atual do jogo
    	player: token que define quem é o jogador, isto é, se é a IA ou o humano
    	depth: profundidade da árvore de busca
    */
    minmax(copyMatrix, player, depth)
    {
        if(depth===1)
        {
            let chance = this.chanceOfWinning(copyMatrix, player);
            return chance;
        }
        else if(player == 1)
        {
            let tempScore;
            let moveI;
            let moveJ;
            let nextplay;
            let score = 10;
            for(let i = 0; i < 3; i++)
            {
            	for(let j = 0; j < 3; j++)
            	{
            		if(copyMatrix[i][j] === 0)
            		{
            			copyMatrix[i][j] = player;
            			if(this.checkVictory(copyMatrix, player) === player)
            			{
            				this.posX = j;
            				this.posY = i;
            				return score;
            			}
            			copyMatrix[i][j] = 0;
            		}
            	}
            }
            for(let i = 0; i < 3; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                    if(copyMatrix[i][j] === 0)
                    {
                        copyMatrix[i][j] = player;
                        nextplay = this.checkNextPlay(copyMatrix, player*(-1));
                        if(nextplay[0] === true)//Checks if enemy player wins if I play on (i, j)
                        {
                        	this.posY = nextplay[1];
                        	this.posX = nextplay[2];
                        	return score;
                        }

                        tempScore = this.minmax(copyMatrix, player*(-1), depth+1);
                        //Pode checar a vitoria aqui viu paulo do futuro?
                        copyMatrix[i][j] = 0;
                        if(tempScore < score)
                        {
                            score = tempScore;
                            this.posY = i;
                            this.posX = j;
                        }
                    }
                
                }       
            }
            return score;
        }
        else if(player == -1)
        {
            let tempScore;
            let nextplay;
            let moveI;
            let moveJ;
            let score = 10;
            for(let i = 0; i < 3; i++)
            {
            	for(let j = 0; j < 3; j++)
            	{
            		if(copyMatrix[i][j] === 0)
            		{
            			copyMatrix[i][j] = player;
            			if(this.checkVictory(copyMatrix, player) === player)
            			{
            				this.posX = j;
            				this.posY = i;
            				return score;
            			}
            			copyMatrix[i][j] = 0;
            		}
            	}
            }
            for(let i = 0; i < 3; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                    if(copyMatrix[i][j] === 0)
                    {
                        copyMatrix[i][j] = player;
                        nextplay = this.checkNextPlay(copyMatrix, player*(-1));
                        if(nextplay[0] === true)//Checks if enemy player wins if I play on (i, j)
                        {
                        	this.posY = nextplay[1];
                        	this.posX = nextplay[2];
                        	return score;
                        }
                        else if(this.turn == 3 && ((this.matrix[0][0] === player*(-1) && this.matrix[2][2]==player*(-1)) ||(this.matrix[2][0] === player*(-1) && this.matrix[0][2]==player*(-1))))
                        {
                        	this.posX = 1;
                        	this.posY = 0;
                        	return score;
                        }
                        else if(this.turn === 3)
                        {
                        	if(this.matrix[0][1] === -player && (this.matrix[2][0] === -player || this.matrix[2][2] === -player))
                        	{
                        		this.posX = 0;
                        		this.posY = 0;
                        		return score;
                        	}
                        	else if(this.matrix[2][1] === -player && (this.matrix[0][0] === -player || this.matrix[0][2] === -player))
                        	{
                        		this.posX = 2;
                        		this.posY = 2;
                        		return score;
                        	}
                        	else if(this.matrix[1][0] === -player && (this.matrix[0][2] === -player || this.matrix[2][2] === -player))
                        	{
                        		this.posX = 1;
                        		this.posY = 0;
                        		return score;
                        	}
                        	else if(this.matrix[1][2] === -player && (this.matrix[0][0] === -player || this.matrix[2][0] === -player))
                        	{
                        		this.posX = 2;
                        		this.posY = 0;
                        		return score;
                        	}
                        }
                        tempScore = this.minmax(copyMatrix, player*(-1), depth+1);
                        copyMatrix[i][j] = 0;
                        if(tempScore < score)
                        {
                            score = tempScore;
                            this.posY = i;
                            this.posX = j;
                            moveI = i;
                            moveJ = j;
                        }
                    }
                }       
            }
            return score;
        }
        
    }
    minmax_Easy(copyMatrix, player, depth)//Mesma coisa que o minmax, mudando apenas que foram retirados as regras para deixar mais fácil para o jogador humano
    {
    	if(depth===1)
        {
            let chance = this.chanceOfWinning(copyMatrix, player);
            return chance;
        }
        else if(player == 1)
        {
            let tempScore;
            let moveI;
            let moveJ;
            let nextplay;
            let score = 10;
            for(let i = 0; i < 3; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                    if(copyMatrix[i][j] === 0)
                    {
                        copyMatrix[i][j] = player;
                        tempScore = this.minmax(copyMatrix, player*(-1), depth+1);
                        copyMatrix[i][j] = 0;
                        if(tempScore < score)
                        {
                            score = tempScore;
                            this.posY = i;
                            this.posX = j;
                        }
                    }
                
                }       
            }
            return score;
        }
        else if(player == -1)
        {
            let tempScore;
            let nextplay;
            let moveI;
            let moveJ;
            let score = 10;
            for(let i = 0; i < 3; i++)
            {
            	for(let j = 0; j < 3; j++)
            	{
            		if(copyMatrix[i][j] === 0)
            		{
            			copyMatrix[i][j] = player;
            			if(this.checkVictory(copyMatrix, player) === player)
            			{
            				this.posX = j;
            				this.posY = i;
            				return score;
            			}
            			copyMatrix[i][j] = 0;
            		}
            	}
            }
            for(let i = 0; i < 3; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                    if(copyMatrix[i][j] === 0)
                    {
                        copyMatrix[i][j] = player;
                        tempScore = this.minmax(copyMatrix, player*(-1), depth+1);
                        copyMatrix[i][j] = 0;
                        if(tempScore < score)
                        {
                            score = tempScore;
                            this.posY = i;
                            this.posX = j;
                            moveI = i;
                            moveJ = j;
                        }
                    }
                }       
            }
            return score;
        }
    }
    printMatrix(matrix)
    {
    	console.log(matrix[0][0] + " " + matrix[0][1] + " " +matrix[0][2] + " ");
    	console.log(matrix[1][0] + " " + matrix[1][1] + " " +matrix[1][2] + " ");
    	console.log(matrix[2][0] + " " + matrix[2][1] + " " +matrix[2][2] + " ");
    }
    /*
    Quando a IA está testando as possibilidades de jogada, ela verifica se há alguma posição que que o jogador seguinte
    pode fazer que lhe dará a vitória, e caso haja, a posição que a IA vai jogar é justamente essa. Este método é feito
    antes de se chamar o método minmax
    	matrix: tabuleiro do jogo atual
    	player: jogador atual
    */
    checkNextPlay(matrix, player)
    {
    	for(let i = 0; i < 3; i++)
    	{
    		for(let j = 0; j < 3; j++)
    		{
    			
    			if((matrix[i][j] === 1) || (matrix[i][j] === -1)) continue;
    			matrix[i][j] = player;
    			if(this.checkVictory(matrix, player) === player)
    			{
    				matrix[i][j] = 0;
    				return [true, i, j];
    			}
    			matrix[i][j] = 0;
    		}
    	}
    	return [false, 0, 0];
    }
    /*
    Método que calcula a heuristica que vai determinar a pontuação de uma dada jogada a ser minimizada
    ou maximizada no minmax (no caso só irá minimizar pois a profundidade será 1)
    	matrix: tabuleiro do jogo
    	player: jogador que se quer calcular a chance de vitória
    */
    chanceOfWinning(matrix, player)
    {
        let matrix1, matrix2;
        matrix1 = matrix;
        matrix2 = matrix;
        matrix1  = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
        matrix2  = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                if(matrix[i][j] === 0)
                {
                    matrix1[i][j] = player;
                    matrix2[i][j] = player*(-1);
                }
                else
                {
                    matrix1[i][j] = matrix[i][j];
                    matrix2[i][j] = matrix[i][j];
                }
            }       
        }
        let vector = [];
        let chance1 = 0;
        let chance2 = 0;
        vector = [matrix1[0][0], matrix1[0][1], matrix1[0][2]];
        chance1 += this.chanceOfWinningLine(vector, player);

        vector = [matrix1[0][0],matrix1[1][0], matrix1[2][0]];
        chance1 += this.chanceOfWinningLine(vector, player);

        vector = [matrix1[0][0], matrix1[1][1], matrix1[2][2]];
        chance1 += this.chanceOfWinningLine(vector, player);

        vector = [matrix1[2][0], matrix1[1][1], matrix1[0][2]];
        chance1 += this.chanceOfWinningLine(vector, player);

        vector = [matrix1[2][0], matrix1[2][1], matrix1[2][2]];
        chance1 += this.chanceOfWinningLine(vector, player);

        vector = [matrix1[0][2], matrix1[1][2], matrix1[2][2]];
        chance1 += this.chanceOfWinningLine(vector, player);

        vector = [matrix1[1][0], matrix1[1][1], matrix1[1][2]];
        chance1 += this.chanceOfWinningLine(vector, player);

        vector = [matrix1[0][1], matrix1[1][1], matrix1[2][1]];
        chance1 += this.chanceOfWinningLine(vector, player);

        //othe player
        // 

        vector = [matrix2[0][0], matrix2[0][1], matrix2[0][2]];
        chance2 += this.chanceOfWinningLine(vector, player*(-1));

        vector = [matrix2[0][0],matrix2[1][0], matrix2[2][0]];
        chance2 += this.chanceOfWinningLine(vector, player*(-1));

        vector = [matrix2[0][0], matrix2[1][1], matrix2[2][2]];
        chance2 += this.chanceOfWinningLine(vector, player*(-1));

        vector = [matrix2[2][0], matrix2[1][1], matrix2[0][2]];
        chance2 += this.chanceOfWinningLine(vector, player*(-1));

        vector = [matrix2[2][0], matrix2[2][1], matrix2[2][2]];
        chance2 += this.chanceOfWinningLine(vector, player*(-1));

        vector = [matrix2[0][2], matrix2[1][2], matrix2[2][2]];
        chance2 += this.chanceOfWinningLine(vector, player*(-1));

        vector = [matrix2[1][0], matrix2[1][1], matrix2[1][2]];
        chance2 += this.chanceOfWinningLine(vector, player*(-1));

        vector = [matrix2[0][1], matrix2[1][1], matrix2[2][1]];
        chance2 += this.chanceOfWinningLine(vector, player*(-1));
        return chance1 - chance2;

    }
    chanceOfWinningLine(vector, player)//Se há a chance de alinhamento numa dada linha, retorna 1
    {
        let sumChances = 0;
        for(let i = 0; i < 3; i++)
        {
            sumChances += vector[i];
        }
        if(sumChances == player*(3))
            return 1;
        return 0;
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