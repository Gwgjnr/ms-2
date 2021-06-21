const cvs = document.getElementById('game');
const ctx = cvs.getContext("2d");

const row = 10;
const col = 50;
const sq = 40;
const vacant = 'white';

function drawsquare(x,y,_color){
    ctx.fillStyle = 'white';
    ctx.fillRect(x*sq,y*sq,sq,sq);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(x*sq,y*sq,sq,sq);
}

let board = [];
for( r = 0; r < row; r++){
    board[r] = [];
    for(c = 0; c < col; c++){
        board[r][c] = vacant;
    }
}

function drawBoard(){
    for( r = 0; r < row; r++){
        for(c = 0; c < col; c++){
            drawsquare(c,r,board[r][c]);
        }
    }
}

drawBoard();