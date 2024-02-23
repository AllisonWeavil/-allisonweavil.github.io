var scores = {
    wins: 0,
    losses: 0,
    ties: 0
};

function playerChoice(choice, element) {
    // Reset outline for all PC images
    var playerImages = document.querySelectorAll("#player-choice img");
    playerImages.forEach(img => img.classList.remove('selected'));

    // Add red outline to picked PC image
    element.classList.add('selected');

    var choices = ['rock', 'paper', 'scissors'];
    var shuffleInterval = 500; // Set shuffle time to 0.5 seconds
    var shuffleDuration = 3000; // Set shuffle duration to 3 seconds
    var finalComputerChoice = shuffleAndPick(choices, shuffleInterval, shuffleDuration);

    // Reset outline for computer image
    document.getElementById('computer-image').classList.remove('selected');

    // Shuffle with the time and duration
    var index = 0;
    var shuffleTimer = setInterval(function () {
        document.getElementById('computer-image').src = choices[index] + '.png';
        index++;

        if (index >= choices.length) {
            index = 0;
        }
    }, shuffleInterval);

    //  Stop shuffling and display choice
    setTimeout(function () {
        clearInterval(shuffleTimer);
        document.getElementById('computer-image').src = finalComputerChoice + '.png';
        document.getElementById('computer-image').classList.add('selected');

        var result = "";

        if (choice === finalComputerChoice) {
            result = "It's a tie!";
            scores.ties++;
        } else if (
            (choice === 'rock' && finalComputerChoice === 'scissors') ||
            (choice === 'paper' && finalComputerChoice === 'rock') ||
            (choice === 'scissors' && finalComputerChoice === 'paper')
        ) {
            result = "You win!";
            scores.wins++;
        } else {
            result = "You lose!";
            scores.losses++;
        }

        updateScoreboard();
        document.getElementById('result').innerHTML = result;
        document.getElementById('outcome').classList.add('show');
    }, shuffleDuration);
}

function shuffleAndPick(choices, shuffleInterval, shuffleDuration) {
    var shuffledChoices = choices.slice();

    // Shuffle array at the spacific time until the duration is reached
    var startTime = Date.now();
    var shuffleTimer = setInterval(function () {
        // Calculate time
        var elapsedTime = Date.now() - startTime;

        // If duration is reached, stop shuffling
        if (elapsedTime >= shuffleDuration) {
            clearInterval(shuffleTimer);
        }

        // Shuffle array for each iteration
        for (let j = shuffledChoices.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [shuffledChoices[j], shuffledChoices[k]] = [shuffledChoices[k], shuffledChoices[j]];
        }
    }, shuffleInterval);

    // Pick first choice after shuffling
    return shuffledChoices[0];
}

function updateScoreboard() {
    document.getElementById('win-count').textContent = scores.wins;
    document.getElementById('loss-count').textContent = scores.losses;
    document.getElementById('tie-count').textContent = scores.ties;
}

function resetGame() {
    // Reset outline for all PC images
    var playerImages = document.querySelectorAll("#player-choice img");
    playerImages.forEach(img => img.classList.remove('selected'));

    // Reset outline for computer image
    document.getElementById('computer-image').classList.remove('selected');

    document.getElementById('computer-image').src = 'question-mark.png';
    document.getElementById('result').innerHTML = '';
    document.getElementById('outcome').classList.remove('show');
}

function resetScoreboard() {
    scores = {
        wins: 0,
        losses: 0,
        ties: 0
    };
    updateScoreboard();
}