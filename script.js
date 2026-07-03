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
let cursors;

let hp = 100;
let hpBar;
let shootBtn;

new Phaser.Game(config);

// ---------------- PRELOAD ----------------
function preload() {
    this.load.image("player", "https://i.imgur.com/3e5R5Yv.png");
    this.load.image("enemy", "https://i.imgur.com/OdL0XPt.png");
    this.load.image("bullet", "https://i.imgur.com/9Qx5QZy.png");

    // SOUND
    this.load.audio("shoot", "https://assets.mixkit.co/sfx/preview/mixkit-laser-gun-shot-2810.mp3");
    this.load.audio("hit", "https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-explosion-2759.mp3");
    this.load.audio("bg", "https://assets.mixkit.co/music/preview/mixkit-action-game-loop-2975.mp3");
}

// ---------------- CREATE ----------------
function create() {

    // WORLD MAP
    this.add.rectangle(500, 300, 3000, 2000, 0x145a32);

    // BACKGROUND MUSIC
    this.sound.add("bg", { loop: true, volume: 0.3 }).play();

    // PLAYER
    player = this.physics.add.sprite(500, 500, "player").setScale(0.15);
    player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(player);
    this.physics.world.setBounds(0, 0, 3000, 2000);

    // ENEMIES
    enemies = this.physics.add.group();
    for (let i = 0; i < 10; i++) {
        let e = enemies.create(300 + i * 150, 300, "enemy").setScale(0.1);
        e.hp = 30;
    }

    // BULLETS
    bullets = this.physics.add.group();

    cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown-SPACE", shoot, this);

    // MOBILE SHOOT BUTTON
    shootBtn = this.add.text(850, 520, "SHOOT", {
        fontSize: "22px",
        backgroundColor: "#ff0000",
        color: "#fff",
        padding: { x: 10, y: 5 }
    }).setScrollFactor(0).setInteractive();

    shootBtn.on("pointerdown", shoot, this);

    // HEALTH BAR
    this.add.rectangle(150, 20, 200, 20, 0x000000).setScrollFactor(0);
    hpBar = this.add.rectangle(150, 20, 200, 20, 0xff0000).setScrollFactor(0);

    // COLLISION
    this.physics.add.overlap(bullets, enemies, hitEnemy, null, this);
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

        e.x += (player.x - e.x) * 0.004;
        e.y += (player.y - e.y) * 0.004;
    });

    // HEALTH BAR
    hpBar.width = hp * 2;
}

// ---------------- SHOOT ----------------
function shoot() {

    this.sound.play("shoot");

    let bullet = bullets.create(player.x, player.y, "bullet").setScale(0.05);

    bullet.setVelocityX(600);

    setTimeout(() => bullet.destroy(), 2000);
}

// ---------------- HIT ENEMY ----------------
function hitEnemy(bullet, enemy) {

    this.sound.play("hit");

    bullet.destroy();
    enemy.hp -= 10;

    if (enemy.hp <= 0) enemy.destroy();
}
