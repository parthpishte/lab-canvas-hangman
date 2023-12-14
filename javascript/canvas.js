class HangmanCanvas {
  constructor(secretWord) {
   
    // ... your code goes here
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
  }

  createBoard() {
    // ... your code goes here
    this.context.clearRect(0, 0, 800, 1200); // Adjust the canvas dimensions as needed
    this.drawLines();
  }

  drawLines() {
    // ... your code goes here
    const startX = 400;
    const startY = 700;
    const lineWidth = 50;
    const lineSpacing = 20;
    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.beginPath();
      this.context.moveTo(startX + i * (lineWidth + lineSpacing), startY);
      this.context.lineTo(startX + i * (lineWidth + lineSpacing) + lineWidth, startY);
      this.context.stroke();
      this.context.closePath();
    }
  }

  writeCorrectLetter(index) {
    // ... your code goes here
    const letter = this.secretWord[index];
    this.context.font = '30px Arial';
    this.context.fillText(letter, 400 + index * 70, 680);
  }

  writeWrongLetter(letter, errorsLeft) {
    const x = 600 - errorsLeft * 40; // Adjust the x-coordinate based on errors left
    const y = 100;
    this.context.font = '30px Arial';
    this.context.fillText(letter, x, y);
    // ... your code goes here
  }

  drawHangman(errorsLeft) {
    // ... your code goes here
    this.context.beginPath();

    switch (errorsLeft) {
      case 9:
        // Draw head
        this.context.arc(400, 300, 50, 0, Math.PI * 2);
        break;
      case 8:
        // Draw body
        this.context.moveTo(400, 350);
        this.context.lineTo(400, 500);
        break;
      case 7:
        // Draw left arm
        this.context.moveTo(400, 400);
        this.context.lineTo(300, 400);
        break;
      case 6:
        // Draw right arm
        this.context.moveTo(400, 400);
        this.context.lineTo(500, 400);
        break;
      case 5:
        // Draw left leg
        this.context.moveTo(400, 500);
        this.context.lineTo(300, 600);
        break;
      case 4:
        // Draw right leg
        this.context.moveTo(400, 500);
        this.context.lineTo(500, 600);
        break;
      // Add more cases as needed for additional parts
    }

    this.context.stroke();
    this.context.closePath();
  }
  

  gameOver() {
    // ... your code goes here
    const img = new Image();
    img.src = 'images/gameover.png';
   
    img.onload = () => {
      this.context.drawImage(img, 0, 0, 800, 1200); // Adjust the dimensions as needed
    };
  }

  winner() {
    // ... your code goes here
    const img = new Image();
    img.src = 'images/awesome.png';
    
    img.onload = () => {
      this.context.drawImage(img, 0, 0, 800, 1200); // Adjust the dimensions as needed
    };
  }
  }

