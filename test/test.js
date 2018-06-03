var expect = require("expect")

var index = require('../index.js')

describe('Robot Simulation Tests', () => {

    describe('Pre-placement Command', () => {
        it('Trying to move before placement', () => {
            index.commandHandler('move')
            var output = index.commandHandler('reportJSON')
            expect(output).toEqual("Ooops the robot is not placed yet! Try a valid place command to begin")
        })
    })

    describe('Robot Placement', () => {
        it('Placing the robot at 2,2 north', () => {
            index.commandHandler('place 2,2,north')
            var output = index.commandHandler('reportJSON')
            expect(output).toEqual({"f": "north", "placed": true, "x": 2, "y": 2})
        })
    })

    describe('Robot Movement', () => {
        it('Moving the robot north', () => {
            index.commandHandler('move')
            var output = index.commandHandler('reportJSON')
            expect(output).toEqual({"f": "north", "placed": true, "x": 2, "y": 3})
        })
    })

    describe('Faulty Command Handling', () => {
        it('Trying faulty command', () => {
            var output = index.commandHandler('asdasdasdasdsasdas')
            expect(output).toEqual("Unable to interpret command")
        })
    })

    describe('Invalid Robot Movement', () => {
        it('Moving the robot max north and trying to push outside the table boundries', () => {
            index.commandHandler('move')
            index.commandHandler('move')
            index.commandHandler('move')
            var output = index.commandHandler('reportJSON')
            expect(output).toEqual({"f": "north", "placed": true, "x": 2, "y": 4})
        })
    })

    describe('Robot Rotation', () => {
        it('Rotating the robot to the right', () => {
            index.commandHandler('right')
            var output = index.commandHandler('reportJSON')
            expect(output).toEqual({"f": "east", "placed": true, "x": 2, "y": 4})
        })
    })
})