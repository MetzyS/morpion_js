let game = document.querySelector('#game');
let info = document.querySelector('#info');

const startCells = [
    "", "", "", "", "", "", "", "", ""
];

function createBoard() {
    startCells.forEach((cell, index) => {
        let cellElement = document.createElement('div');
        cellElement.classList.add('square');
        game.append(cellElement);
    })
};

createBoard();