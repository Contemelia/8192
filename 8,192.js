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

document.addEventListener("touchstart", (event) => {
    touchStart(event);
})

document.addEventListener("touchmove", (event) => {
    touchMove(event);
})

let xDown = null;
let yDown = null;



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

function touchStart(event) {
    xDown = event.touches[0].clientX;
    yDown = event.touches[0].clientY;
}

function touchMove(event) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = event.touches[0].clientX;                                    
    const yUp = event.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            moveLeft();
        } else {
            moveRight();
        }
    } else {
        if (yDiff > 0) {
            moveUp();
        } else {
            moveDown();
        }
    }

    // Reset values
    xDown = null;
    yDown = null; 
}



function moveUp() {
    for (let row = 0; row < size; row++) {
        let newRow = [];
        for (let column = 0; column < size; column++) {
            newRow.push(board[column][row]);
        }
        newRow = clearZeroes(newRow);
        newRow = swipe(newRow);
        while (newRow.length < size) {
            newRow.push(0);
        }
        for (let column = 0; column < size; column++) {
            board[column][row] = newRow[column];
            let tile = document.getElementById(column + "-" + row);
            updateTile(tile, newRow[column]);
        }
    }

    generateRandomTile();
}

function moveDown() {
    for (let row = 0; row < size; row++) {
        let newRow = [];
        for (let column = 0; column < size; column++) {
            newRow.push(board[column][row]);
        }
        newRow = clearZeroes(newRow);
        newRow = newRow.reverse();
        newRow = swipe(newRow);
        newRow = newRow.reverse();
        while (newRow.length < size) {
            newRow.unshift(0);
        }
        for (let column = 0; column < size; column++) {
            board[column][row] = newRow[column];
            let tile = document.getElementById(column + "-" + row);
            updateTile(tile, newRow[column]);
        }
    }

    generateRandomTile();
}

function moveLeft() {
    for (let row = 0; row < size; row++) {
        let newRow = clearZeroes(board[row]);
        newRow = swipe(newRow);
        while (newRow.length < size) {
            newRow.push(0);
        }
        for (let column = 0; column < size; column++) {
            board[row][column] = newRow[column];
            let tile = document.getElementById(row + "-" + column);
            updateTile(tile, newRow[column]);
        }
    }

    generateRandomTile();
}

function moveRight() {
    for (let row = 0; row < size; row++) {
        let newRow = clearZeroes(board[row]);
        newRow = newRow.reverse();
        newRow = swipe(newRow);
        newRow = newRow.reverse();
        while (newRow.length < size) {
            newRow.unshift(0);
        }
        for (let column = 0; column < size; column++) {
            board[row][column] = newRow[column];
            let tile = document.getElementById(row + "-" + column);
            updateTile(tile, newRow[column]);
        }
    }

    generateRandomTile();
}

function swipe(row) {
    for (let index = 0; index < row.length - 1; index++) {
        if (row[index] === row[index + 1]) {
            row[index] *= 2;
            row[index + 1] = 0;
            score += row[index];
            document.getElementById("current-score").innerHTML = score;
            if (score > highscore) {
                highscore = score;
                document.getElementById("high-score").innerHTML = highscore;
            }
        }
    }
    row = clearZeroes(row);

    return row;
}