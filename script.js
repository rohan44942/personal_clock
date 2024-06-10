function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, '0');

    const timeString = `${formattedHours}:${minutes}:${seconds}`;
    document.getElementById('time').textContent = timeString;
    document.getElementById('ampm').textContent = ampm;
    document.getElementById('fullScreenTime').textContent = timeString;
    document.getElementById('fullScreenAmpm').textContent = ampm;
}

setInterval(updateTime, 1000);
updateTime();

let reverseTimerInterval;
function startReverseTimer() {
    const minutes = parseInt(document.getElementById('reverseMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('reverseSeconds').value) || 0;
    let totalSeconds = minutes * 60 + seconds;

    clearInterval(reverseTimerInterval);
    reverseTimerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(reverseTimerInterval);
        }
        const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const secs = String(totalSeconds % 60).padStart(2, '0');
        document.getElementById('reverseTime').textContent = `${mins}:${secs}`;
        document.getElementById('fullScreenReverseTime').textContent = `${mins}:${secs}`;
        totalSeconds--;
    }, 1000);
}

let focusTimerInterval;
function startFocusTimer() {
    const minutes = parseInt(document.getElementById('focusMinutes').value) || 0;
    let totalSeconds = minutes * 60;

    clearInterval(focusTimerInterval);
    focusTimerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(focusTimerInterval);
        }
        const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const secs = String(totalSeconds % 60).padStart(2, '0');
        document.getElementById('focusTime').textContent = `${mins}:${secs}`;
        document.getElementById('fullScreenFocusTime').textContent = `${mins}:${secs}`;
        totalSeconds--;
    }, 1000);
}

function showFullScreenClock() {
    document.getElementById('fullScreenClock').classList.add('active');
    keepScreenOn();
}

function hideFullScreenClock() {
    document.getElementById('fullScreenClock').classList.remove('active');
    releaseScreenOn();
}

function showFullScreenReverse() {
    document.getElementById('fullScreenReverse').classList.add('active');
    keepScreenOn();
}

function hideFullScreenReverse() {
    document.getElementById('fullScreenReverse').classList.remove('active');
    releaseScreenOn();
}

function showFullScreenFocus() {
    document.getElementById('fullScreenFocus').classList.add('active');
    keepScreenOn();
}

function hideFullScreenFocus() {
    document.getElementById('fullScreenFocus').classList.remove('active');
    releaseScreenOn();
}

let wakeLock = null;

function keepScreenOn() {
    if ('wakeLock' in navigator) {
        navigator.wakeLock.request('screen').then(lock => {
            wakeLock = lock;
        }).catch(err => {
            console.log(`${err.name}, ${err.message}`);
        });
    }
}

function releaseScreenOn() {
    if (wakeLock !== null) {
        wakeLock.release().then(() => {
            wakeLock = null;
        }).catch(err => {
            console.log(`${err.name}, ${err.message}`);
        });
    }
}
