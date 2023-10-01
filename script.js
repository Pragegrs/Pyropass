const gameContainer = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
let score = 0;
let timeUp = false;
let redCrossImage; // To store the red cross image

scoreDisplay.style.display = 'none';

// Preload the red cross image
redCrossImage = new Image();
redCrossImage.src = 'red-cross.png';

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function createMoleHole() {
    const hole = document.createElement('div');
    const mole = document.createElement('div');
    
    hole.classList.add('hole');
    mole.classList.add('mole');
    
    hole.appendChild(mole);
    gameContainer.appendChild(hole);

    mole.addEventListener('click', () => {
        if (!timeUp) {
            mole.classList.remove('up');
            mole.classList.add('clicked');
            score++;
            scoreDisplay.textContent = 'Score: ' + score;

            // Show the red cross for a brief moment
            mole.style.backgroundImage = "url('red-cross.png')";
            setTimeout(() => {
                mole.style.backgroundImage = "url('mole.png')";
            }, 500); // Reset the background image after 500 milliseconds
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
    scoreDisplay.textContent = 'Score: ' + score;
    timeUp = false;
    restartButton.style.display = 'none';
    scoreDisplay.style.display = 'block';

    for (let i = 0; i < 36; i++) {
        createMoleHole();
    }

    setTimeout(() => {
        timeUp = true;
        restartButton.style.display = 'block';
        alert('Game Over!\nYour score: ' + score);
        gameContainer.innerHTML = '';
        scoreDisplay.style.display = 'none';
    }, 10000);

    peep();
}

restartButton.addEventListener('click', () => {
    startGame();
    restartButton.style.display = 'none';
    scoreDisplay.style.display = 'none';
});

startGame();
