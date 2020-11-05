/**
 * DOM Adventure Game
 */

// create variables
let gameText = document.querySelector('.game-text')
let button1 = document.querySelector('.button1')
let button2 = document.querySelector('.button2')
let button3 = document.querySelector('.button3')
let button4 = document.querySelector('.button4')
let buttons = document.querySelectorAll('button')
let timer;

const player = {
  health: 100
}

function gameStart() {
  //set the starter game Text
  scrollingText("You are a monster hunter getting chased in a forest by a band of monsters. You can meet up with your partner, or take the monsters on solo.")

  // add text to buttons and eventListeners to each button
  button1.textContent = 'Meet up with partner'
  button1.addEventListener('click', meetPartner)

  button2.textContent = "You're the confident type"
  button2.addEventListener('click', confidentType)

  //hide button 3 and 4 because there not being used
  button3.style.display = 'none'
  button4.style.display = 'none'
}

function confidentType() {
  //remove the listeners from previous buttons.
  button1.removeEventListener('click', meetPartner)
  button2.removeEventListener('click', confidentType)

  //change the game text
  gameText.textContent = ''
  scrollingText("You're so confident you stop in your tracks and prepare to fight. Which weapon do you draw?")

  //button 1 leads to death
  button1.textContent = 'Just your dagger'
  button1.addEventListener('click', event => {
    gameOver('You try to fight them, but a small dagger was not enough to defend yourself. You die a valiant death.')
  })

  // this is the only surviving option
  button2.textContent = 'Just your Sword'
  button2.addEventListener('click', survivedMonsters)

  //button 3 also leads to death
  button3.textContent = 'Why not both?'
  button3.style.display = 'block'
  button3.addEventListener('click', event => {
    gameOver(`You don't know how to wield both efficiently. You got overconfient and died.`)
  })
}

function survivedMonsters() {
  //remove past listeners
  button1.removeEventListener('click', gameOver)
  button2.removeEventListener('click', survivedMonsters)

  //change the game text
  gameText.textContent = ''
  scrollingText('You survived the monsters, but are severely hurt. You meet up with your partner and decide what to do next. This is end of this path, please refresh!')

  //change button text
  button1.textContent = 'Hide in a nearby building'
  button2.textContent = 'Set traps for other pursuers'

  //show/hide buttons
  button1.style.display = 'none'
  button2.style.display = 'none'
  button3.style.display = 'none'
  button4.style.display = 'none'
}

function meetPartner() {
  //remove previous listeners
  button1.removeEventListener('click', meetPartner)
  button2.removeEventListener('click', confidentType)

  //set game text
  gameText.textContent = ''
  scrollingText('You meet your partner in a clearing. You can choose to set traps, or keep running.')


  //add new text and event listener
  button1.textContent = 'Set traps'
  button1.addEventListener('click', setTraps)

  button2.textContent = 'Keep running'
  button2.addEventListener('click', keepRunning)
}

function keepRunning() {
  //remove past listeners
  button1.removeEventListener('click', setTraps)
  button2.removeEventListener('click', keepRunning)

  //if they did not place traps display this
  if (!player.traps) {
    gameText.textContent = ''
    scrollingText('You keep running until you come across a building. It looks old and abandoned.')
  } else {
    //if they did place traps display this message
    gameText.textContent = ''
    scrollingText('As you keep running you hear an explosion behind you. You come across an old building that looks abandoned.')
    player.timesRan = 1
  }

  //change button text
  button1.textContent = 'Hide in the building'
  button1.addEventListener('click', insideBuilding)
  button2.textContent = 'Too obvious, you keep running'

}

function setTraps() {
  //somehow remember that we set Traps
  player.traps = true
  //remove past listeners
  button1.removeEventListener('click', setTraps)
  button2.removeEventListener('click', keepRunning)

  //change main text
  gameText.textContent = ''
  scrollingText('You set traps behind you. Will you wait for survivors, or continue running?')


  //change button text
  button1.textContent = 'Wait for Survivors'
  button2.textContent = 'Get a lead while you can'
  button2.addEventListener('click', keepRunning)
}

function insideBuilding() {
  //remove past listeners
  button1.removeEventListener('click', insideBuilding)

  //change the game text
  gameText.textContent = ''
  scrollingText(`You're inside the building and push furniture agianst the door to keep them out. You and your partner decide to sweep the building to make sure no one is inside.`)


  //change button text
  button1.textContent = 'take the upstairs'
  button2.textContent = 'take the downstairs'
  button3.textContent = ''
  button4.textContent = ''

  button1.style.display = 'none'
  button2.style.display = 'none'
}

function gameOver(text) {
  //change main text element
  gameText.textContent = ''
  scrollingText(text + '. To start over refresh the page.')

  //set each buttons display to none
  for (let button of buttons) {
    button.style.display = 'none'
  }
}

//a fun function that displays the text like an adventure game
function scrollingText(string) {
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
    let currentLetter = string[timerCount]
    //add that letter to the main text element
    gameText.textContent += currentLetter
    //move to the next letter
    timerCount++

    // if we arrive at last letter
    if (string[timerCount] === undefined) {
      //stop the timer
      clearInterval(timer)
    }
  }, 25)
}

//this is a template for a scene bc each one is similar
function placeholder() {
  //remove past listeners
  button1.removeEventListener()
  button2.removeEventListener()
  button3.removeEventListener()
  button4.removeEventListener()

  //change main text element
  gameText.textContent = ''
  scrollingText('placeholder')

  //change button text
  button1.textContent = 'block'
  button2.textContent = 'block'
  button3.textContent = ''
  button4.textContent = ''

  //show/hide buttons
  button1.style.display = 'block'
  button2.style.display = 'block'
  button3.style.display = 'block'
  button4.style.display = 'block'
}






gameStart();
