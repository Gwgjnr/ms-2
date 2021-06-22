const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

const row = 10;
const col = 50;
const sq = 50;
const vacant = 'white';

function drawsquare(x,y,color){
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

let blocks = [
    [blue, 'blue'],
    [yellow, 'yellow'],
    [green, 'green'],
    [orange, 'orange'],
    [red, 'red'],
    [purple, 'purple']    
];

function randomPiece(){
    let r = randomN = Math.floor(Math.random() * blocks.length)
    return new Piece( blocks[r][0],blocks[r][1]);
}

Function block(piece, color){

}

