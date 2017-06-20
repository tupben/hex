function initialize(){
	let board = [];
	for (i=0;i<11;i++){
		board.push([0,1,0]);
	}
	board[1][1]=1;
	board[2][0]=1;
	board[2][2]=1;
	board[4][0]=1;
	return board
}

let board = initialize();


function checkPals(newBoard, pixel){
	all_pals = [];
	// coordinates = [[-1,0],[-1,1],[0,1],[1,0],[1,-1],[0,-1]];
	coordinates = [[-1,0],[1,0],[0,1],[0,-1]];
	
	for (let place of coordinates){
		var new_pal = pixel.map(function (num, idx) {return num + place[idx];});
		let y = new_pal[0];
		let x = new_pal[1];
		if (0 <= y && y < newBoard.length && 0 <= x && x < newBoard[0].length){
			if (newBoard[y][x] === 1) {
				newBoard[y][x] = -1;
				all_pals.push(new_pal);
			};
		};
	};
	return all_pals;
};

function checkOne(newBoard, curr){
	let acc = [];
	if (curr[1] === 2){
		return [curr];
	};
	for (let neigh of checkPals(newBoard,curr)){
		acc = acc.concat(checkOne(newBoard,neigh));
	};
	if (acc.length > 0){
		acc.push(curr);
	};
	return acc;
};

function checkWin(board){
	let allWins = []
	for (let i = 0; i < board.length; i++){
		let newBoard = new Array(board.length);
		for (let j=0; j<board.length; j++){
			newBoard[j] = board[j].slice();
		};
		if (newBoard[i][0] === 1){
			newBoard[i][0] = -1;
			path = checkOne(newBoard,[i,0]);
			if (path.length > 0 ){
				allWins.push(path);
			};
		};
	};
	return allWins;
};



console.log(checkWin(board));

console.log('')
for (let row of board){
	console.log(row);
};

