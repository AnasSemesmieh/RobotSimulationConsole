const readline = require('readline');

var robot = { "x": "0", "y": "0", "f": "north", "placed": true }
var direction = ["north", "east", "south", "west"]

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  var cmd = input.toLowerCase();
  console.log(`Command is : ${cmd}`);
  commandHandler(cmd)
});

function commandHandler(command) {
  var placeRGX = command.match(/^place [0-4],[0-4],(?:north|south|east|west)$/)
  var cmd = command


  if (placeRGX != null) {
    cmd = "placed"
  }

  if (robot.placed || cmd == 'placed') {
    console.log("in IF)")
    switch (cmd) {
      case 'move':
        move()
        break
      case 'left':
        left()
        break
      case 'right':
        right()
        break
      case 'report':
        report()
        break
      case 'placed':
        place(command)
        break
      default:
        console.log("Unable to interpret command")
    }
  } else {
    console.log("Ooops I am not placed yet!")

  }
}

function move() {
  console.log(robot.f)
}

function place(command) {
  var xyf = (command.split(' ')[1]).split(',')
  robot.x = xyf[0]
  robot.y = xyf[1]
  robot.f = xyf[2]
  robot.placed = true
}

function report() {
  console.log(robot)
}

function right() {
  if (direction.indexOf(robot.f) == direction.length - 1) {
    robot.f = direction[0]
  } else {
    robot.f = direction[direction.indexOf(robot.f) + 1]
  }
}

function left() {
  if (direction.indexOf(robot.f) == 0) {
    robot.f = direction[direction.length - 1]
  } else {
    robot.f = direction[direction.indexOf(robot.f) - 1]
  }
}

function move() {
  var unChanged = true
  switch (robot.f) {
    case 'north':
      if (robot.y < 4){
        robot.y++
        unChanged = false
      }
      break;
    case 'east':
      if (robot.x < 4){
        robot.x++
        unChanged= false
      }
      break;
    case 'south':
      if (robot.y > 0){
        robot.y--
        unChanged = false
      }
      break;
    case 'west':
      if (robot.x > 0){
        robot.x--
        unChanged = false
      }
      break;
  }
  if (unChanged)
  console.log("Could not move!!")
}