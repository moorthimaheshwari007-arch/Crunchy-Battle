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

let gunType = 1;

new Phaser.Game(config);

// ---------------- PRELOAD ----------------
function preload() {
    this.load.image("player", "https://i.imgur.com/3e5R5Yv.png");
    this.load.image("enemy", "https://i.imgur.com/OdL0XPt.png");
    this.load.image("bullet", "https://i.imgur.com/9Qx5QZy.png");
    this.load.image("boss", "https://i.imgur.com/8Q1ZQZy.png");

    // 🔊 SOUND (ONLINE LINKS)
    this.load.audio("shoot", "https://assets.mixkit.co/sfx/preview/mixkit-laser-gun-shot-2810.mp3");
    this.load.audio("hit", "https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-explosion-2759.mp3");
    this.load.audio("bg", "https://assets.mixkit.co/music/preview/mixkit-action-game-loop-2975.mp3");
}

// ---------------- CREATE ----------------
function create() {

    // 🌍 BIG MAP
    this.add.rectangle(500, 300, 3000, 2000, 0x145a32);

    // TRAIN INTRO
    let train = this.add.rectangle(-300, 500, 300, 60, 0x333333);

    this.tweens.add({
        targets: train,
        x: 400,
        duration: 2000,
        onComplete: () => {
            this.add.text(350, 260, "JUMP!", {
                fontSize: "20px",
                fill: "#ff0000"
            });

            this.tweens.add({ targets: train, x: 1200, duration: 1500 });
        }
    });

    // 🔊 BACKGROUND MUSIC
    this.sound.add("bg", { loop: true, volume: 0.3 }).play();

    // PLAYER
    player = this.physics.add.sprite(500, 500, "player").setScale(0.12);
    player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(player);
    this.physics.world.setBounds(0, 0, 3000, 2000);

    enemies = this.physics.add.group();
    bullets = this.physics.add.group();

    // ENEMY AI
    for (let i = 0; i < 10; i++) {
        let e = enemies.create(300 + i * 200, 300, "enemy").setScale(0.1);
        e.hp = 30;
        e.dir = Math.random() * Math.PI * 2;
    }

    // BOSS
    boss = this.physics.add.sprite(2500, 400, "boss").setScale(0.2);
    boss.hp = 250;

    cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown-SPACE", shoot, this);

    // 📱 SHOOT BUTTON
    let shootBtn = this.add.text(850, 520, "SHOOT", {
        fontSize: "22px",
        backgroundColor: "#ff0000",
        color: "#fff",
        padding: { x: 10, y: 5 }
    }).setScrollFactor(0).setInteractive();

    shootBtn.on("pointerdown", shoot, this);

    // 📱 GUN BUTTON
    let gunBtn = this.add.text(750, 520, "GUN", {
        fontSize: "22px",
        backgroundColor: "#ff9800",
        color: "#000",
        padding: { x: 10, y: 5 }
    }).setScrollFactor(0).setInteractive();

    gunBtn.on("pointerdown", switchGun);

    // ❤️ HEALTH BAR
    this.add.rectangle(150, 20, 200, 20, 0x000000).setScrollFactor(0);
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

    // ENEMY AI
    enemies.children.iterate(function (e) {
        if (!e) return;

        e.x += Math.cos(e.dir) * 1.3;
        e.y += Math.sin(e.dir) * 1.3;

        if (Math.random() < 0.01) {
            e.dir = Math.random() * Math.PI * 2;
        }
    });

    // HEALTH BAR UPDATE
    hpBar.width = hp * 2;
}

// ---------------- SHOOT ----------------
function shoot() {

    this.sound.play("shoot");

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

    this.sound.play("hit");

    bullet.destroy();
    enemy.hp -= 10;
    if (enemy.hp <= 0) enemy.destroy();
}

// ---------------- BOSS HIT ----------------
function hitBoss(bullet, bossObj) {

    this.sound.play("hit");

    bullet.destroy();
    bossObj.hp -= 5;

    if (bossObj.hp <= 0) {
        bossObj.destroy();
        alert("BOSS DEFEATED!");
    }
}
