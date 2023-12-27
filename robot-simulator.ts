import { Action, ClockwiseDirection, Orientation } from "./constants";
import { getDirection, isEnumKey } from "./helpers";
import { RobotType } from "./types";
//https://www.youtube.com/watch?v=IPcAeo1ZKEk&list=PLYvdvJlnTOjF6aJsWWAt7kZRJvzw-en8B&index=46
export default class Robot implements RobotType<Robot> {
    bearing?: string;
    coordinates: [number, number];
    readonly moveCoordinateBy: number;

    constructor(x = 0, y = 0, bearing?: string, moveCoordinateBy?: number) {
        this.bearing = bearing;
        this.coordinates = [x, y];
        this.moveCoordinateBy = moveCoordinateBy ?? 1; // To stop reassignment in class methods
    }

    private getCurrentIndex(){
        if(!this.bearing){
            throw 'Set the Orientation before moving ahead';
        }
        return ClockwiseDirection.findIndex((dir) => dir == this.bearing);
    }

    // shouldn't pass enum in parameters, it can accept incorrect enum Key value ex direction="south bad value"
    orient(direction: Orientation): Robot {
        this.bearing = Orientation[direction];
        return this;
    }

    [Action.R](): Robot {
        this.bearing = getDirection(this.getCurrentIndex() + 1);
        return this;
    }

    [Action.L](): Robot {
        this.bearing = getDirection(this.getCurrentIndex() - 1);
        return this;
    }

    at(x: number, y: number): Robot {
        this.coordinates = [x, y];
        return this;
    }

    [Action.A](): Robot {
        const moveCoordinateBy1 = this.moveCoordinateBy;
        let [x, y] = this.coordinates;
        switch (this.bearing) {
            case Orientation.north: y += moveCoordinateBy1;
                break;
            case Orientation.east: x += moveCoordinateBy1;
                break;
            case Orientation.south: y -= moveCoordinateBy1;
                break;
            case Orientation.west: x -= moveCoordinateBy1;
                break;
        }
        this.at(x, y);
        return this;
    }
}

export function evaluate(stream: string, robot: RobotType<Robot>) {
    [...stream].forEach(char => {
        if(isEnumKey(Action, char)){
            robot[Action[char]]();
        }
    });
    return {
        coordinates: robot.coordinates,
        bearing: robot.bearing,
    };
}
