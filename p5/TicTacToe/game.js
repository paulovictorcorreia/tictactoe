class Game{
	constructor()
	{
		this.matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
		this.token = 0;
		this.posX = 0;
		this.posY = 0;
	}
	start()
	{
		this.token = 1;
		background(153);
		line(0, 200, width, 200);
		line(0, 400, width, 400);
	  	line(200, 0, 200, height);
	  	line(400, 0, 400, height);
	}
	play(_posX, _posY)//the play it self, it will just fill the draw and change the token
	{
		if(_posX <= 200 && _posY <= 200 ){
			//this.matrix[0][0] = this.token;
			//ellipse(100, 100, 80, 80);
			this.validPlays(0, 0);
		}
		else if(_posX <= 200 && _posY <= 400){
			//this.matrix[1][0] = this.token;
			//ellipse(100, 300, 80, 80);
			this.validPlays(1, 0);
		}
		else if(_posX <= 200 && _posY <= 600){
			//this.matrix[2][0] = this.token;
			//ellipse(100, 500, 80, 80);
			this.validPlays(2, 0);
		}
		//Column 2
		else if(_posX <= 400 && _posY <= 200){
			//ellipse(300, 100, 80, 80);
			//this.matrix[0][1] = this.token;
			this.validPlays(0, 1);
		}
		else if(_posX <= 400 && _posY <= 400){
			//ellipse(300, 300, 80, 80);
			//this.matrix[1][1] = this.token;
			this.validPlays(1, 1);
		}
		else if(_posX <= 400 && _posY <= 600){
			//ellipse(300, 500, 80, 80);
			//this.matrix[2][1] = this.token;
			this.validPlays(2, 1);
		}
		//column 3
		else if(_posX <= 600 && _posY <= 200){
			//ellipse(500, 100, 80, 80);
			//this.matrix[0][2] = this.token;
			this.validPlays(0, 2);
		}
		else if(_posX <= 600 && _posY <= 400){
			//ellipse(500, 300, 80, 80);
			//this.matrix[1][2] = this.token;
			this.validPlays(1, 2);
		}
		else if(_posX <= 600 && _posY <= 600){
			//ellipse(500, 500, 80, 80);	
			//this.matrix[2][2] = this.token;
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
		}
		else{
			console.log("Invalid Play!");
		}
		this.checkVictory();
		this.token = this.token*(-1);

	}
	figure(_i, _j)
	{
		if(this.token == 1)
		{
			fill(0, 0, 255);//Pinta de azul
			console.log("Agora pintou de azul");
			ellipse(_j*200 + 100, _i*200 + 100, 80, 80);
		}
		else{
			fill(255, 0, 0);
			ellipse(_j*200 + 100, _i*200 + 100, 80, 80);
		}
	}
	checkVictory(){//Falta digitar as condições de vitória ainda, só fiz a primeira linha
		if((this.matrix[0][0] + this.matrix[0][1] + this.matrix[0][2]) == 3)
		{
			console.log("Jogador " + this.token + " Venceu!");
		}
	}

	
};