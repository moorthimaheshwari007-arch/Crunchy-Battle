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

    // MAP
    this.add.rectangle(450, 250, 900, 500, 0x1e3d2f);

    // OBSTACLES
    this.add.rectangle(200, 300, 40, 120, 0x006400);
    this.add.rectangle(700, 350, 40, 120, 0x006400);
    this.add.rectangle(500, 200, 120, 40, 0x654321);

    // TRAIN INTRO
    let train = this.add.rectangle(-200, 450, 250, 50, 0x333333);

    this.tweens.add({
        targets: train,
        x: 300,
        duration: 2000,
        ease: "Linear",
        onComplete: () => {
            this.add.text(320, 260, "JUMP!", {
                fontSize: "20px",
                fill: "#ff0000"
            });

            this.tweens.add({
                targets: train,
                x: 1100,
                duration: 1500
            });
        }
    });

    // PLAYER
    player = this.physics.add.sprite(450, 400, "player").setScale(0.12);

    enemies = this.physics.add.group();
    bullets = this.physics.add.group();

    // ENEMIES
    for (let i = 0; i < 6; i++) {
        let e = enemies.create(100 + i * 120, 120, "enemy").setScale(0.1);
        e.hp = 30;
    }

    // BOSS
    boss = this.physics.add.sprite(820, 100, "boss").setScale(0.2);
    boss.hp = 200;

    cursors = this.input.keyboard.createCursorKeys();

    // SHOOT (keyboard optional)
    this.input.keyboard.on("keydown-SPACE", shoot, this);

    // MOBILE GUN BUTTON
    let gunBtn = this.add.text(720, 20, "GUN", {
        fontSize: "20px",
        backgroundColor: "#ff9800",
        padding: { x: 10, y: 5 },
        color: "#000"
    }).setInteractive();

    gunBtn.on("pointerdown", switchGun);

    // HP UI
    hpText = this.add.text(10, 10, "HP: 100", {
        fontSize: "20px",
        fill: "#ffffff"
    });

    // COLLISION
    this.physics.add.overlap(bullets, enemies, hitEnemy, null, this);
    this.physics.add.overlap(bullets, boss, hitBoss, null, this);
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

    alert(gunType === 1 ? "Rifle Selected" : "Sniper Selected");
}

// ---------------- ENEMY HIT ----------------
function hitEnemy(bullet, enemy) {

    bullet.destroy();

    enemy.hp -= 10;

    if (enemy.hp <= 0) enemy.destroy();
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
