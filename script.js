
//Testing connection
// alert("Connected successfully!");

// Create a pomodoro time with default settings of 25 minutes for work
// 15 minutes for long breaks, 5 minutes for short breaks. 
// Users should be able to start, pause, reset the timer
// And switch between work, long break, and short break intervals.

//Create variable for timer type (duration)
const defaultWork = 25 * 60 // total is 1500 seconds
const defaultLongBreak = 15 * 60 // total is 300 seconds
const defaultShortBreak =  5 * 60 // total 900 seconds

//Create utility variables
let currentTimerType = 'work';
let remainingTime = defaultWork; //the result of defaultwork variable
let isPaused = false;
let intervalId = null; //Check setInterval Id and later clear it

//Get reference to HTML Element (DOM)
    //all timer type button
    let work = document.getElementById('work');
    let shortBreak = document.getElementById('short_break');
    let longBreak = document.getElementById('long_break');

    //all display time and control time elements
    let warning = document.getElementById('timer_container');
    let displayTime = document.getElementById('display_time');
    let start = document.getElementById('start_btn');
    let pause = document.getElementById('pause_btn');
    let reset = document.getElementById('reset_btn');

//EvenListener for HTML document loading before script execution
document.addEventListener('DOMContentLoaded', () => {

//Create function to update display board
function updateTimer() {

    let minutes = remainingTime / 60; //divide by 60
    let minuteToInteger = Math.floor(minutes);
    let seconds = remainingTime % 60; //store the remainder
    
    //Convert number to string
    const convertMinutes = minuteToInteger.toString();
    const convertSeconds = seconds.toString();
    
    //update values into HTML element
    displayTime.textContent = `${convertMinutes.padStart(2, '0')} : ${convertSeconds.padStart(2, '0')}`;

    //Notify user
        if(minuteToInteger <= 3){
            warning.style.borderColor = 'red';
            alermBeepSound();
    }
}

//Function to start timer
function startTimer() {

    if (isPaused) return;
    isPaused = true;

    //assign value to intervalId variable that is set to null
    intervalId = setInterval(() =>{

        remainingTime--;

        updateTimer(); //Call updateTimer function
        alermTickingSound();

        //Clear timer if it reaches 0
        if (remainingTime <= 0) {
            clearInterval(intervalId);
            // alert('Time\'s up!');
    
            warning.style.borderColor = 'rgb(0, 58, 247)';
            renameStartBtn();
            isPaused = false;
            // remainingTime = 1500;
            switchTimerType();
        }


    }, 1000);
}

//Function to pause timer
function pauseTimer() {
    if(!isPaused) return;
    isPaused = false;
    clearInterval(intervalId);
    // updateTimer();
}

//Function to reset timer
function resetTimer() {

    clearInterval(intervalId);
    isPaused = false;

    if (currentTimerType === 'work') {
        remainingTime = defaultWork;
    } else if (currentTimerType === 'longBreak') {
        remainingTime = defaultLongBreak;
        console.log(remainingTime)
    } else if(currentTimerType === 'shortBreak'){
        remainingTime = defaultShortBreak;
        console.log(remainingTime)
    } 

    updateTimer();
}

//Switch time type
function switchTimerType(newTimeType){
    currentTimerType = newTimeType;
    resetTimer();
}

function renameStartBtn() {
    start.textContent = 'Start';
    return;
}

//Alerming sound
function alermBeepSound(){
    let soundPlay = new Audio('beep1.mp3');
    soundPlay.play();
}

function alermTickingSound(){
    let soundPlayTicking = new Audio('ticking1.mp3');
    soundPlayTicking.play();
}

//Start
start.addEventListener('click', startTimer);

//Pause
pause.addEventListener('click', () => {
    pauseTimer();

        start.textContent = 'Resume';
    }
);

//Reset
reset.addEventListener('click', () => {
    resetTimer();
    renameStartBtn();
});

//Work timer type
work.addEventListener('click', () => switchTimerType('work'));

//Long break timer type
longBreak.addEventListener('click', () => switchTimerType('longBreak'));

//Short break timer type
shortBreak.addEventListener('click', () => switchTimerType('shortBreak'));


updateTimer();


});



