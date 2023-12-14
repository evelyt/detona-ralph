const state =
{
    view: {
        // Elementos que alteram na tela
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector('#lives'),
    },
    values: {
        // timerId: null, 
        // gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 61,
        lives: 5,
    },
    actions: {
        // timerId tambem pode ser implementada dessa forma e nao precisaria da funcao moveEnemy() e nem da gameVelocity
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },

}

function playSong(audioName) {
    let song = new Audio(`./src/songs/${audioName}.m4a`);
    song.volume = 0.2;
    song.play();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("GAME OVER!!!\n"+"Seu tempo acabou :(\n"+"O seu SCORE foi: " + state.values.result);
        location.reload();
    }
}

// Funcao que cria numero aleatorio
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy"); // remove todos que possuem a classe enemy
    })
    let randomNumber = Math.floor(Math.random() * 9); // gera numero aleatorio
    let randomSquare = state.view.squares[randomNumber]; // gera a posicao com numero aleatorio

    randomSquare.classList.add("enemy"); // adiciona a classe enemy de acordo com a posicao aleatoria gerada

    state.values.hitPosition = randomSquare.id;
}

// Funcao de mover o Ralph em determinado tempo: state.values.gameVelocity
// function moveEnemy() {
//     state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
// }

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSong("hit");
            }
            else if (square.id != state.values.hitPosition) {
                state.values.lives--;
                playSong("errou");
                if (state.values.lives < 0) {
                    alert("GAME OVER!!! \nVocê perdeu todas as suas vidas :(\n"
                        + "O seu SCORE foi: " + state.values.result);
                    location.reload();
                }
                state.view.live.textContent = state.values.lives;
                state.values.hitPosition = null;
            }
        })
    })
}

// Funcao principal
function initialize() {
    addListenerHitBox();
}

initialize();
