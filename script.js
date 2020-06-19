let timer = {

    s: 0,

    get Seconds() {
        return this.s;
    },

    set Seconds(value) {
        if (isPlusInteger(value)) this.s = value;
    },

    //A connector() is a plug-in function for a timer, which will be executed synchronously with the timer.
    connector: null,
    timerId: null,

    play: function () {
        if (this.timerId != null) {
            clearTimeout(this.timerId);
        }
        this.timerId = setInterval(() => {
            if (timer.Seconds > 0) {
                timer.Seconds--;
                if (this.connector != null) {
                    this.connector();
                }
            } else {
                timer.stop();
            }
        }, 1000);

    },

    stop: function () {
        clearInterval(this.timerId);
        this.Seconds = 0;
    },

    pause: function () {
        clearInterval(this.timerId);
    }
};

function setNewTime(hours, minutes, seconds) {
    if (seconds <= 60 && isPlusInteger(seconds) &&
        minutes <= 60 && isPlusInteger(minutes) &&
        isPlusInteger(hours)) {
        timer.Seconds = hours * 3600 + minutes * 60 + seconds;
    } else {
        throw new Error("Error entering time!");
    }
}

function getHours() {
    return Math.floor(timer.Seconds / 3600);
}

function getMinutes() {
    return Math.floor((timer.Seconds - getHours() * 3600) / 60);
}

function getSeconds() {
    return timer.Seconds - getHours() * 3600 - getMinutes() * 60;
}

function isPlusInteger(value) {
    return (value >= 0 && (value ^ 0) === value);
}

let outputSpan = document.getElementById("output-span");

let buttonPlay = document.getElementById("buttonPlay");
let buttonPause = document.getElementById("buttonPause");
let buttonStop = document.getElementById("buttonStop");

let buttonApply = document.getElementById("buttonApply");
let buttonFullscreen = document.getElementById("buttonFullscreen");

let inputHours = document.getElementById("inputHours");
let inputMinutes = document.getElementById("inputMinutes");
let inputSeconds = document.getElementById("inputSeconds");

let div_wrapper = document.getElementById("wrapper");
let spanOutput = document.getElementById("output-span");

function setOutputSpan() {
    outputSpan.innerHTML = `${getHours().toString().padStart(2, 0)}:${getMinutes().toString().padStart(2, 0)}:${getSeconds().toString().padStart(2, 0)}`;
}

timer.connector = setOutputSpan;

function button_play() {
    timer.play();
}

function button_pause() {
    timer.pause();
}

function button_stop() {
    timer.stop();
    outputSpan.innerHTML = "00:00:00";
}

function button_setTime() {
    setNewTime(+inputHours.value, +inputMinutes.value, +inputSeconds.value);
    outputSpan.innerHTML = `${inputHours.value.padStart(2, 0)}:${inputMinutes.value.toString().padStart(2, 0)}:${inputSeconds.value.toString().padStart(2, 0)}`;
}

let isFullscreen = false;
function button_fullscreen() {
    if(!isFullscreen){
        div_wrapper.classList.add("output-span-fullscreen");
        isFullscreen = true;
    }
}

function span_deactivateFullscreen() {
    if (isFullscreen) {
        div_wrapper.classList.remove("output-span-fullscreen");
        isFullscreen = false;
    }
}

buttonPlay.addEventListener("click", button_play);
buttonPause.addEventListener("click", button_pause);
buttonStop.addEventListener("click", button_stop);
buttonApply.addEventListener("click", button_setTime);
buttonFullscreen.addEventListener("click", button_fullscreen);
spanOutput.addEventListener("click", span_deactivateFullscreen);