let board;
let size = 6;

let score;
let highscore;



window.onload = function() {
    highscore = 0;
    document.getElementById("high-score").innerHTML = highscore;
    
    resetBoard();
}



function checkBlankTilePresence() {
    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
            if (board[row][column] === 0) {
                return true;
            }
        }
    }
    return false;
}

function generateRandomTile() {
    if (!checkBlankTilePresence()) {
        let row = Math.floor(Math.random() * size);
        let column = Math.floor(Math.random() * size);
        while (board[row][column] !== 0) {
            row = Math.floor(Math.random() * size);
            column = Math.floor(Math.random() * size);
        }
        board[row][column] = 2;
        let tile = document.getElementById(row + "-" + column);
        updateTile(tile, 2);
    }
}

function generateRandomTile() {
    let row = Math.floor(Math.random() * size);
    let column = Math.floor(Math.random() * size);
    while (board[row][column] !== 0) {
        row = Math.floor(Math.random() * size);
        column = Math.floor(Math.random() * size);
    }
    board[row][column] = 2;
    let tile = document.getElementById(row + "-" + column);
    updateTile(tile, 2);
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num === 0) {
        tile.innerText = "空白";
        tile.classList.add("tile-blank");
    }
    else if (num > 0) {
        tile.innerText = num;
        if (num < 8192) {
            tile.classList.add("tile-" + num);
        }
        else {
            tile.classList.add("tile-8192");
        }
    }
}

function clearZeroes(row) {
    return row.filter(num => num !== 0);
}



function resetBoard() {
    // board = [
    //     [0, 0, 0, 0], 
    //     [0, 0, 0, 0], 
    //     [0, 0, 0, 0], 
    //     [0, 0, 0, 0]
    // ]
    // board = [
    //     [0, 0, 0, 0, 0, 0, 0, 0], 
    //     [0, 0, 0, 0, 0, 0, 0, 0], 
    //     [0, 0, 0, 0, 0, 0, 0, 0], 
    //     [0, 0, 0, 0, 0, 0, 0, 0], 
    //     [0, 0, 0, 0, 0, 0, 0, 0], 
    //     [0, 0, 0, 0, 0, 0, 0, 0], 
    //     [0, 0, 0, 0, 0, 0, 0, 0], 
    //     [0, 0, 0, 0, 0, 0, 0, 0]
    // ]

    score = 0;
    document.getElementById("current-score").innerHTML = score;

    // This code creates the board array and initializes all the values to 0
    board = new Array(size);
    for (let row = 0; row < size; row++) {
        board[row] = new Array(size);
        for (let column = 0; column < size; column++) {
            board[row][column] = 0;
        }
    }

    // document.getElementById("board").getAttribute("style").getAttribute("grid-template-columns").innerHTML = size;
    // document.getElementById("board").getAttribute("style").getAttribute("grid-template-rows").innerHTML = size;

    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
            let tile = document.createElement("div");
            tile.id = row + "-" + column;
            let num = board[row][column];
            updateTile(tile, num);
            document.getElementById("board").appendChild(tile);
        }
    }

    generateRandomTile();
    generateRandomTile();
}



document.addEventListener("keyup", (event) => {
    moveTiles(event);
})



function moveTiles(event) {
    if (event.key.toLowerCase() === "arrowup" || event.key.toLowerCase() === "w") {
        moveUp();
    }
    else if (event.key.toLowerCase() === "arrowdown" || event.key.toLowerCase() === "s") {
        moveDown();
    }
    else if (event.key.toLowerCase() === "arrowleft" || event.key.toLowerCase() === "a") {
        moveLeft();
    }
    else if (event.key.toLowerCase() === "arrowright" || event.key.toLowerCase() === "d") {
        moveRight();
    }
}



function moveUp() {
    alert("Up");
}

function moveDown() {
    alert("Down");
}

function moveLeft() {
    alert("Left");
}

function moveRight() {
    alert("Right");
}