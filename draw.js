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
 
    // Kiểm tra xem ván đấu đã kết thúc chưa
    if (score == 10) //Máy thắng
        return score;
 
    if (score == -10)//Người chơi thắng
        return score;
 
    if (isContinue()==false)//Hòa
        return 0;
 
    // Nước đi hiện tại của máy
    if (isMax)
    {
        let best = -1000;
 
        // Duyệt qua tất cả các ô
        for (let i = 0; i<3; i++)
        {
            for (let j = 0; j<3; j++)
            {
                // Kiểm tra xem ô hiện tại có đang trống không
                if (board[i][j]=='-')
                {
                    // Gán nước đi cho máy
                    board[i][j] = ai;
 
                    // Phát triển ván đấu dựa trên nước đi hiện tại để tìm ra giá trị tối ưu
                    best = Math.max(best, minimax(depth+1, !isMax) - depth);
 
                    // Gán lại để tiếp tục duyệt
                    board[i][j] = '-';
                }
            }
        }
        return best;
    }
 
    // tương tự
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
            // Kiểm tra xem ô hiện tại có trống không
            if (board[i][j]=='-')
            {
                // Gán nước đi của máy
                board[i][j] = ai;
 
                // Tìm giá trị tối ưu
                let moveVal = minimax(0, false);
                console.log(moveVal + " " + i + " " + j);
                // Gán lại để thực hiện các trường hợp sau đó
                board[i][j] = '-';
                
                // Nếu giá trị của nước đi hiện tại tốt hơn giá trị bestVal
                // thì cập nhật lại giá trị bestVal
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