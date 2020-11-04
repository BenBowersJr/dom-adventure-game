/**
 * DOM Adventure Game
 */

//some general variables for the game
//create a paragraph
const mainPara = document.createElement("p");
//check for if they went through bear Room
let bearCheck = false;
//create variable for how long waiting
let wait = 0;
let timer;


//Create function that starts the game
const startGame = function() {
  //set variable for main
  const main = document.querySelector("#game");
  //create a variable for a div
  const content = document.createElement("div");
  //add text to main paragraph
  mainPara.textContent = "";
  scrollingText("You awake in a dimly lit room. There are doors to your left and right. Which do you want to do?")
  //append content into the main
  main.appendChild(content);
  //append the paragraph into the div(content)
  content.appendChild(mainPara);
  //store section for buttons in a variable
  const btnArea = document.querySelector("#buttonArea");
  //create button elements
  const button1 = document.createElement("button");
  const button2 = document.createElement("button");
  const button3 = document.createElement('button');
  //add text to buttons
  button1.textContent = "Left";
  button2.textContent = "wait";
  button3.textContent = "right";
  //set event listeners for each button
  button1.addEventListener("click", left = () => {
    return bearRoom();
  });
  button2.addEventListener("click", waitHere = () => {
    //display first message when waiting
    if (wait === 0) {
      mainPara.textContent = ""
      scrollingText("You decide to wait for some time. Nothing happens. What do you want to do?")
      //Second message
    } else if (wait > 0 && wait < 15) {
      mainPara.textContent = ""
      scrollingText("You continue to wait. For what reason, you don't know. What do you want to do?")
    } else if (wait === 15) {
      //if they continue throw them in waiting room
     return waitingRoom();
    }
    //increase wait by one
    wait++;
  });
  button3.addEventListener("click", right = () => {
    return pitTrap();
  });
  //append buttons to btnArea
  btnArea.appendChild(button1);
  btnArea.appendChild(button2);
  btnArea.appendChild(button3);
}


//create waitingRoom
const waitingRoom = function () {
  //change text of mainPara
  mainPara.textContent = ``
  scrollingText(`The waiting seems to have paid off as the floor opens up underneath and you fall onto a mat in a new room. There is a man standing in the otherwise empty room. "Since you don't feel like playing neither do I, do as you wish." The man walks out the door. What do you do now?`)
  //reset wait to zero
  wait = 0;
  //removeEventListener
  const section = document.querySelector('#buttonArea');
  const button1 = document.querySelector('button');
  const button2 = document.getElementsByTagName('button')[1];
  const button3 = document.querySelector('button:last-child');
  button1.removeEventListener('click', left);
  button2.removeEventListener('click', waitHere);
  button3.removeEventListener('click', right);
  //delete button3
  section.removeChild(button3);
  //change button text
  button1.textContent = "wait";
  button2.textContent = "door";
  //wait option until you die
  button1.addEventListener('click', waitHere = ()=> {
    //slightly altered code from first wait
    if (wait === 0) {
      mainPara.textContent = ""
      scrollingText("It worked before so why not try it again. You wait for some time and nothing happens. What do you want to do?")
    } else if (wait > 0 && wait <10) {
      mainPara.textContent = "";
      scrollingText("You continue to wait in the room. Nothing happens. What do you want to do?")
    } else if (wait === 10) {
      return death ("You continue to wait and wait until you pass out from starvation.");
    }
    //increase wait
    wait++;
  });
  //leave out door option
  button2.addEventListener('click', door = ()=> {
    mainPara.textContent = "You open the door and find it leads to the outside. You wonder what that was all about and leave."
    //delete buttons
    section.removeChild(button1);
    section.removeChild(button2);
    section.removeChild(button3);
  })
}


//pitrap function here
const pitTrap = function() {
  //change text of main paragraph
  mainPara.textContent = "";
  scrollingText("You take a step into the room and find yourself sliding down a ramp. Quick, press spacebar to jump!")
  //remove buttons
  const section = document.querySelector('#buttonArea');
  const button1 = document.querySelector('button');
  const button2 = document.getElementsByTagName('button')[1];
  const button3 = document.querySelector('button:last-child');
  section.removeChild(button1);
  section.removeChild(button2);
  section.removeChild(button3);
  //set a timer to return death after 6seconds
  let trapFall = setTimeout(() => {
  return death("You fail to jump over the gap and fall into a pit.")
}, 6000);
  //if the user presses spacebar within 10seconds move to new Room
  const jump = function() {
    if (event.key == " ") {
    clearTimeout(trapFall);
    //delete listener for jump
    window.removeEventListener("keyup", jump);
    return hallway();
    }
  };
  //stop timer if spacebar is pressed
  window.addEventListener("keyup", jump);
}


//hallway function
const hallway = function () {
  //change text of mainPara
  mainPara.textContent = ''
  scrollingText('You jump from the ramp and land roughly. You stand up and find yourself in a hallway with two directions. Which way do you go? (Use "d" for right and "a" for left.)')
  //function for key presses
  const keys = function(event) {
    if (event.key == "a") {
      window.removeEventListener("keydown", keys);
      return death("As you walk down the left hallway a slab of stone falls from the ceiling and crushes you.");
    } else if (event.key == "d") {
      window.removeEventListener("keydown", keys);
      return ghostRoom();
    }
  }
  //add event listener for keydown
  window.addEventListener("keydown", keys);
};


//adding a ghost room because reasons
const ghostRoom = function() {
  //variable for key is false
  let key = false;
  //variable for cloth is false
  let cloth = false;
  //variable for ghost is false
  let ghost =false;
  //change the mainPara text
  mainPara.textContent = ""
  scrollingText("You walk down the right hallway to find yourself in another room. You see 2 doors, one appears to be a closet door. There is also a table in the center of the room. The room is quite cold for some reason. What do you do?")
  //add 3 buttons
  const section = document.querySelector('#buttonArea');
  const button1 = document.createElement("button");
  const button2 = document.createElement("button");
  const button3 = document.createElement('button');
  //appendchild buttons
  section.appendChild(button1);
  section.appendChild(button2);
  section.appendChild(button3);
  //name buttons
  button1.textContent = "door";
  button2.textContent = "table";
  button3.textContent = "closet";
  //add event listeners for buttons
  //button1 check door
  button1.addEventListener('click', door = ()=> {
    // if no key, it's locked
    if (key == false) {
      mainPara.textContent = "";
      scrollingText("You try to open the door but it appears to be locked. Maybe you need a key. What do you do?")
    //if key , opens to new Room
    } else if (key == true) {
      return goldRoom();
    }
  });
  //button 2 check table
  button2.addEventListener('click', table = ()=> {
    //if cloth false remove cloth to find hand
    if (cloth == false) {
      mainPara.textContent = ""
      scrollingText("You approach the table and lift the tablecloth. What appears to be a severed hand is laying underneath the cloth. Disgusted you walk away. What do you do now?")
      //cloth equals true
      cloth = true;
      //change button to check hand
      button2.textContent = "hand";
      //if cloth equals true, look at hand decide not to take it
    } else if(cloth == true) {
      mainPara.textContent = ""
      scrollingText("The hand is still where you left it. It's very gross. You decide to back away. What do you do now?")
    }
  });
  //button3 check closet
  button3.addEventListener('click', closet = ()=> {
    //if ghost false, open doors and find ghost head
    if (ghost == false) {
      mainPara.textContent = "";
      scrollingText("You open the closet door. A ghostly head is floating in front of you. Seeing you the head screams. You slam the door closed and jump away. What do you do now?")
      //set ghost to true
      ghost = true;
    //if ghost true, pick up key on ground
    } else if (ghost ==true) {
      mainPara.textContent = "";
      scrollingText("Mustering your courage you open the closet door again. The ghost appears to be gone. You see a key lying on the ground and decide to pick it up. Now what do you do?")
      //set key to true
      key = true;
    }
  });
}


//add death function
const death = function(string) {
  //change text of paragraph
  mainPara.textContent = "";
  scrollingText(string + " You are dead. Play again?")
  //remove buttons
  const section = document.querySelector('#buttonArea');
  const button1 = document.querySelector('button');
  const button2 = document.getElementsByTagName('button')[1];
  const button3 = document.querySelector('button:last-child');
  section.removeChild(button1);
  section.removeChild(button2);
  section.removeChild(button3);
};


//adding bearRoom function
const bearRoom = function() {
  //add variable for if bear moved
  bearMoved = false;
  //chang bearCheck to true
  bearCheck = true;
  //change text of main paragraph
  mainPara.textContent = "";
  scrollingText("There is a bear in here. It's sitting in front of another door eating from a pot of honey. How are you going to move the bear?")
  //store section in a variable
  const buttonSection = document.querySelector("#buttonArea");
  //store all buttons in variables
  const button1 = document.querySelector("button");
  const button2 = document.getElementsByTagName('button')[1];
  const button3 = document.querySelector("button:last-child");
  //removing event listeners
  button1.removeEventListener('click', left);
  button2.removeEventListener('click', waitHere);
  button3.removeEventListener('click', right);
  //change text on buttons
  button1.textContent = "taunt bear";
  button2.textContent = "try door";
  button3.textContent = "take honey";
  //event listeners for each button
  button1.addEventListener('click', taunt = ()=> {
    if (bearMoved == false) {
      mainPara.textContent = ""
      scrollingText("The bear looks mad but moves away from the door. What do you want to do?")
      //change bearMoved to true
      bearMoved = true;
    } else if (bearMoved == true) {
      return death("The bear has had enough. he charges you and bites your head off.")
    }
  });
  //if bear moves lets through to gold room, if not, dead
  button2.addEventListener('click', door = ()=>{
    if (bearMoved == false) {
      return death("The bear swats at you as you walk past.")
    } else if (bearMoved == true) {
      return goldRoom();
    }
  });
  //player dies from trying to steal honey
  button3.addEventListener('click', honey = ()=> {
    return death("That was really stupid. The bear bites your head off.")
  });
}


//add goldRoom function
const goldRoom = function() {
  //set variable for amount of gold
  let gold = 0;
  mainPara.textContent = "";
  scrollingText("You enter the room and find yourself staring at a room full of gold. On the other side of the room there's a door. What do you do?")
  //store buttons in variables and remove event listeners
  const button1 = document.querySelector('button');
  const button2 = document.getElementsByTagName('button')[1];
  const button3 = document.querySelector('button:last-child');
  //remove event listeners
  if (bearCheck == true) {
    button1.removeEventListener('click', taunt);
    button2.removeEventListener('click', door);
    button3.removeEventListener('click', honey);
  } else if (bearCheck == false) {
    button1.removeEventListener('click', door);
    button2.removeEventListener('click', table);
    button3.removeEventListener('click', closet);
  };
  //change button textContent
  button1.textContent = "take some gold";
  button2.textContent = "take all gold";
  button3.textContent = "use door";
  //add event listeners button1
  button1.addEventListener('click', someGold = () => {
    if (gold === 0) {
      mainPara.textContent = "";
      scrollingText("You've taken some gold.")
      gold++;
      button1.textContent = "Take more?";
    } else if (gold === 1) {
      mainPara.textContent = "";
      scrollingText("You've taken some more gold. You're pockets are feeling heavy.")
      gold++;
    } else if (gold === 2) {
      return death("You've been greedy. The floor opens up and swallows you whole.");
    }
  });
  //add event listener button2
  button2.addEventListener('click', allGold = () => {
    return death("You're too greedy. The floor opens up and swallows you whole.");
  });
  //add event listener to button3
  button3.addEventListener('click', door = () => {
    //option for taking no gold
    if (gold === 0) {
      mainPara.textContent = ""
      scrollingText("You open the door and find yourself outside. You've survived.")
    };
    //option for taking some gold
    if (gold === 1) {
      mainPara.textContent = ""
      scrollingText("You open the door and find the outdoors to greet you. You've survived, and a little richer to boot.")
    };
    //option for taking alot of gold
    if (gold === 2) {
      mainPara.textContent = ""
      scrollingText("You open the door and find the outdoors to greet you. You've survived, and with quite a bit of gold as reward.")
    };
    //delete buttons
    const section = document.querySelector('section');
    section.removeChild(button1);
    section.removeChild(button2);
    section.removeChild(button3);
  });
}
//Starting the game

function scrollingText(string1) {
  //set timerCount to zero, this will help look through the string
  let timerCount = 0
  //if the timer is currently in use
  if (typeof timer !== 'undefined') {
    //clear timer
    clearInterval(timer)
  }
  //start timer
  timer = setInterval(() => {
    //pull 1 letter from string
    let currentLetter = string1[timerCount]
    //add that letter to the main text element
    mainPara.textContent += currentLetter
    //move to the next letter
    timerCount++

    // if we arrive at last letter
    if (string1[timerCount] === undefined) {
      //stop the timer
      clearInterval(timer)
    }
  }, 25)
}


startGame();
