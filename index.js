const musicPlayerEl = document.querySelector("#music-player");
const todoContainerEl = document.querySelector("#todo-container");
const songs = [
    new Audio("assets/songs/InDreamland.mp3"),
    new Audio("assets/songs/One-Thing.mp3"),
];

window.addEventListener("load", event => {
    musicPlayer();
    todoList();
});

const musicPlayer = () => {
    const playButton = musicPlayerEl.querySelector("#play-button");
    const pauseButton = musicPlayerEl.querySelector("#pause-button");

    let song;
    setSong(0);

    // check autoplay permissions.
    if (navigator.getAutoplayPolicy("mediaelement") === "allowed") {
        play();
    } else if (navigator.getAutoplayPolicy("mediaelement") === "allowed-muted") {
        pause();
    } else if (navigator.getAutoplayPolicy("mediaelement") === "disallowed") {
        pause();
    }
    function setSong(index){
        song = songs[index];
        songName = song.src.split('/').pop();
        document.getElementById("song-name").textContent = songName;
    }
    function play() {
        song.play();
        pauseButton.classList.remove("hidden");
        playButton.classList.add("hidden");
        console.log("playing");
    }
    function pause() {
        song.pause();
        pauseButton.classList.add("hidden");
        playButton.classList.remove("hidden");
        console.log("paused");
    }

    playButton.addEventListener("click", play);
    pauseButton.addEventListener("click", pause);
}

const todoList = () => {
    todoContainerEl.querySelector("#new-todo-box").querySelector("button").addEventListener('click', () => {
        console.log("yellow")
    });
}