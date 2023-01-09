let petName;
let petType;

let stats = {
  happiness: 100
};


document.addEventListener('DOMContentLoaded', function() {
  setupForm();
});

function setupForm() {
  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', updatePetDetails);
}

function updatePetDetails() {
  petName = document.getElementById('petName').value;
  petType = document.getElementById('petType').value;

  if (petName === "" || petType === "") {
    alert("Please fill out all fields");
    return;
  }

  document.getElementById('name').innerHTML = `NAME: ${petName}`;
  document.getElementById('type').innerHTML = `TYPE: ${petType}`;

  if (petType === "Dog"){
    document.getElementById('imgPet').setAttribute('src', 'a/img/type/dog.png');
  } else if (petType === "Cat"){
    document.getElementById('imgPet').setAttribute('src', 'a/img/type/cat.png');
  }

  startPetGame();
}

function startPetGame() {
  document.getElementById('stHappiness').innerHTML = `Happiness: ${stats.happiness}`;
  document.getElementById('btnPlay').addEventListener('click', fnPlay);
}

function fnPlay(){
  stats.happiness -= 5;
  startPetGame()
  console.log("PLAY", stats.happiness)
}