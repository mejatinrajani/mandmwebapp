

let timeLeft = 10 * 60; // 10 minutes in seconds
let timerInterval;
let holdLeaveInterval;
let isHold = true;



document.querySelector('.mainbutton').addEventListener('click', startTimer);
document.querySelector('.mainbutton').addEventListener('click', playmyaudio);

function startTimer() {
    document.querySelector('.mainbutton').disabled = true;
    speakText("your guided meditation has been started")
    // Timer interval
    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.querySelector('.timer p').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeLeft--;

        // Add color changing functionality
        if (timeLeft <= 120) { // 2 minutes
            document.querySelector('.circle').style.background = 'red';
        } else if (timeLeft <= 240) { // 4 minutes
            document.querySelector('.circle').style.background = 'darkorange';
        } else if (timeLeft <= 360) { // 6 minutes
            document.querySelector('.circle').style.background = 'orange';
        } else if (timeLeft <= 480) { // 8 minutes
            document.querySelector('.circle').style.background = 'blue';
        } else {
            document.querySelector('.circle').style.background = 'green'; // default color
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(holdLeaveInterval);
            speakText('Guided meditation session has ended!');
            document.querySelector('#mera').textContent = 'RELEASE';
        }
    }, 1000);

    // Hold/Leave interval
    holdLeaveInterval = setInterval(() => {
        if (isHold) {
            document.querySelector('#mera').textContent = 'LEAVE';
            speakText('LEAVE your breath');
        } else {
            document.querySelector('#mera').textContent = 'HOLD';
            speakText('HOLD your breath');
        }
        isHold = !isHold;
    }, 10000); // Change every 10 seconds
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}
startTimer()

function playmyaudio(){
    const audioElement = document.getElementById('beach-audio');
    const playButton = document.querySelector(".start");
    playButton.addEventListener('click', () => {
    audioElement.play();
    })
}
playmyaudio()