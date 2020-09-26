function load_images() {
    //player,virus,gem
    virus_img = new Image;
    virus_img.src = "Assets/v1.png";

    player_img = new Image;
    player_img.src = "Assets/superhero.png";

    gem_img = new Image;
    gem_img.src = "Assets/gem.svg";
}


function init() {
    canvas = document.getElementById("mycanvas");
    canvas.width = w = 700;
    canvas.height = h = 400;
    game_over = false;
    score = 0;

    pen = canvas.getContext('2d');

    virus1 = {
        x: 100,
        y: 50,
        w: 60,
        h: 50,
        speed: 15
    };

    virus2 = {
        x: 300,
        y: 50,
        w: 60,
        h: 50,
        speed: 25
    };

    virus3 = {
        x: 500,
        y: 50,
        w: 60,
        h: 50,
        speed: 35
    };

    player = {
        x: 20,
        y: h / 2,
        w: 60,
        h: 50,
        speed: 20,
        moving: false,
    };

    gem = {
        x: w - 70,
        y: h / 2,
        w: 60,
        h: 50,
    };

    virus_array = [virus1, virus2, virus3];

    //add event listeners
    canvas.addEventListener('mousedown', () => {
        console.log("mouse pressed!");
        player.moving = true;
    });

    canvas.addEventListener('mouseup', () => {
        console.log("mouse up!");
        player.moving = false;
    });
}

collision_detection = (rect1, rect2) => {

    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
        // collision detected!
        return true;
    }

    return false;
}

function draw() {
    pen.clearRect(0, 0, w, h);
    pen.fillStyle = "red";
    // pen.fillRect(box.x,box.y,box.w,box.h);
    // pen.drawImage(virus_img,box.x,box.y,box.w,box.h);
    for (let i = 0; i < virus_array.length; i++) {
        pen.drawImage(virus_img, virus_array[i].x, virus_array[i].y, virus_array[i].w, virus_array[i].h);
    }

    pen.drawImage(player_img, player.x, player.y, player.w, player.h);
    pen.drawImage(gem_img, gem.x, gem.y, gem.w, gem.h);
    pen.fillStyle = "white";
    pen.fillText("Score: " + score , 10, 10, 100);
}

function update() {

    if (collision_detection(player, gem)) {
        alert("You Won!");
        game_over = true;
        // return;
    }

    for (let i = 0; i < virus_array.length; i++) {
        if (collision_detection(player, virus_array[i])) {
            alert("Game Over, You lost!");
            game_over = true;
        }
    }

    if (player.moving) {
        player.x += player.speed;
        score++;
    }

    for (let i = 0; i < virus_array.length; i++) {
        virus_array[i].y += virus_array[i].speed;
        if (virus_array[i].y > h - virus_array[i].h || virus_array[i].y < 0) {
            virus_array[i].speed *= -1;
        }
    }
}

function gameloop() {
    if (game_over) {
        clearInterval(f);
    }
    draw();
    update();
    console.log("in game loop");
}

load_images();
init();
var f = setInterval(gameloop, 100);