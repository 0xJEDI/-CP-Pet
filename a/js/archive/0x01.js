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
}

/* MAIN GAME */

let stats = {
    happiness: 100,
    thirst: 100,
    cleaniness: 100,
    hunger: 100
};

function startPetGame() {
    // Displays
    document.getElementById('stHappiness').innerHTML = `Happiness: ${stats.happiness}`;
    document.getElementById('stThirst').innerHTML = `Thirst: ${stats.thirst}`;
    document.getElementById('stCleaniness').innerHTML = `Cleaniness: ${stats.cleaniness}`;
    document.getElementById('stHunger').innerHTML = `Hunger: ${stats.hunger}`;

    // Buttons
    document.getElementById('btnPlay').addEventListener('click', function() {
      stats.happiness -= 5;
      document.getElementById('stHappiness').innerHTML = `Happiness: ${stats.happiness}`;
    });

    document.getElementById('btnDrink').addEventListener('click', function() {
      stats.thirst -= 5;
      document.getElementById('stThirst').innerHTML = `Thirst: ${stats.thirst}`;
    });

    document.getElementById('btnClean').addEventListener('click', function() {
      stats.cleaniness -= 5;
      document.getElementById('stCleaniness').innerHTML = `Cleaniness: ${stats.cleaniness}`;
    });

    document.getElementById('btnFeed').addEventListener('click', function() {
      stats.hunger -= 5;
      document.getElementById('stHunger').innerHTML = `Hunger: ${stats.hunger}`;
    });
}
