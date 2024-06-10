function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('fullScreenTime').textContent = `${hours}:${minutes}:${seconds}`;
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
        totalSeconds--;
    }, 1000);
}

function showFullScreenClock() {
    document.getElementById('fullScreenClock').classList.add('active');
}

function hideFullScreenClock() {
    document.getElementById('fullScreenClock').classList.remove('active');
}
