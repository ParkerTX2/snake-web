const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");

const gameOverScreen =
    document.getElementById("gameOverScreen");

const finalScore =
    document.getElementById("finalScore");

const restartButton =
    document.getElementById("restartButton");

const box = 20;

let snake;
let direction;
let score;
let food;
let game;


// --------------------
// INICIAR JUEGO
// --------------------

function iniciarJuego() {

    snake = [
        { x: 200, y: 200 }
    ];

    direction = "RIGHT";

    score = 0;

    scoreElement.textContent = score;

    food = crearComida();

    gameOverScreen.style.display = "none";

    clearInterval(game);

    game = setInterval(dibujar, 150);
}


// --------------------
// CONTROLES
// --------------------

document.addEventListener(
    "keydown",
    cambiarDireccion
);

function cambiarDireccion(event) {

    if (
        event.key === "ArrowLeft" &&
        direction !== "RIGHT"
    ) {
        direction = "LEFT";
    }

    if (
        event.key === "ArrowUp" &&
        direction !== "DOWN"
    ) {
        direction = "UP";
    }

    if (
        event.key === "ArrowRight" &&
        direction !== "LEFT"
    ) {
        direction = "RIGHT";
    }

    if (
        event.key === "ArrowDown" &&
        direction !== "UP"
    ) {
        direction = "DOWN";
    }
}


// --------------------
// CREAR COMIDA
// --------------------

function crearComida() {

    return {

        x:
            Math.floor(
                Math.random() * 20
            ) * box,

        y:
            Math.floor(
                Math.random() * 20
            ) * box
    };
}


// --------------------
// COLISIÓN
// --------------------

function colisionConCuerpo(
    cabeza,
    cuerpo
) {

    return cuerpo.some(parte =>

        cabeza.x === parte.x &&
        cabeza.y === parte.y

    );
}


// --------------------
// DIBUJAR JUEGO
// --------------------

function dibujar() {

    // Limpiar tablero

    ctx.fillStyle = "black";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Dibujar comida

    ctx.fillStyle = "red";

    ctx.fillRect(
        food.x,
        food.y,
        box - 2,
        box - 2
    );


    // Dibujar serpiente

    snake.forEach(
        (parte, index) => {

            ctx.fillStyle =
                index === 0
                    ? "lime"
                    : "green";

            ctx.fillRect(
                parte.x,
                parte.y,
                box - 2,
                box - 2
            );
        }
    );


    // Posición de la cabeza

    let headX = snake[0].x;
    let headY = snake[0].y;


    // Movimiento

    if (direction === "LEFT") {
        headX -= box;
    }

    if (direction === "RIGHT") {
        headX += box;
    }

    if (direction === "UP") {
        headY -= box;
    }

    if (direction === "DOWN") {
        headY += box;
    }


    const nuevaCabeza = {

        x: headX,
        y: headY

    };


    // --------------------
    // CHOQUE CON PAREDES
    // --------------------

    if (
        headX < 0 ||
        headX >= canvas.width ||
        headY < 0 ||
        headY >= canvas.height
    ) {

        terminarJuego();

        return;
    }


    // --------------------
    // CHOQUE CON CUERPO
    // --------------------

    if (
        colisionConCuerpo(
            nuevaCabeza,
            snake
        )
    ) {

        terminarJuego();

        return;
    }


    // --------------------
    // COMER
    // --------------------

    if (
        nuevaCabeza.x === food.x &&
        nuevaCabeza.y === food.y
    ) {

        score++;

        scoreElement.textContent =
            score;

        food = crearComida();

    } else {

        snake.pop();

    }


    // Agregar nueva cabeza

    snake.unshift(
        nuevaCabeza
    );

}


// --------------------
// GAME OVER
// --------------------

function terminarJuego() {

    clearInterval(game);

    finalScore.textContent =
        score;

    gameOverScreen.style.display =
        "flex";
}


// --------------------
// BOTÓN REINICIAR
// --------------------

restartButton.addEventListener(
    "click",
    iniciarJuego
);


// --------------------
// ARRANCAR JUEGO
// --------------------

iniciarJuego();