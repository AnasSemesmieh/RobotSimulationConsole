# RobotSimulationConsole
*Simulation for a robot on a 5x5 board in NodeJS

*The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.

*The robot will not fall off the table during movement. This also includes the initial placement of the robot. Any movement that would result in the robot falling from the table is prevented.

*Commands:

    PLACE will put the robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. The origin (0,0) can be considered to be the SOUTH WEST most corner.

    MOVE will move the robot one unit forward in the direction it is currently facing.

    LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

    REPORT will announce the X,Y and orientation of the robot.

*Example Input and Output

    a)
    PLACE 0,0,NORTH
    MOVE
    REPORT
    Output: 0,1,NORTH 

    b)
    PLACE 0,0,NORTH
    LEFT
    REPORT
    Output: 0,0,WEST

*You can also look at the test folder which contains few test scenarios to demonstrate the cases handeled and the constraints applied