// Available colors for the marbles
const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
let secretCode = [];
let currentGuess = [];
let guessHistory = [];  // To store past guesses and feedback


// Randomly generate the secret code of 6 marbles
function generateSecretCode() {
    for (let i = 0; i < 6; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        secretCode.push(randomColor);
    }
    console.log("Secret Code:", secretCode);  // For debugging purposes
}

// Create marbles for the player to choose from
function createGuessOptions() {
    const guessContainer = document.getElementById('guess-container');

    // Display available marbles only if less than 6 marbles have been selected
    if (currentGuess.length < 6) {
        colors.forEach(color => {
            const marble = document.createElement('div');
            marble.classList.add('marble', color);
            marble.addEventListener('click', () => {
                if (currentGuess.length < 6) {
                    currentGuess.push(color);
                    displayCurrentGuess();  // Update guess display
                    if (currentGuess.length === 6) {
                        document.getElementById('submit-guess').disabled = false;
                    }
                }
            });
            guessContainer.appendChild(marble);
        });
    }
}

// Display guess history with feedback
function displayGuessHistory() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = '';  // Clear previous history

    guessHistory.forEach((entry, index) => {
        const row = document.createElement('div');
        row.classList.add('history-row');

        // Display guessed marbles
        entry.guess.forEach(color => {
            const marble = document.createElement('div');
            marble.classList.add('marble', color);
            marble.classList.add(color);
            row.appendChild(marble);
        });

        // Display feedback
        const feedback = document.createElement('div');
        feedback.classList.add('feedback');
        feedback.textContent = `Exact: ${entry.exactMatches}, Close: ${entry.colorMatches}`;
        row.appendChild(feedback);

        historyContainer.appendChild(row);
    });
}

// Display the current guess
function displayCurrentGuess() {
    const pacContainer = document.getElementById('pac-container');
    const guessContainer = document.getElementById('guess-container');
    guessContainer.innerHTML = '';  // Clear the previous display
    pacContainer.innerHTML = '';  // Clear the previous display

    // Display the current guess so far
    currentGuess.forEach(color => {
        const marble = document.createElement('div');
        marble.classList.add('marble', color);
        marble.classList.add(color);
        pacContainer.appendChild(marble);
    });

    // Display available color options as well
    createGuessOptions();
}


// Check the current guess against the secret code and give feedback
function checkGuess() {
    let exactMatches = 0; // Black pegs
    let colorMatches = 0; // White pegs

    const secretCopy = [...secretCode];
    const guessCopy = [...currentGuess];

    // First pass: Check for correct color in the correct position
    for (let i = 0; i < 6; i++) {
        if (guessCopy[i] === secretCopy[i]) {
            exactMatches++;
            secretCopy[i] = guessCopy[i] = null; // Remove matched marbles
        }
    }

    // Second pass: Check for correct color in the wrong position
    for (let i = 0; i < 6; i++) {
        if (guessCopy[i] && secretCopy.includes(guessCopy[i])) {
            colorMatches++;
            secretCopy[secretCopy.indexOf(guessCopy[i])] = null;
        }
    }

    return { exactMatches, colorMatches };
}

// Handle the submission of a guess
document.getElementById('submit-guess').addEventListener('click', () => {
    if (currentGuess.length === 6) {
        const feedback = checkGuess();

        // Store the current guess and feedback in the history
        guessHistory.push({
            guess: [...currentGuess],
            exactMatches: feedback.exactMatches,
            colorMatches: feedback.colorMatches
        });

        displayGuessHistory(); 

        document.getElementById('feedback').textContent = `You have ${feedback.exactMatches} exact matches and ${feedback.colorMatches} color matches!`;


        if (feedback.exactMatches === 6) {
            alert('Felicidades Mariel! Has descubierto el codigo correcto!');
            document.getElementById('next-clue').style.display = ''
        }

        // Reset for the next guess
        currentGuess = [];
        document.getElementById('submit-guess').disabled = true;
        createGuessOptions();  // Recreate the guessing options
    }
});

// Initialize the game
generateSecretCode();
createGuessOptions();
