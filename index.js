const readline = require('readline');

//Global Robot JSON to hold the state of the robot
var robot = { "x": 0, "y": 0, "f": "north", "placed": false }
//Global Array of directions on the board
var direction = ["north", "east", "south", "west"]

//Initilaization of the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Input Action
rl.on('line', (input) => {
  var cmd = input.toLowerCase() // to handle miss spells of upper/lower case (Standrise Commands to lower cases)
  this.commandHandler(cmd)
});

//Exported to use externally from test scripts
module.exports.commandHandler = (command) => {
  //RegX to compare against a valid placement command which is "place" followed by x and y bound from 0-4 acording to the board size and followed by the orientation
  var placeRGX = command.match(/^place [0-4],[0-4],(?:north|south|east|west)$/)
  
  //Temporary storage of the command value
  var cmd = command

  //Checking if there is a Regx matching and updating the value to switch against acordingly.
  if (placeRGX != null) {
    cmd = "placed"
  }

//Checks for placement or ignoring commands if there is no placement
  if (robot.placed || cmd == 'placed') {
    switch (cmd) {
      case 'placed':
        place(command)
        break
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
      //reportJSON is used in test scripts
      case 'reportJSON':
        return reportJSON()
      default:
      var msg = "Unable to interpret command"
        console.log(msg)
        return msg
    }
  } else {
    var msg = "Ooops the robot is not placed yet! Try a valid place command to begin"
    console.log(msg)
    return msg
  }
}

function place(command) {
  var xyf = (command.split(' ')[1]).split(',')
  robot.x = parseInt(xyf[0])
  robot.y = parseInt(xyf[1])
  robot.f = xyf[2]
  robot.placed = true
}

function move() {
  var unChanged = true //Used to show a message when a move command was not executed
  switch (robot.f) {
    case 'north':
      if (robot.y < 4) {
        robot.y++
        unChanged = false
      }
      break;
    case 'east':
      if (robot.x < 4) {
        robot.x++
        unChanged = false
      }
      break;
    case 'south':
      if (robot.y > 0) {
        robot.y--
        unChanged = false
      }
      break;
    case 'west':
      if (robot.x > 0) {
        robot.x--
        unChanged = false
      }
      break;
  }
  if (unChanged)
    console.log("Could not move!!")
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

function report() {
  console.log(robot.x + ','+robot.y+","+robot.f.toUpperCase())
}

function reportJSON() {
  return robot
}