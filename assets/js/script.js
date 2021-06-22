const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

const row = 8;
const col = 5;
const sq = 50;
const vacant = 'white';

function drawSquare(x,y,color){
    ctx.fillStyle = color;
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
            drawSquare(c,r,board[r][c]);
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

let p = randomPiece(); // might remove later

function Piece(blockPiece, color){
    this.blockPiece = blockPiece;
    this.color = color;

    this.blockPieceN = 0;
    this.activeBlockPiece = this.blockPiece[this.blockPieceN];

    this.x = 1;
    this.y = -1;
}

Piece.prototype.fill = function(color){
    for( r = 0; r < this.activeBlockPiece.length; r++){
        for(c = 0; c < this.activeBlockPiece.length; c++){
            
            if( this.activeBlockPiece[r][c]){
                drawSquare(this.x + c,this.y + r, color);
            }
        }
    }
}


Piece.prototype.draw = function(){
    this.fill(this.color);
}



Piece.prototype.unDraw = function(){
    this.fill(vacant);
}

function drop(){
    p.moveDown();
    requestAnimationFrame(drop);
}

Piece.prototype.moveDown = function(){
    if(!this.collision(0,1,this.activeBlockPiece)){
        this.unDraw();
        this.y++;
        this.draw();
    }else{
        // we lock the piece and generate a new one
        this.lock();
        p = randomPiece();
    }
    
}

// move Right the piece
Piece.prototype.moveRight = function(){
    if(!this.collision(1,0,this.activeBlockPiece)){
        this.unDraw();
        this.x++;
        this.draw();
    }
}

// move Left the piece
Piece.prototype.moveLeft = function(){
    if(!this.collision(-1,0,this.activeBlockPiece)){
        this.unDraw();
        this.x--;
        this.draw();
    }
}

Piece.prototype.collision = function(x,y,piece){
    for( r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            // if the square is empty, we skip it
            if(!piece[r][c]){
                continue;
            }
            // coordinates of the piece after movement
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            
            // conditions
            if(newX < 0 || newX >= col || newY >= row){
                return true;
            }
            // skip newY < 0; board[-1] will crush our game
            if(newY < 0){
                continue;
            }
            // check if there is a locked piece alrady in place
            if( board[newY][newX] != vacant){
                return true;
            }
        }
    }
    return false;
}

Piece.prototype.lock = function(){
    for( r = 0; r < this.activeBlockPiece.length; r++){
        for(c = 0; c < this.activeBlockPiece.length; c++){

            if( !this.activeBlockPiece[r][c]){
                continue;
            }
            if(this.y + r < 0){
                alert("Game Over");
                // stop request animation frame
                gameOver = true;
                break;
            }
            // we lock the piece
            board[this.y+r][this.x+c] = this.color;
        }
    }
}
document.addEventListener("keydown",CONTROL);

function CONTROL(event){
    if(event.keyCode == 37){
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        p.moveDown();
    }
}

let dropStart = Date.now();
let gameOver = false;
function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 500){
        p.moveDown();
        dropStart = Date.now();
    }
    if( !gameOver){
        requestAnimationFrame(drop);
    }
}

drop();