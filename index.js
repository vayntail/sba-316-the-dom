// localStorage mockup data object
const localStorage = {
  musicPlayer: {
    songIndex: 0,
  },
  soundController: {
    mainVolume: 20,
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

window.addEventListener("load", (event) => {
  musicPlayer();
  todoList();
  soundController();
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
  function setSong(index) {
    song = songs[index];
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

  playButton.addEventListener("click", play);
  pauseButton.addEventListener("click", pause);
};

const todoList = () => {
  const todoItem = document.querySelector(".todo-item");
  // toggle todo on and off on button click
  document.querySelector("#todo-button").addEventListener("click", () => {});

  // display saved todoList tasks from localStorage.
  localStorage.todoList.tasks.forEach((taskObj) => {
    let clonedTodo = todoItem.cloneNode(true);
    clonedTodo.querySelector("#checked").checked = taskObj.checked;
    clonedTodo.querySelector("#text").value = taskObj.text;
    todoContainerEl.append(clonedTodo);
    // remove hidden from cloned todo
    clonedTodo.classList.remove("hidden");
  });

  todoContainerEl
    .querySelector("#new-todo-box")
    .querySelector("button")
    .addEventListener("click", () => {
      console.log("yellow");
    });
};

const soundController = () => {
  const topBar = soundControllerEl.querySelector("#top-bar");

  // Start collapsed.
  // on collapsed, set height of sound controller to height of top bar.
  soundControllerEl.style.height = topBar.clientHeight.toString();

  console.log(topBar.clientHeight);
};
