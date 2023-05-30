let game = document.querySelector('#game');
let turn = document.querySelector('#turn-icon');
let info = document.querySelector('#info');
let reset = document.querySelector('#btn-reset');

const startCells = [
    "", "", "", "", "", "", "", "", ""
];

let play = "cross";
turn.classList.add('cross-turn');

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
    let playShow = document.createElement('div');
    playShow.classList.add(play);
    e.target.append(playShow);
    turn.classList.remove(play + '-turn');
    // change la variable play grâce a la ternaire suivante
    play = play === "cross" ? "circle" : "cross";
    turn.classList.add(play + '-turn');
    e.target.removeEventListener('click', addPlay);
    checkScore()
}

/**
 * Vérifie si une combinaison gagnante a été jouée
 */
function checkScore() {
    // On récupère toutes les cases
    const allSquares = document.querySelectorAll('.square');
    // On défini les combinaisons gagnantes (en utilisant les IDs des cases)
    // par exemple, si 0, 1 et 2 on le même symbole = victoire.
    const winningCombinations = [
        // Combinaisons horizontales
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Combinaisons verticales
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // Combinaisons diagonales
        [0, 4, 8], [2, 4, 6]
    ]


    // On vérifie chaque combinaison
    // On prend chaque index d'une combinaison, on vérifie si elle possède un enfant (div)
    // Si elle possède un enfant, on vérifie si cet enfant possède la classe 'cross'
    winningCombinations.forEach(array => {
        const crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cross'));
        if (crossWins) {
            info.innerHTML = `<span class="cross-icon"></span> GG!`;
            // On retire ensuite l'eventListener (impossible de l'enlever donc on utilise un trick)
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return
        }

        // Même principe pour les cercles
        const circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle'));
        if (circleWins) {
            info.innerHTML = `<span class="circle-icon"></span> GG!`;
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return
        }
    })

}

reset.addEventListener('click', e => {
    game.innerHTML = '';
    info.innerHTML = '';
    play = "cross";
    turn.classList.remove('circle-turn');
    turn.classList.add('cross-turn');
    createBoard();
});