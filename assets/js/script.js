const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");
const scoreVar = document.getElementById('timer');
let seconds = 0;

const row = 8;
const col = 5;
const sq = 50;
const vacant = 'white';

function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*sq,y*sq,sq,sq);

    ctx.strokeStyle = 'white';
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

function incrementSeconds(){
    if(!gameOver){
        seconds += 1;
        timer.innerText = seconds + " seconds.";
    }

}

function randomPiece(){
    let r = randomN = Math.floor(Math.random() * blocks.length)
    return new Piece( blocks[r][0],blocks[r][1]);
}

let p = randomPiece();

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
        
        this.lock();
        p = randomPiece();
    }
    
}

Piece.prototype.moveRight = function(){
    if(!this.collision(1,0,this.activeBlockPiece)){
        this.unDraw();
        this.x++;
        this.draw();
    }
}

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
            if(!piece[r][c]){
                continue;
            }
            
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            
            if(newX < 0 || newX >= col || newY >= row){
                return true;
            }
            if(newY < 0){
                continue;
            }
            
            if( board[newY][newX] != vacant){
                return true;
            }
        }
    }
    return false;
}

let score = 0;

Piece.prototype.lock = function(){
    for( r = 0; r < this.activeBlockPiece.length; r++){
        for(c = 0; c < this.activeBlockPiece.length; c++){

            if( !this.activeBlockPiece[r][c]){
                continue;
            }
            if(this.y + r < 0){
                alert("Game Over");
                gameOver = true;
                break;
            }
            board[this.y+r][this.x+c] = this.color;
        }
    }

    // code for removing full row and then adding new vacant row at top
    for(r = 0; r < row; r++){
        let fiveColorRow = true;
        let firstRowColor = board[r][0];
        for( c = 0; c < col; c++){
            if(firstRowColor != board[r][c]){
                fiveColorRow = false;
            }
            
        }
        fiveColorRow = fiveColorRow && (board[r][c] != vacant);
        if(fiveColorRow){
            for( y = r; y > 1; y--){
                for( c = 0; c < col; c++){
                    board[y][c] = board[y-1][c];
                }
            }
            for( c = 0; c < col; c++){
                board[0][c] = vacant;
            }
        }
    // code for removing full column if colors match
    } /*
    for(c = 0; c < col; c++){
        let fiveColorCol = true;
        let firstColColor = board[7][c];
            for( r = 0; r < row; r++){
            if(firstColColor != board[r][c]){
                fiveColorCol = false;
            }
            fiveColorCol = fiveColorCol && (board[r][c] != vacant);
        }
        if(fiveColorCol){
            for( y = c; y > 1; y--){
                for( r = 0; r < row; r++){
                    board[r][y] = board[r][y-1];
                }
            }
            for( r = 0; r < row; r++){
                board[r][0] = vacant;
            }
        }
    } */
    drawBoard();
}
document.addEventListener("keydown",control);

function control(event){
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


