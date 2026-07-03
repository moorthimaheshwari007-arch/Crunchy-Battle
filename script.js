const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
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
let hpBar;
let hpBg;
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

    // 🌍 BIG MAP
    this.add.rectangle(500, 300, 2000, 1200, 0x145a32);

    // OBSTACLES
    for (let i = 0; i < 10; i++) {
        this.add.rectangle(200 + i * 150, 200, 40, 120, 0x006400);
    }

    // PLAYER
    player = this.physics.add.sprite(500, 500, "player").setScale(0.12);
    player.setCollideWorldBounds(true);

    // CAMERA FOLLOWS PLAYER (BIG WORLD)
    this.cameras.main.startFollow(player);
    this.physics.world.setBounds(0, 0, 2000, 1200);
    player.setBoundsCollision(true);

    enemies = this.physics.add.group();
    bullets = this.physics.add.group();

    // ENEMY AI MOVEMENT
    for (let i = 0; i < 8; i++) {
        let e = enemies.create(300 + i * 200, 300, "enemy").setScale(0.1);
        e.hp = 30;

        e.direction = Math.random() * 2 * Math.PI;
    }

    // BOSS
    boss = this.physics.add.sprite(1700, 300, "boss").setScale(0.2);
    boss.hp = 200;

    cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown-SPACE", shoot, this);

    // 📱 MOBILE SHOOT BUTTON
    let shootBtn = this.add.text(850, 520, "SHOOT", {
        fontSize: "22px",
        backgroundColor: "#ff0000",
        color: "#ffffff",
        padding: { x: 10, y: 5 }
    }).setScrollFactor(0).setInteractive();

    shootBtn.on("pointerdown", shoot, this);

    // 📱 MOBILE GUN BUTTON
    let gunBtn = this.add.text(750, 520, "GUN", {
        fontSize: "22px",
        backgroundColor: "#ff9800",
        color: "#000",
        padding: { x: 10, y: 5 }
    }).setScrollFactor(0).setInteractive();

    gunBtn.on("pointerdown", switchGun);

    // ❤️ HEALTH BAR BACKGROUND
    hpBg = this.add.rectangle(150, 20, 200, 20, 0x000000).setScrollFactor(0);

    // ❤️ HEALTH BAR
    hpBar = this.add.rectangle(150, 20, 200, 20, 0xff0000).setScrollFactor(0);

    this.physics.add.overlap(bullets, enemies, hitEnemy, null, this);
    this.physics.add.overlap(bullets, boss, hitBoss, null, this);
}

// ---------------- UPDATE ----------------
function update() {

    player.setVelocity(0);

    if (cursors.left.isDown) player.setVelocityX(-250);
    if (cursors.right.isDown) player.setVelocityX(250);
    if (cursors.up.isDown) player.setVelocityY(-250);
    if (cursors.down.isDown) player.setVelocityY(250);

    // ENEMY AI MOVEMENT
    enemies.children.iterate(function (enemy) {
        if (!enemy) return;

        enemy.x += Math.cos(enemy.direction) * 1.5;
        enemy.y += Math.sin(enemy.direction) * 1.5;

        // change direction randomly
        if (Math.random() < 0.01) {
            enemy.direction = Math.random() * 2 * Math.PI;
        }
    });

    // UPDATE HEALTH BAR
    hpBar.width = hp * 2;
}

// ---------------- SHOOT ----------------
function shoot() {

    let bullet = bullets.create(player.x, player.y, "bullet").setScale(0.05);

    let speed = gunType === 1 ? 500 : 800;

    bullet.setVelocityX(speed);

    setTimeout(() => bullet.destroy(), 2000);
}

// ---------------- SWITCH GUN ----------------
function switchGun() {
    gunType = gunType === 1 ? 2 : 1;
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
