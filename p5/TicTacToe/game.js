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
        this.checkGame(this.turn, this.state);
    }
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
    PlayerVSAI()
    {
        if(this.token == 1)
        {
            this.PlayerVSPlayer();
        }
        else
        {
            
            this.minmaxCall();
            this.figure(this.matrix);
            this.token = this.token*(-1);
            this.turn++;
        }
    }
    checkTie(matrix, depth)
    {
        if((this.turn + depth == 9) && (this.checkVictory(matrix, depth)==false) && (this.checkVictory(matrix, 1)==false))
        {
            return true;
        }
        else
        return false;
    }
    minmaxCall()
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
    minmax(copyMatrix, player, depth)
    {
        if((this.checkVictory(copyMatrix,player) == true)||(this.checkTie(copyMatrix, depth) == true)) 
        {
            let chance = this.chanceOfWinning(copyMatrix, player);
            return chance;
        }
        else if(player == -1)
        {
            let tempScore;
            let moveI;
            let moveJ;
            let score = 10;
            // console.log(copyMatrix);
            for(let i = 0; i < 3; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                    if(copyMatrix[i][j] == '0')
                    {
                        copyMatrix[i][j] = player;
                        tempScore = this.minmax(copyMatrix, player*(-1), depth+1);
                        // console.log(tempScore);
                        copyMatrix[i][j] = 0;
                        copyMatrix[i][j] =  0;
                        if(tempScore < score)
                        {
                            score = tempScore;
                            moveI = i;
                            moveJ = j;
                        }
                    }
                
                }       
            }
            // console.log(score);
            this.posX = moveJ;
            this.posY = moveI;
            return score;
        }
        else if(player == 1)
        {
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
        let matrix1, matrix2;
        matrix1 = matrix;
        matrix2 = matrix;
        matrix1  = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
        matrix2  = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                if(matrix[i][j] == '0')
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
        // console.log(matrix1[0][0] + " " +matrix1[0][1] + " " +matrix1[0][2]);
        // console.log(matrix1[1][0] + " " +matrix1[1][1] + " " +matrix1[1][2]);
        // console.log(matrix1[2][0] + " " +matrix1[2][1] + " " +matrix1[2][2]);
        // console.log("\n");
        // console.log(matrix2[0][0] + " " +matrix2[0][1] + " " +matrix2[0][2]);
        // console.log(matrix2[1][0] + " " +matrix2[1][1] + " " +matrix2[1][2]);
        // console.log(matrix2[2][0] + " " +matrix2[2][1] + " " +matrix2[2][2]);
        
        let vector = [];
        let chance1 = 0;
        let chance2 = 0;
        // let copyMatrix = matrix;

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
        // 
        // 
        // console.log(chance1);
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
        // console.log(chance2);
        // console.log(chance1 - chance2);
        return chance1 - chance2;

    }
    chanceOfWinningLine(vector, player)
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
    maxBy(list)//ver depois como fazer essa função retornar o objeto com maior valor de M
    {
        let maxVal = list[0].cost;
        let maxElement = list[0];s
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