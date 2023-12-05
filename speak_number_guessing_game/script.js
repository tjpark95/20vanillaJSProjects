const msgEl = document.getElementById('msg');
const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

let recognition = new window.speechRecognition();

recognition.start();

function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  console.log(msg)
  writeMessage(msg);
  checkNumber(msg);
}

function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

function checkNumber(msg) {
  const num = +msg;

  if(Number.isNaN(num)) {
    msgEl.innerHTML += '<div>That is not a valid number</div>'
    return;
  } 

  if(num > 100 || num < 1) {
    msgEl.innerHTML += '<div>The number must be between 1 and 100</div>';
    return;
  }

  if(num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You guessed the correct number! <br><br>
      It was ${num}
      </h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>TRY LOWER</div>'
  } else {
    msgEl.innerHTML += '<div>TRY HIGHER</div>'
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100)+ 1;
}

recognition.addEventListener('result', onSpeak);

recognition.addEventListener('end', () => {recognition.start()});

document.body.addEventListener('click', (e) => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
})