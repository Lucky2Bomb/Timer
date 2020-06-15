let Timer = {

    s: 0,

    get Seconds() {
        return this.s;
    },

    set Seconds(value) {
        if (isPlusInteger(value)) this.s = value;
    },

    setNewTime: function (hours, minutes, seconds) {
        if (seconds <= 60 && isPlusInteger(seconds) &&
            minutes <= 60 && isPlusInteger(minutes) &&
            isPlusInteger(hours)) {
            this.Seconds = hours * 3600 + minutes * 60 + seconds;
        }
    },

    timerId: null,

    start: function () {
        if (this.timerId != null) {
            clearTimeout(this.timerId);
        }
        this.timerId = setInterval(() => {
            if (Timer.Seconds > 0) Timer.Seconds--;
            else Timer.stop();
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



function isPlusInteger(value) {
    return (value >= 0 && (value ^ 0) === value);
}

Timer.setNewTime(6, 35, 26);
Timer.start();

setTimeout(() => Timer.pause(), 5000);
setTimeout(() => Timer.start(), 8000);