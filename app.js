const timeLeft = document.querySelector('.time-left');
const timerEnd = document.querySelector('.timer-end');
const startStopButton = document.querySelector('.start-stop-button')
let timerInterval; //to stop setInterval in the timer() function, when the timer hits 0
let timerSecondsInput = 3; //1500s is default time for pomodoro focus time(25mins = 1500s)
let timerOn = false;

function formatTime(time) {
    return time < 10 ? '0' + time : time; //add an 0 before a time number if it's less then 10;
}

function displayTimeLeft(seconds) { //display secondsLeft from timer in HTML
    const mins= Math.floor(seconds / 60);
    const secs = seconds % 60;

    timeLeft.textContent = `${formatTime(mins)}:${formatTime(secs)}`;
    console.log(`${formatTime(mins)}:${formatTime(secs)}`);
}

function displayTimerEnd(timestamp) { //timestamp = timeThen from timer(), in milliseconds
    const time = new Date(timestamp);
    const hours = time.getHours();
    const mins = time.getMinutes();

    timerEnd.textContent = `Timer ends at ${hours}:${mins} o'clock.`
}

function timer(seconds) {
    clearInterval(timerInterval);

    const timeNow = Date.now(); //in milliseconds
    const timeThen = timeNow + seconds * 1000; 

    displayTimerEnd(timeThen)
    displayTimeLeft(seconds)
    timerInterval = setInterval(() => {
        const secondsLeft = Math.round((timeThen - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(timerInterval);
            startStopButton.classList.toggle("down");
            startStopButton.textContent = "Start";
            return;
        }

        displayTimeLeft(Math.abs(secondsLeft)) //Math.abs() makes all number positive, because of the last 0 being sometimes -0 due to weird computer float math
    }, 1000)
}

function stopTimer() {
    clearInterval(timerInterval);
    //get the amount of time at when the timer stopped
    let secondsLeft = timeLeft.textContent.split(':') //get both mins and secs in a array ["mins", 'secs'];
    secondsLeft = Number(secondsLeft[0]) * 60 + Number(secondsLeft[1]) //convert times to number as well as mins to secs, then sum them up

    return secondsLeft;
}

startStopButton.addEventListener('click', (e) => {
    if (!timerOn) {
        timer(timerSecondsInput);
        e.target.classList.toggle("down");
        e.target.textContent = "Stop";
        timerOn = true;
    }else{
        timerSecondsInput = stopTimer();
        e.target.classList.toggle("down");
        e.target.textContent = "Start"
        timerOn = false;
    }
})

document.customTimeForm.addEventListener('submit', (e) => { //html elements can be accessed directly in JS if they have a "name" attribute
    e.preventDefault();
    const customTime = Number(e.target.customTimeInput.value) * 60; //seconds

    if (!isNaN(customTime)) { //if customTime is not not a number (is a number)
        displayTimeLeft(customTime)
        timerSecondsInput = customTime;
    } 
    e.target.reset()
})