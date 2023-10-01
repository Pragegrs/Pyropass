const gameContainer = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

let score = 0;
let timeUp = false;

function randomTime(min, max) {
    return Math.random() * (max - min) + min;
}

function createMoleHole() {
    const hole = document.createElement('div');
    const mole = document.createElement('div');
    
    hole.classList.add('hole');
    mole.classList.add('mole');
    
    hole.appendChild(mole);
    gameContainer.appendChild(hole);

    hole.addEventListener('click', () => {
        if (!timeUp && !mole.classList.contains('hit')) {
            mole.classList.remove('up');
            mole.classList.add('hit');
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        }
    });
}

function randomHole() {
    const holes = document.querySelectorAll('.hole');
    const idx = Math.floor(Math.random() * holes.length);
    return holes[idx];
}

function peep() {
    if (timeUp) return;

    const hole = randomHole();
    const mole = hole.querySelector('.mole');
    const time = randomTime(200, 1000);

    mole.classList.add('up');
    
    setTimeout(() => {
        mole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    timeUp = false;
    startButton.disabled = true;
    restartButton.style.display = 'none';

    for (let i = 0; i < 9; i++) { // Create 9 mole holes for a 3x3 grid
        createMoleHole();
    }

    setTimeout(() => {
        timeUp = true;
        startButton.disabled = false;
        restartButton.style.display = 'block';
        alert('Game Over!\nYour score: ' + score);
        gameContainer.innerHTML = '';
    }, 10000);

    peep();
}

startButton.addEventListener('click', startGame);

restartButton.addEventListener('click', () => {
    startGame();
    restartButton.style.display = 'none';
});

startGame();
