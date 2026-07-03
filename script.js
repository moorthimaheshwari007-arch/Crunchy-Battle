// ===============================
// Crunchy Battle - script.js
// ===============================

// Player Data
const player = {
    id: "CB" + Math.floor(Math.random() * 1000000),
    name: "Guest",
    coins: 999999,
    gems: 999999,
    level: 1
};

// Run when page loads
window.onload = function () {

    // Welcome text
    const welcome = document.getElementById("welcome");
    if (welcome) {
        const savedName = localStorage.getItem("playerName");
        if (savedName) {
            player.name = savedName;
        }
        welcome.innerHTML = "Welcome " + player.name;
    }

    // Player ID
    const id = document.getElementById("playerid");
    if (id) {
        id.innerHTML = "Player ID : " + player.id;
    }
};

// Login
function login() {

    const name = document.getElementById("name").value;

    if (name === "") {
        alert("Please enter your player name.");
        return;
    }

    localStorage.setItem("playerName", name);

    window.location = "index.html";
}

// Play Button
function playGame() {
    alert("Battle mode is coming soon!");
}

// Help Button
function showHelp() {
    alert(
`HOW TO PLAY

1. Login
2. Press PLAY
3. Jump from the moving train
4. Find weapons
5. Defeat enemies
6. Be the last survivor`
    );
}

// Profile
function showProfile() {
    alert(
`PLAYER PROFILE

Name : ${player.name}

ID : ${player.id}

Level : ${player.level}

Coins : ${player.coins}

Gems : ${player.gems}`
    );
}
