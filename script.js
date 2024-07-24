let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function startStopwatch() {
  startTime = new Date().getTime();
  timerInterval = setInterval(updateDisplay, 10);
}

function stopStopwatch() {
  clearInterval(timerInterval);
}

function resetStopwatch() {
  clearInterval(timerInterval);
  running = false;
  startStopBtn.textContent = 'Start';
  display.textContent = '00:00:00';
  laps = [];
  updateLaps();
}

function lapStopwatch() {
  if (running) {
    laps.push(display.textContent);
    updateLaps();
  }
}

function updateLaps() {
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const li = document.createElement('li');
    li.textContent = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(li);
  });
}

function updateDisplay() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const minutes = Math.floor(difference / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((difference % 1000) / 10);

  display.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
  return number < 10 ? '0' + number : number;
}

startStopBtn.addEventListener('click', () => {
  if (!running) {
    startStopBtn.textContent = 'Stop';
    startStopwatch();
  } else {
    startStopBtn.textContent = 'Start';
    stopStopwatch();
  }
  running = !running;
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', lapStopwatch);
