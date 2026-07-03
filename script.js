const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 500,
    physics: {
        default: "arcade",
        arcade: { debug: false }
    },
    scene: { preload, create, update }
};

let player;
let enemies;
let bullets;
let boss;
let cursors;

let hp = 100;
let hpText;
let gunType = 1;

new Phaser.Game(config);

// ---------------- PRELOAD ----------------
function preload() {
    this.load.image("player", "https://i.imgur.com/3e5R5Yv.png");
    this.load.image("enemy", "https://i.imgur.com/OdL0XPt.png");
    this.load.image("bullet", "https://i.imgur.com/9Qx5QZy.png");
    this.load.image("boss", "https://i.imgur.com/8Q1ZQZy.png");
}

// ---------------- CREATE ----------------
function create() {

    // PLAYER
    player = this.physics.add.sprite(450, 400, "player").setScale(0.12);

    // GROUPS
    enemies = this.physics.add.group();
    bullets = this.physics.add.group();

    // MAP (simple ground)
    let ground = this.add.rectangle(450, 490, 900, 20, 0x00aa00);

    // ENEMIES
    for (let i = 0; i < 6; i++) {
        let e = enemies.create(100 + i * 120, 150, "enemy").setScale(0.1);
        e.hp = 30;
    }

    // BOSS
    boss = this.physics.add.sprite(800, 120, "boss").setScale(0.2);
    boss.hp = 200;

    cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown-SPACE", shoot, this);
    this.input.keyboard.on("keydown-Q", switchGun);

    hpText = this.add.text(10, 10, "HP: 100", {
        fontSize: "20px",
        fill: "#ffffff"
    });

    // COLLISIONS
    this.physics.add.overlap(bullets, enemies, hitEnemy, null, this);
    this.physics.add.overlap(bullets, boss, hitBoss, null, this);

    // TRAIN INTRO (simple effect)
    this.add.text(300, 220, "TRAIN DROP START!", {
        fontSize: "25px",
        fill: "#ff0000"
    });

    setTimeout(() => {
        this.add.text(320, 250, "SURVIVE!", { fontSize: "20px", fill: "#fff" });
    }, 2000);
}

// ---------------- UPDATE ----------------
function update() {

    player.setVelocity(0);

    if (cursors.left.isDown) player.setVelocityX(-200);
    if (cursors.right.isDown) player.setVelocityX(200);
    if (cursors.up.isDown) player.setVelocityY(-200);
    if (cursors.down.isDown) player.setVelocityY(200);

    hpText.setText("HP: " + hp);
}

// ---------------- SHOOT ----------------
function shoot() {

    let bullet = bullets.create(player.x, player.y, "bullet").setScale(0.05);

    let speed = gunType === 1 ? 400 : 700;

    bullet.setVelocityX(speed);

    setTimeout(() => bullet.destroy(), 2000);
}

// ---------------- SWITCH GUN ----------------
function switchGun() {
    gunType = gunType === 1 ? 2 : 1;
    alert(gunType === 1 ? "Rifle selected" : "Sniper selected");
}

// ---------------- ENEMY HIT ----------------
function hitEnemy(bullet, enemy) {
    bullet.destroy();
    enemy.hp -= 10;

    if (enemy.hp <= 0) {
        enemy.destroy();
    }
}

// ---------------- BOSS HIT ----------------
function hitBoss(bullet, bossObj) {
    bullet.destroy();
    bossObj.hp -= 5;

    if (bossObj.hp <= 0) {
        bossObj.destroy();
        alert("BOSS DEFEATED!");
    }
}
