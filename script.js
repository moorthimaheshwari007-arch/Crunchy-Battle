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
let cursors;

let hp = 100;
let hpBar;

new Phaser.Game(config);

// ---------------- PRELOAD ----------------
function preload() {
    this.load.image("player", "https://i.imgur.com/3e5R5Yv.png");
    this.load.image("enemy", "https://i.imgur.com/OdL0XPt.png");
}

// ---------------- CREATE ----------------
function create() {

    // WORLD MAP
    this.add.rectangle(500, 300, 3000, 2000, 0x1f7a1f);

    // PLAYER
    player = this.physics.add.sprite(500, 500, "player").setScale(0.15);
    player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(player);
    this.physics.world.setBounds(0, 0, 3000, 2000);

    // ENEMIES
    enemies = this.physics.add.group();

    for (let i = 0; i < 8; i++) {
        let e = enemies.create(300 + i * 200, 300, "enemy").setScale(0.1);
        e.speed = 1 + Math.random();
    }

    cursors = this.input.keyboard.createCursorKeys();

    // HEALTH BAR BACKGROUND
    this.add.rectangle(150, 20, 200, 20, 0x000000).setScrollFactor(0);

    // HEALTH BAR
    hpBar = this.add.rectangle(150, 20, 200, 20, 0xff0000).setScrollFactor(0);
}

// ---------------- UPDATE ----------------
function update() {

    player.setVelocity(0);

    if (cursors.left.isDown) player.setVelocityX(-250);
    if (cursors.right.isDown) player.setVelocityX(250);
    if (cursors.up.isDown) player.setVelocityY(-250);
    if (cursors.down.isDown) player.setVelocityY(250);

    // SIMPLE ENEMY AI (FOLLOW PLAYER)
    enemies.children.iterate(function (e) {
        if (!e) return;

        e.x += (player.x - e.x) * 0.005;
        e.y += (player.y - e.y) * 0.005;
    });

    // HEALTH BAR UPDATE
    hpBar.width = hp * 2;
}
