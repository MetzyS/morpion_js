let game = document.querySelector('#game');
let info = document.querySelector('#info');

const startCells = [
    "", "", "", "", "", "", "", "", ""
];

/**
 * Créer les cases
 */
function createBoard() {
    startCells.forEach((_cell, index) => {
        let cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addPlay)
        game.append(cellElement);
    })
};

createBoard();

function addPlay(e) {
    let play = document.createElement('div');
    play.classList.add('circle');
    e.target.append(play);
}