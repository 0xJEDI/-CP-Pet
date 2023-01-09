document.addEventListener('DOMContentLoaded', function() {
    setupForm();
});

function setupForm() {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', displayPetDetails);
}

function displayPetDetails() {
    const petName = document.getElementById('petName').value;
    const petType = document.getElementById('petType').value;

    document.getElementById('name').innerHTML = `NAME: ${petName}`;
    document.getElementById('type').innerHTML = `TYPE: ${petType}`;

    if (petName === "") {
        document.getElementById('cmdTXT').innerHTML = `Please fill out all fields`;
        return;
    } else {
        document.getElementById('imgPet').setAttribute('src', `a/img/type/${petType.toLowerCase()}.png`);
    }

    switch (petType) {
        case "Dog":
            petAnimal = "Dog";
            break
        case "Cat":
            petAnimal = "Cat";
            break
    }

    const submitButton = document.getElementById('submitButton');
    const petNameInput = document.getElementById('petName');
    const petTypeInput = document.getElementById('petType');
    submitButton.disabled = true;
    petNameInput.disabled = true;
    petTypeInput.disabled = true;

    startPetGame();
}

let stats = {
    happiness: 31,
    thirst: 100,
    cleaniness: 100,
    hunger: 100
};
let maxStatValue = 100;
let gameOver = false;

function startPetGame() {
    updateStatDisplays();
    startTimeLoop();
    document.getElementById('cmdTXT').innerHTML = '[PET] YOUR GAME HAS STARTED GOOD LUCK!!';

    document.getElementById('btnPlay').addEventListener('click', btnClickPlay);
    document.getElementById('btnDrink').addEventListener('click', btnClickDrink);
    document.getElementById('btnClean').addEventListener('click', btnClickClean);
    document.getElementById('btnFeed').addEventListener('click', btnClickFeed);
}

function updateStatDisplays() {
    document.getElementById('stHappiness').innerHTML = `Happiness: ${stats.happiness}`;
    document.getElementById('stThirst').innerHTML = `Thirst: ${stats.thirst}`;
    document.getElementById('stCleaniness').innerHTML = `Cleaniness: ${stats.cleaniness}`;
    document.getElementById('stHunger').innerHTML = `Hunger: ${stats.hunger}`;
}

function changePetImage() {
    if (petAnimal === "Dog") {
        if (stats.happiness < 30 || stats.thirst < 30 || stats.cleaniness < 30 || stats.hunger < 30) {
            document.getElementById('imgPet').setAttribute('src', 'a/img/type/sad_dog.png');
            document.getElementById('cmdTXT').innerHTML = '[PET] Your Pet is feeling quite down!';
        } else {
            document.getElementById('imgPet').setAttribute('src', 'a/img/type/dog.png');
        }
    } else {
        if (stats.happiness < 30 || stats.thirst < 30 || stats.cleaniness < 30 || stats.hunger < 30) {
            document.getElementById('imgPet').setAttribute('src', 'a/img/type/sad_cat.png');
            document.getElementById('cmdTXT').innerHTML = '[PET] Your Pet is feeling quite down!';
        }
    }
}

function startTimeLoop() {
    let interval = setInterval(function() {
        updateStatDisplays();
        changePetImage();
        stats.happiness = Math.max(stats.happiness - 1, 0);
        stats.thirst = Math.max(stats.thirst - 2, 0);
        stats.cleaniness = Math.max(stats.cleaniness - 1, 0);
        stats.hunger = Math.max(stats.hunger - 2, 0);

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
    }, 3000);

    function endGame() {
        gameOver = true;
        clearInterval(interval);
        dbAndButtons();
    }
}

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

function dbAndButtons() {
    document.getElementById("btnPlay").disabled = true;
    document.getElementById("btnDrink").disabled = true;
    document.getElementById("btnClean").disabled = true;
    document.getElementById("btnFeed").disabled = true;

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