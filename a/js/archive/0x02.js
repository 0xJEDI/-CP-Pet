document.addEventListener('DOMContentLoaded', function() {
    setupForm();
});

/* SETUP */

function setupForm() {
    const submitBTN = document.getElementById('submitBTN');
    submitBTN.addEventListener('click', updatePetDetails);
}

function updatePetDetails() {
    const petName = document.getElementById('petName').value;
    const petType = document.getElementById('petType').value;

    document.getElementById('name').innerHTML = `NAME: ${petName}`;
    document.getElementById('type').innerHTML = `TYPE: ${petType}`;

    if (petName === "" || petType === "") {
        document.getElementById('cmdTXT').innerHTML = `Please fill out all fields`;
        return;
    }

    switch (petType) {
        case "Dog":
            document.getElementById('imgPet').setAttribute('src', 'a/img/type/dog.png');
            break;
        case "Cat":
            document.getElementById('imgPet').setAttribute('src', 'a/img/type/cat.png');
            break;
    }

    startPetGame();
    dbSumbit();
}

// Function to Disable the Sumbit Button
function dbSumbit(){
  // Disable the submit button
  const submitBTN = document.getElementById('submitBTN');
  submitBTN.disabled = true;

  const petType = document.getElementById('petType')
  petType.disabled = true;

  const petName = document.getElementById('petName')
  petName.disabled = true;
};


/* CONFIG */

// LOOP + END GAME
function startTimeLoop() {
    let interval = setInterval(function() {
        stats.happiness = Math.max(stats.happiness - 3, 0);
        updateStatDisplays();

        switch (true) {
            case stats.happiness <= 0:
                endGame();
                break;
        }
    }, 3000); // 3000ms is 3 Seconds

    function endGame(reason) {
        gameOver = true;
        clearInterval(interval);
        document.getElementById("cmdTXT").innerHTML = "GAME OVER";
    }
}

// STATS
function updateStatDisplays() {
    document.getElementById('stHappiness').innerHTML = `Happiness: ${stats.happiness}`;
}

// VARS
let stats = {happiness: 100};
let statsMax = 100;
let gameOver = false;

function startPetGame() {
    updateStatDisplays(); // STATS ON THE SCREEN
    startTimeLoop(); // TAKES AWAY STATS

    // Buttons
    document.getElementById('btnPlay').addEventListener('click', btnClick);
}

/* BUTTONS */

function btnClick() {
    if (stats.happiness < statsMax) {
        stats.happiness = Math.min(stats.happiness + 5, statsMax);
        updateStatDisplays();
    }
}