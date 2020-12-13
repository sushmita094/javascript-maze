document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const squares = document.querySelectorAll(".grid div");
  const carsLeft = document.querySelectorAll(".car-left");
  const carsRight = document.querySelectorAll(".car-right");
  const logsLeft = document.querySelectorAll(".log-left");
  const logsRight = document.querySelectorAll(".log-right");
  const timeLeft = document.querySelector("#time-left");
  const result = document.querySelector("#result");
  const startBtn = document.querySelector("#startButton");
  const playAgainBtn = document.querySelector("#playAgainButton");
  const width = 9;
  let currentTime = 20;
  let currentIndex = 76;
  let timerId;
  let timerId2;
  let timeAtPause;

  // move the frog
  function moveFrog(e) {
    squares[currentIndex].classList.remove("frog");
    switch (e.keyCode) {
      case 37:
        if (currentIndex % width !== 0) currentIndex -= 1;
        break;
      case 38:
        if (currentIndex - width >= 0) currentIndex -= width;
        break;
      case 39:
        if (currentIndex % width < width - 1) currentIndex += 1;
        break;
      case 40:
        if (currentIndex + width < width * width) currentIndex += width;
        break;
    }
    squares[currentIndex].classList.add("frog");
    lose();
    win();
  }

  function autoMoveCars() {
    carsLeft.forEach((carLeft) => moveCarLeft(carLeft));
    carsRight.forEach((carRight) => moveCarRight(carRight));
  }

  // move car left on a time loop
  function moveCarLeft(carLeft) {
    switch (true) {
      case carLeft.classList.contains("c1"):
        carLeft.classList.remove("c1");
        carLeft.classList.add("c2");
        break;
      case carLeft.classList.contains("c2"):
        carLeft.classList.remove("c2");
        carLeft.classList.add("c3");
        break;
      case carLeft.classList.contains("c3"):
        carLeft.classList.remove("c3");
        carLeft.classList.add("c1");
        break;
    }
  }

  // move car right on a time loop
  function moveCarRight(carRight) {
    switch (true) {
      case carRight.classList.contains("c1"):
        carRight.classList.remove("c1");
        carRight.classList.add("c3");
        break;
      case carRight.classList.contains("c2"):
        carRight.classList.remove("c2");
        carRight.classList.add("c1");
        break;
      case carRight.classList.contains("c3"):
        carRight.classList.remove("c3");
        carRight.classList.add("c2");
        break;
    }
  }

  // move the logs
  function autoMoveLogs() {
    logsLeft.forEach((logLeft) => moveLogLeft(logLeft));
    logsRight.forEach((logRight) => moveLogRight(logRight));
  }

  // move log left on a time loop
  function moveLogLeft(logLeft) {
    switch (true) {
      case logLeft.classList.contains("l1"):
        logLeft.classList.remove("l1");
        logLeft.classList.add("l2");
        break;
      case logLeft.classList.contains("l2"):
        logLeft.classList.remove("l2");
        logLeft.classList.add("l3");
        break;
      case logLeft.classList.contains("l3"):
        logLeft.classList.remove("l3");
        logLeft.classList.add("l4");
        break;
      case logLeft.classList.contains("l4"):
        logLeft.classList.remove("l4");
        logLeft.classList.add("l5");
        break;
      case logLeft.classList.contains("l5"):
        logLeft.classList.remove("l5");
        logLeft.classList.add("l1");
        break;
    }
  }

  // move log right on a time loop
  function moveLogRight(logRight) {
    switch (true) {
      case logRight.classList.contains("l1"):
        logRight.classList.remove("l1");
        logRight.classList.add("l5");
        break;
      case logRight.classList.contains("l2"):
        logRight.classList.remove("l2");
        logRight.classList.add("l1");
        break;
      case logRight.classList.contains("l3"):
        logRight.classList.remove("l3");
        logRight.classList.add("l2");
        break;
      case logRight.classList.contains("l4"):
        logRight.classList.remove("l4");
        logRight.classList.add("l3");
        break;
      case logRight.classList.contains("l5"):
        logRight.classList.remove("l5");
        logRight.classList.add("l4");
        break;
    }
  }

  // move the frog with log left
  function moveWithLogLeft() {
    if (currentIndex >= 27 && currentIndex < 35) {
      squares[currentIndex].classList.remove("frog");
      currentIndex += 1;
      squares[currentIndex].classList.add("frog");
    }
  }

  // move the frog with log right
  function moveWithLogRight() {
    if (currentIndex > 18 && currentIndex <= 26) {
      squares[currentIndex].classList.remove("frog");
      currentIndex -= 1;
      squares[currentIndex].classList.add("frog");
    }
  }

  // rules to win frogger
  function win() {
    if (squares[4].classList.contains("frog")) {
      result.innerHTML = "You Won!";
      // squares[currentIndex].classList.remove("frog");
      endGame();
    }
  }

  // rules to lose frogger
  function lose() {
    if (
      currentTime == 0 ||
      squares[currentIndex].classList.contains("c1") ||
      squares[currentIndex].classList.contains("l4") ||
      squares[currentIndex].classList.contains("l5")
    ) {
      result.innerHTML = "You Lose :(";
      // squares[currentIndex].classList.remove("frog");
      endGame();
    }
  }

  function endGame() {
    clearInterval(timerId);
    clearInterval(timerId2);
    document.removeEventListener("keyup", moveFrog);
    grid.classList.add("gridInactive");
  }

  // all the functions that move pieces
  function movePieces() {
    autoMoveCars();
    autoMoveLogs();
    moveWithLogLeft();
    moveWithLogRight();
    lose();
  }

  function timeTheGame() {
    currentTime--;
    timeLeft.textContent = currentTime;
  }

  function resetGame() {
    currentTime = 20;
    timeLeft.textContent = currentTime;
    squares[currentIndex].classList.remove("frog");
    currentIndex = 76;
    squares[currentIndex].classList.add("frog");
    result.textContent = "Let's Play";
    clearInterval(timerId);
    clearInterval(timerId2);
  }

  function playAgain() {
    resetGame();
    play();
  }

  function playAndPauseAction() {
    console.log("is it play or pause???");
    if (timerId) {
      console.log("first option");
      pause();
    } else if (timeAtPause) {
      console.log("second option");
      play();
    } else {
      console.log("third option");
      play();
    }
  }

  function play() {
    console.log("enter play mode");
    if (timeAtPause) {
      currentTime = timeAtPause;
      timeAtPause = null;
    }
    timerId = setInterval(movePieces, 900);
    timerId2 = setInterval(timeTheGame, 1000);
    document.addEventListener("keyup", moveFrog);
    grid.classList.remove("gridInactive");

    // if (timerId) {
    //   clearInterval(timerId);
    // }
    // if (timerId2) {
    //   clearInterval(timerId2);
    // } else {
    //   timerId = setInterval(movePieces, 900);
    //   timerId2 = setInterval(timeTheGame, 1000);
    //   document.addEventListener("keyup", moveFrog);
    //   grid.classList.remove("gridInactive");
    // }
  }

  function pause() {
    console.log("enter pause mode");
    timeAtPause = currentTime;
    clearInterval(timerId);
    clearInterval(timerId2);
    document.removeEventListener("keyup", moveFrog);
    grid.classList.add("gridInactive");
    console.log("after pausing timerId is", timerId);
  }

  playAgainBtn.addEventListener("click", playAgain);

  // start and pause the game
  startBtn.addEventListener("click", playAndPauseAction);
});
