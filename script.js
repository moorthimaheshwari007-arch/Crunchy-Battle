// Crunchy Battle

const player = {
    id: "CB" + Math.floor(Math.random() * 1000000),
    name: "Guest",
    coins: 999999,
    gems: 999999,
    level: 1
};

console.log("Welcome to Crunchy Battle!");
console.log("Player ID:", player.id);

function showHelp() {
    alert(
`HOW TO PLAY

1. Press PLAY
2. Join a match
3. Jump from the moving train
4. Find weapons
5. Defeat enemies
6. Be the last survivor`
    );
}

function playGame() {
    alert("Crunchy Battle is under development.");
}

function showProfile() {
    alert(
`PLAYER PROFILE

ID: ${player.id}
Name: ${player.name}
Level: ${player.level}
Coins: ${player.coins}
Gems: ${player.gems}`
    );
}
function login(){

let name=document.getElementById("name").value;

if(name==""){
alert("Enter your player name");
return;
}

localStorage.setItem("playerName",name);

window.location="index.html";

}
window.onload=function(){

let n=localStorage.getItem("playerName");

if(n){

document.getElementById("welcome").innerHTML="Welcome "+n;

}

}
