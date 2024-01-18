'use strict';

let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;
const guessInput = document.querySelector('.guess');
const messageDisplay = document.querySelector('.message');
const numberDisplay = document.querySelector('.number');
const body = document.querySelector('body');
const checkButton = document.querySelector('.check');

const displayMessage = function (message) {
  messageDisplay.textContent = message;
};

guessInput.oninput = function () {
  validateInput(this);
};

function validateInput(input) {
  const value = input.value;

  if (value < 1 || value > 20) {
    input.value = '';
    displayMessage('⛔️ Please enter a number from 1 to 20!');
  }
}

checkButton.addEventListener('click', function () {
  const guess = Number(guessInput.value);

  if (!guess) {
    displayMessage('⛔️ No number!');
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    numberDisplay.textContent = secretNumber;
    guessInput.disabled = true;

    body.style.backgroundColor = '#60b347';
    numberDisplay.style.width = '30rem';
    checkButton.textContent = 'Again!';

    checkButton.addEventListener('click', function () {
      if (checkButton.textContent === 'Again!') {
        score = 20;
        secretNumber = Math.trunc(Math.random() * 20 + 1);

        displayMessage('Start guessing...');
        numberDisplay.textContent = secretNumber;
        document.querySelector('.score').textContent = score;
        numberDisplay.textContent = '?';
        guessInput.value = '';

        body.style.backgroundColor = '#222';
        numberDisplay.style.width = '15rem';
        checkButton.textContent = 'Check!';
      }
    });

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
});
