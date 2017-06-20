let boardSize = 2;
let turns = 0;
let gameEnd = false;
document.body.onload = buildBoard(boardSize);

function checkPals(newBoard, pixel, turn){
	all_pals = [];
	coordinates = [[-1,0],[-1,1],[0,1],[1,0],[1,-1],[0,-1]];
	// coordinates = [[-1,0],[1,0],[0,1],[0,-1]];

	for (let place of coordinates){
		var new_pal = pixel.map(function (num, idx) {return num + place[idx];});
		let y = new_pal[0];
		let x = new_pal[1];
		if (0 <= y && y < newBoard.length && 0 <= x && x < newBoard[0].length){
			if (newBoard[y][x] === turn) {
				newBoard[y][x] = -1;
				all_pals.push(new_pal);
			};
		};
	};
	return all_pals;
};

function checkOne(newBoard, curr, turn){
	let acc = [];
	if (turn === 1){
		if (curr[1] === newBoard[0].length - 1){
			return [curr];
		};
	} else if (turn === 2){
		if (curr[0] === newBoard.length - 1){
			return [curr];
		};
	};
	for (let neigh of checkPals(newBoard,curr,turn)){
		acc = acc.concat(checkOne(newBoard,neigh,turn));
	};
	if (acc.length > 0){
		acc.push(curr);
	};
	return acc;
};

function checkWin(board, turn){
	let allWins = []
	for (let i = 0; i < board.length; i++){
		let newBoard = new Array(board.length);
		for (let j=0; j<board.length; j++){
			newBoard[j] = board[j].slice();
		};
		if (turn === 1){
			if (newBoard[i][0] === 1){
				newBoard[i][0] = -1;
				path = checkOne(newBoard,[i,0],turn);
				if (path.length > 0 ){
					allWins.push(path);
				};
			};
		} else if(turn === 2){
			if (newBoard[0][i] === 2){
				newBoard[0][i] = -1;
				path = checkOne(newBoard,[0,i],turn);
				if (path.length > 0 ){
					allWins.push(path);
				};
			};			
		};
	};
	return allWins;
};

function buildBoard(boardSize){
	var board = [];
	for (i=0;i<boardSize;i++) {
		board.push(new Array(boardSize).fill(0));
	};
	for (y = 0; y < boardSize; y++){
		let cells = document.createElement("div");
		cells.id = y;
		cells.className = "row";
		let gap = document.createElement("div");
		gap.className = "gap";
		gap.style.width = y * 52 + "px"; // make dynamic
		cells.appendChild(gap)
		for (x = 0; x < boardSize; x++){
			let pixel = document.createElement("div");
			pixel.className = "active pixel";
			let top = document.createElement("div");
			let bot = document.createElement("div");
			top.className = "pixTop";
			bot.className = "pixBottom";
			pixel.appendChild(top)
			pixel.appendChild(bot)
			pixel.id = [y,x]
			pixel.y = y;
			pixel.x = x;
			pixel.addEventListener("click", function(){playerMove(board,pixel)});
			cells.appendChild(pixel);
		};
		document.body.appendChild(cells);
	};
};

function playerMove(board,pixel){
	if (gameEnd === false){
		y = pixel.y
		x = pixel.x
		if (board[y][x] === 0){
			turn = turns%2+1
			board[y][x] = turn; // maybe just p1,
			var elem = document.getElementById([y,x].join());
			elem.className = 'pixel p' + turn;
		};
		if (checkWin(board,turn).length > 0){
			console.log('WIN!');
			gameEnd = true;
			var allActive = document.getElementsByClassName("active");
			for (cell of allActive){
				cell.classList.remove("active");
			};
		};
		turns++;
	};
};