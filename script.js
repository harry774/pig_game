'use strict';

// Selecting elements | score of each player
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

let scores, currentScore, activePlayer, playing;

// initial condition of game
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    var firstPlayer = prompt("Please enter your name | Player 1", "Player 1");
    if (firstPlayer != null) {
        document.getElementById("name--0").textContent = firstPlayer;
    }
    var secondPlayer = prompt("Please enter your name | Player 2", "Player 2");
    if (secondPlayer != null) {
        document.getElementById("name--1").textContent = secondPlayer;
    }
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
// dice rolling functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // random role dice generate | generated value from (0.0 to 0.99) * 6 = 5 (max, cause only take decimal)
        const dice = Math.trunc(Math.random() * 6) + 1;

        // display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // check for dice rolled 1
        if (dice !== 1) {
            // add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            // switch next player
            switchPlayer();
        }
    }
});
// hold button functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        // add current score of active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // if score >= 100
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // swtich player
            switchPlayer();
        }
    }
});

// resetting game | New game button functionality
btnNew.addEventListener('click', init);