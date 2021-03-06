let board = [   ['-', '-', '-'], 
                ['-', '-', '-'], 
                ['-', '-', '-']
            ]
let player = 'x', ai = 'o';
let flag = 0, pl = 0, tie = 0, com = 0
let ran = Math.floor(Math.random() * 2)
console.log(ran);

if(ran == 0) {
    findBestMove();
}

for(let i = 0; i < 9; i++) {
    let tmp = '#id' + (i+1)
    document.querySelector(tmp).addEventListener("click", () => {
        document.querySelector(tmp).innerHTML = 'x'
        board[parseInt(i/3)][i%3] = player;
        findBestMove();
        console.log(board);
        if(checkWin() > 0) {
            flag = 1
            com++
            document.querySelector("#com").innerHTML = com
        }
        else if(checkWin() < 0) {
            flag = 1
            pl++
            document.querySelector("#pl").innerHTML = pl
        }
        else if(!isContinue() && flag == 0) {
            tie++
            document.querySelector("#tie").innerHTML = tie
        }
    })
}

function isContinue() {
	for(let i = 0; i < 3; i++) {
		for(let j = 0; j < 3; j++) {
			if(board[i][j] == '-') return true;
		}
	}
	return false;
}

function checkWin() {
	// check hang ngang
	for(let i = 0; i < 3; i++) { 
		if(board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
			if(board[i][0] == ai) {
				return 10;
			}
			else if(board[i][0] == player) {
				return -10;
			}
		}
	}
	// check cot doc
	for(let i = 0; i < 3; i++) { 
		if(board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
			if(board[0][i] == ai) {
				return 10;
			}
			else if(board[0][i] == player) {
				return -10;
			}
		}
	}
	//check duong cheo chinh 
	if (board[0][0]==board[1][1] && board[1][1]==board[2][2])
    {
        if (board[0][0]==ai)
            return 10;
        else if (board[0][0]==player)
            return -10;
    }
	//check duong cheo phu
    if (board[0][2]==board[1][1] && board[1][1]==board[2][0])
    {
        if (board[0][2]==ai)
            return 10;
        else if (board[0][2]==player)
            return -10;
    }
    return 0;
}

function minimax(depth, isMax) {
    let score = checkWin();
 
    // Ki???m tra xem v??n ?????u ???? k???t th??c ch??a
    if (score == 10) //M??y th???ng
        return score;
 
    if (score == -10)//Ng?????i ch??i th???ng
        return score;
 
    if (isContinue()==false)//H??a
        return 0;
 
    // N?????c ??i hi???n t???i c???a m??y
    if (isMax)
    {
        let best = -1000;
 
        // Duy???t qua t???t c??? c??c ??
        for (let i = 0; i<3; i++)
        {
            for (let j = 0; j<3; j++)
            {
                // Ki???m tra xem ?? hi???n t???i c?? ??ang tr???ng kh??ng
                if (board[i][j]=='-')
                {
                    // G??n n?????c ??i cho m??y
                    board[i][j] = ai;
 
                    // Ph??t tri???n v??n ?????u d???a tr??n n?????c ??i hi???n t???i ????? t??m ra gi?? tr??? t???i ??u
                    best = Math.max(best, minimax(depth+1, !isMax) - depth);
 
                    // G??n l???i ????? ti???p t???c duy???t
                    board[i][j] = '-';
                }
            }
        }
        return best;
    }
 
    // t????ng t???
    else
    {
        let best = 1000;
        for (let i = 0; i<3; i++)
        {
            for (let j = 0; j<3; j++)
            {
                if (board[i][j]=='-')
                {
                    board[i][j] = player;
                    best = Math.min(best, minimax(depth+1, !isMax) + depth);
                    board[i][j] = '-';
                }
            }
        }
        return best;
    }
}

function findBestMove() {
	let bestVal = -1000;
	let row = -1, col = -1;
	for (let i = 0; i<3; i++)
    {
        for (let j = 0; j<3; j++)
        {
            // Ki???m tra xem ?? hi???n t???i c?? tr???ng kh??ng
            if (board[i][j]=='-')
            {
                // G??n n?????c ??i c???a m??y
                board[i][j] = ai;
 
                // T??m gi?? tr??? t???i ??u
                let moveVal = minimax(0, false);
                console.log(moveVal + " " + i + " " + j);
                // G??n l???i ????? th???c hi???n c??c tr?????ng h???p sau ????
                board[i][j] = '-';
                
                // N???u gi?? tr??? c???a n?????c ??i hi???n t???i t???t h??n gi?? tr??? bestVal
                // th?? c???p nh???t l???i gi?? tr??? bestVal
                if (moveVal > bestVal)
                {
                    row = i;
                    col = j;
                    bestVal = moveVal;
                    console.log(moveVal);
                }
            }
        }
    }
    if(row != -1 && col != -1) {
        board[row][col] = 'o';
        let tmp = "#id" +(row*3 + col + 1)
        document.querySelector(tmp).innerHTML = 'o'
    }
}

function refresh() {
    for(let i = 0; i < 9; i++) {
        let tmp = '#id' + (i+1);
        document.querySelector(tmp).innerHTML = '';
    }
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            board[i][j] = '-';
        }
    }
    flag = 0
}