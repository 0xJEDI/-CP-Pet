/*
    - CYBERPET - V: 0x05
*/

// When the DOM is fully loaded, Call setupForm()
document.addEventListener('DOMContentLoaded', function() {
    setupForm();
});

/* SETUP FORM */
// Event Listener To Display The Pets Details (displayPetDetails)

function setupForm() {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', displayPetDetails);
}

/* Display Pet Details */
// startPetGame() - Starts the Game

function displayPetDetails() {
    // Sets the Input Value Boxes
    const petName = document.getElementById('petName').value;
    const petType = document.getElementById('petType').value;

    // Updates The Name, Type and Image 
    document.getElementById('name').innerHTML = `NAME: ${petName}`;
    document.getElementById('type').innerHTML = `TYPE: ${petType}`;

    // IF Statement for Empty Name | Sets Image
    if (petName === "") {
        document.getElementById('cmdTXT').innerHTML = `Please fill out all fields`;
        return;
    } else {
        document.getElementById('imgPet').setAttribute('src', `a/img/type/${petType.toLowerCase()}.png`);
    }

    // Sets Animal Var (Helps with CMD LIne)
    switch (petType) {
        case "Dog":
            petAnimal = "Dog";
            break
        case "Cat":
            petAnimal = "Cat";
            break
    }

    // Disables User Input
    const submitButton = document.getElementById('submitButton');
    const petNameInput = document.getElementById('petName');
    const petTypeInput = document.getElementById('petType');
    submitButton.disabled = true;
    petNameInput.disabled = true;
    petTypeInput.disabled = true;

    startPetGame();
}

/* CONFIG */
// VARS - Stats, Max Stat, Game Over 

let stats = {
    happiness: 100,
    thirst: 100,
    cleaniness: 100,
    hunger: 100
};
let maxStatValue = 100;
let gameOver = false;

/* Starts the CyberPet Game */
// updateStatDisplays() - This is Used to Display the Stats Value
// startTimeLoop() - This is Used to Start the Loop and End Game Function
// Events - These are used for the Buttons btnPlay, btnDrink, btnClean, btnFeed

function startPetGame() {
    updateStatDisplays();
    startTimeLoop();
    document.getElementById('cmdTXT').innerHTML = '[PET] YOUR GAME HAS STARTED GOOD LUCK!!';

    // Events for Buttons
    document.getElementById('btnPlay').addEventListener('click', btnClickPlay);
    document.getElementById('btnDrink').addEventListener('click', btnClickDrink);
    document.getElementById('btnClean').addEventListener('click', btnClickClean);
    document.getElementById('btnFeed').addEventListener('click', btnClickFeed);
}

/* STATS DISPLAY */
// stHappiness - Displays the Happiness HP
// stThirst - Displays the Thirst HP
// stCleaniness - Displays the Cleaniness HP
// stHunger - Displays the Hunger HP

function updateStatDisplays() {
    document.getElementById('stHappiness').innerHTML = `Happiness: ${stats.happiness}`;
    document.getElementById('stThirst').innerHTML = `Thirst: ${stats.thirst}`;
    document.getElementById('stCleaniness').innerHTML = `Cleaniness: ${stats.cleaniness}`;
    document.getElementById('stHunger').innerHTML = `Hunger: ${stats.hunger}`;
}

/* Time Loop*/
// let interval = setInterval - Sets the Interval Followed by the Time: 3000ms
// stat.x = Math.max(stats.x - 2, 0); - The Stat (X can be Any) will be Decreased by an Amount, of a max of 0
// updateStatDisplays() - This is Used to Display the Stats Value
// Switch(True) - If stats.x is equal or lesser than 0 then (EndGame)
// End Game (Set gameOver to True, Ends Loop, Sets Game Over Text, Disables the Buttons)

function startTimeLoop() {
    let interval = setInterval(function() {
        stats.happiness = Math.max(stats.happiness - 1, 0);
        stats.thirst = Math.max(stats.thirst - 2, 0);
        stats.cleaniness = Math.max(stats.cleaniness - 1, 0);
        stats.hunger = Math.max(stats.hunger - 2, 0);

        updateStatDisplays();

        switch (true) {
            case stats.happiness <= 0:
                document.getElementById('cmdTXT').innerHTML = '[PET] Your Pet has Ran Away! Due to Bordem';
                endGame();
                break
            case stats.thirst <= 0:
                document.getElementById('cmdTXT').innerHTML = '[PET] Your pet was so thirsty! It jumped in a pond of water and drown :(';
                endGame();
                break
            case stats.cleaniness <= 0:
                document.getElementById('cmdTXT').innerHTML = '[PET] Your Pet was so Dirty, It had a New Disease called Doggocat-19!';
                endGame();
                break
            case stats.hunger <= 0:
                document.getElementById('cmdTXT').innerHTML = '[PET] You let your pet strave, Youre a bad person!';
                endGame();
                break
            default:
                return
        }
    }, 3000); // 3000ms is 3 Seconds

    function endGame() {
        gameOver = true;
        clearInterval(interval);
        dbAndButtons();
    }
}

/* BUTTONS */
// Btnclickplay() - Increases Happiness, Decreases Hunger And Thirst.
// Btnclickdrink() - Increases Thirst.
// Btnclickclean() - Increases Cleanliness.
// Btnclickfeed() - Increases Hunger, Decreases Thirst.

function btnClickPlay() {
    if (stats.happiness < maxStatValue) {
        stats.happiness = Math.min(stats.happiness + 5, maxStatValue);
        stats.thirst = Math.max(stats.thirst - 1, 0);
        stats.hunger = Math.max(stats.hunger - 1, 0);
        updateStatDisplays();

        if (petAnimal === "Dog") {
            document.getElementById('cmdTXT').innerHTML = `[PET] BAR-BARK!!!`;
        } else {
            document.getElementById("cmdTXT").innerHTML = `[PET] Purr!!`;
        }
    }
}

function btnClickDrink() {
    if (stats.thirst < maxStatValue) {
        stats.thirst = Math.min(stats.thirst + 5, maxStatValue);
        updateStatDisplays();

        if (petAnimal === "Dog") {
            document.getElementById('cmdTXT').innerHTML = `[PET] BARK!!!`;
        } else {
            document.getElementById("cmdTXT").innerHTML = `[PET] Meow!`;
        }
    }
}

function btnClickClean() {
    if (stats.cleaniness < maxStatValue) {
        stats.cleaniness = Math.min(stats.cleaniness + 5, maxStatValue);
        updateStatDisplays();
        if (petAnimal === "Dog") {
            document.getElementById('cmdTXT').innerHTML = `[PET] BARK BARK!!!`;
        } else {
            document.getElementById("cmdTXT").innerHTML = `[PET] Pur!`;
        }
    }
}

function btnClickFeed() {
    if (stats.hunger < maxStatValue) {
        stats.hunger = Math.min(stats.hunger + 5, maxStatValue);
        stats.thirst = Math.max(stats.thirst - 1, 0);
        updateStatDisplays();
        if (petAnimal === "Dog") {
            document.getElementById('cmdTXT').innerHTML = `[PET] Woof`;
        } else {
            document.getElementById("cmdTXT").innerHTML = `[PET] Meow`;
        }
    }
}

/* EXTRA BUTTONS */
//    dbAndButtons() - This Disables the Buttons Listed, these are used to Feed, Play, Drink, Wash
//    restartBtn() - Adds a Restart Button to the Page on Animal Death

function dbAndButtons() {
    // Disable User Input
    document.getElementById("btnPlay").disabled = true;
    document.getElementById("btnDrink").disabled = true;
    document.getElementById("btnClean").disabled = true;
    document.getElementById("btnFeed").disabled = true;

    // Displays Button
    restartBtn();
};

function restartBtn() {
    const restartButton = document.createElement("button");
    restartButton.innerHTML = "Restart";
    restartButton.id = "btnRestartPage";
    document.body.appendChild(restartButton);

    restartButton.addEventListener("click", () => {
        location.reload();
    });
};