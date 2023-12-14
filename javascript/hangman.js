class Hangman {
  constructor(words) {
    this.words = words;
    // ... your code goes here
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  pickWord() {
    // ... your code goes here
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  checkIfLetter(keyCode) {
    // ... your code goes here
    return (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122);

  }

  checkClickedLetters(letter) {
    // ... your code goes here
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    // ... your code goes here
    this.guessedLetters += letter;
    return this.checkWinner();
  }

  addWrongLetter(letter) {
    // ... your code goes here
    this.letters.push(letter);
    this.errorsLeft--;
  }

  checkGameOver() {
    // ... your code goes here
    return this.errorsLeft <= 0;
  }

  checkWinner() {
    // ... your code goes here
    return this.guessedLetters.split('').every((letter) => this.secretWord.includes(letter));
  }
}

let hangman;
let hangmanCanvas;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard(); 

    // ... your code goes here
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  const pressedKey = event.key.toLowerCase();

  if (hangman && hangmanCanvas && hangman.checkIfLetter(pressedKey.charCodeAt(0))) {
    if (hangman.checkClickedLetters(pressedKey)) {
      if (hangman.secretWord.includes(pressedKey)) {
        const indices = [];
        for (let i = 0; i < hangman.secretWord.length; i++) {
          if (hangman.secretWord[i] === pressedKey) {
            indices.push(i);
          }
        }
        indices.forEach(index => hangmanCanvas.writeCorrectLetter(index));
        if (hangman.checkWinner()) {
          hangmanCanvas.winner();
        }
      } else {
        hangmanCanvas.writeWrongLetter(pressedKey, hangman.errorsLeft);
        hangman.addWrongLetter(pressedKey);

        if (hangman.checkGameOver()) {
          hangmanCanvas.gameOver();
        }
      }
    }
  }
});
