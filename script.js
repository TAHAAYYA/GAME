const button = document.getElementById('gameButton');
const attempts = document.getElementById('attempts');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popupTitle');
const popupMessage = document.getElementById('popupMessage');

let count = 0;
const milestones = [15, 50, 100, 150, 200, 300];

function moveButton() {
  const top = Math.random() * 70 + '%';
  const left = Math.random() * 70 + '%';
  button.style.top = top;
  button.style.left = left;
  count++;
  attempts.textContent = 'Attempts: ' + count;

  if (milestones.includes(count)) {
    popupTitle.textContent = '😈 You still lose!';
    popupMessage.textContent = `You tried ${count} times. Still no luck!`;
    popup.style.display = 'flex';
    setTimeout(() => popup.style.display = 'none', 3000);
  }

  createParticle();
}

function createParticle() {
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.width = '6px';
  particle.style.height = '6px';
  particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
  particle.style.top = Math.random() * 100 + '%';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.borderRadius = '50%';
  particle.style.opacity = 1;
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = 5;
  document.body.appendChild(particle);

  let opacity = 1;
  const fade = setInterval(() => {
    opacity -= 0.02;
    particle.style.opacity = opacity;
    if (opacity <= 0) {
      clearInterval(fade);
      particle.remove();
    }
  }, 16);
}

button.addEventListener('mouseenter', moveButton);
button.addEventListener('click', () => alert('Nice try, but you still lose!'));

moveButton();

let secretCode = '';
const winSequence = 'win';

document.addEventListener('keydown', (e) => {
  secretCode += e.key.toLowerCase();

  // Keep it from getting too long
  if (secretCode.length > winSequence.length) {
    secretCode = secretCode.slice(-winSequence.length);
  }

  if (secretCode === winSequence) {
    winGame();
  }
});

function winGame() {
  popupTitle.textContent = '🎉 YOU WIN!';
  popupMessage.textContent = `You discovered the secret! Only ${count} attempts!`;
  popup.style.display = 'flex';
  
  // Confetti
  for (let i = 0; i < 100; i++) {
    createParticle();
  }

  // Disable the button
  button.removeEventListener('mouseenter', moveButton);
  button.style.top = '50%';
  button.style.left = '50%';
  button.style.transform = 'translate(-50%, -50%) scale(1.5)';
  button.textContent = 'Winner!';
}
