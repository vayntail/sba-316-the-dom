// localStorage mockup data object
const localStorage = {
  musicPlayer: {
    songIndex: 0,
  },
  soundController: {
    mainVolume: 15,
  },
  sessionTimer: {},
  todoList: {
    tasksOrder: [2, 1, 3],
    tasks: [
      { id: 1, checked: true, text: "My first task!" },
      { id: 2, checked: true, text: "yoyoyoyo" },
      { id: 3, checked: false, text: "unchecked task..." },
    ],
  },
};

const musicPlayerEl = document.querySelector("#music-player");
const todoContainerEl = document.querySelector("#todo-container");
const soundControllerEl = document.querySelector("#sound-controller");
const songs = [
  new Audio("assets/songs/InDreamland.mp3"),
  new Audio("assets/songs/One-Thing.mp3"),
];
let song;

window.addEventListener("load", (event) => {
  musicPlayer();
  todoList();
  soundController();
});

const soundController = () => {};

const musicPlayer = () => {
  // music variables
  const playButton = musicPlayerEl.querySelector("#play-button");
  const pauseButton = musicPlayerEl.querySelector("#pause-button");
  const nextButton = musicPlayerEl.querySelector("#next-button");
  const previousButton = musicPlayerEl.querySelector("#previous-button");
  // volume variables
  const volumeSlider = soundControllerEl.querySelector("#volume-slider");
  const soundOffButton = soundControllerEl.querySelector("#sound-off-button");
  const soundMinButton = soundControllerEl.querySelector("#sound-min-button");
  const soundLowButton = soundControllerEl.querySelector("#sound-low-button");
  const soundHighButton = soundControllerEl.querySelector("#sound-high-button");

  let songIndex = 1;

  setSong(songIndex);
  // set starting slider value to whatever's saved in local storage
  volumeSlider.value = localStorage.soundController.mainVolume;

  setSongVolume();

  // check autoplay permissions.
  if (navigator.getAutoplayPolicy("mediaelement") === "allowed") {
    play();
  } else if (navigator.getAutoplayPolicy("mediaelement") === "allowed-muted") {
    pause();
  } else if (navigator.getAutoplayPolicy("mediaelement") === "disallowed") {
    pause();
  }

  function setSong(index) {
    songIndex = index;
    song = songs[songIndex];
    songName = song.src.split("/").pop();
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
  function onSongEnded() {
    audio.currentTime = 0; // reset to beginning
    song.play(); // replay song
  }
  function next() {
    pause();
    if (songIndex == songs.length - 1) setSong(0);
    else setSong(songIndex + 1);
    setSongVolume();
    play();
  }
  function previous() {
    pause();
    if (songIndex == 0) setSong(songs.length - 1);
    else setSong(songIndex - 1);
    setSongVolume();
    play();
  }
  function setSongVolume() {
    song.volume = volumeSlider.value / 100 - 0.01; // set volume as percentage
    console.log(song.volume);

    // set appopriate icons based on value.
    hideAllIcons();
    if (song.volume == 0) {
      soundOffButton.classList.remove("hidden");
    } else if (song.volume <= 0.4) {
      soundMinButton.classList.remove("hidden");
    } else if (song.volume <= 0.8) {
      soundLowButton.classList.remove("hidden");
    } else {
      soundHighButton.classList.remove("hidden");
    }
    function hideAllIcons() {
      const buttons = soundControllerEl.querySelector(
        "#volume-button-container"
      ).children;
      for (let button of buttons) button.classList.add("hidden");
    }
  }
  function mute() {
    console.log("add mute feature here");
  }
  function unmute() {
    console.log("add unmute feature here");
  }

  // events
  song.addEventListener("ended", onSongEnded);
  playButton.addEventListener("click", play);
  pauseButton.addEventListener("click", pause);
  nextButton.addEventListener("click", next);
  previousButton.addEventListener("click", previous);
  volumeSlider.addEventListener("change", setSongVolume);
  soundOffButton.addEventListener("click", unmute);
  [soundMinButton, soundLowButton, soundHighButton].forEach((button) => {
    button.addEventListener("click", mute);
  });
};

const todoList = () => {
  const newTodoBoxEl = todoContainerEl.querySelector("#new-todo-box");
  const todoItem = document.querySelector(".todo-item");
  // toggle todo on and off on button click
  document.querySelector("#todo-button").addEventListener("click", () => {});

  // display saved todoList tasks from localStorage.
  localStorage.todoList.tasks.forEach((taskObj) => createNewItem(taskObj));

  function createNewItem(taskObj) {
    let clonedTodo = todoItem.cloneNode(true);
    clonedTodo.querySelector("#checked").checked = taskObj.checked;
    clonedTodo.querySelector("#text").value = taskObj.text;
    todoContainerEl.append(clonedTodo);
    // remove hidden from cloned todo
    clonedTodo.classList.remove("hidden");
  }
  newTodoBoxEl.querySelector("button").addEventListener("click", () => {
    // if add new button is clicked, check if input is blank or not.
    let text = newTodoBoxEl.firstElementChild.value;
    if (text != "") {
      createNewItem({ id: 1, checked: false, text: text });
    } else {
      newTodoBoxEl.firstElementChild.focus();
    }
  });
};
