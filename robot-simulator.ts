import { Action, ClockwiseDirection, Orientation } from "./constants";
import { getDirection } from "./helpers";

type ActionType = keyof typeof Action;

export default class Robot {
    bearing?: string;
    coordinates: [number, number];

    constructor(x = 0, y = 0, bearing?: string) {
        this.bearing = bearing;
        this.coordinates = [x, y];
    }

    orient(direction: Orientation): Robot {
        this.bearing = Orientation[direction];
        return this;
    }

    [Action.R](): Robot {
        if(!this.bearing){
            throw 'Set the Orientation before moving ahead';
        }
        
        let currIndex = ClockwiseDirection.findIndex((dir) => this.bearing == dir);
        this.bearing = getDirection(++currIndex);
        return this;
    }

    [Action.L](): Robot {
        if(!this.bearing){
            throw 'Set the Orientation before moving ahead';
        }
        
        let currIndex = ClockwiseDirection.findIndex((dir) => this.bearing == dir);
        this.bearing = getDirection(--currIndex);
        return this;
    }

    

    at(x: number, y: number): Robot {
        this.coordinates = [x, y];
        return this;
    }

    [Action.A](): Robot {
        const moveCoordinateBy1 = 1;
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

export function evaluate(stream: string, robot: Robot) {
    [...stream].forEach(char => {
        robot[Action[char as ActionType]]();
    });
    return {
        coordinates: robot.coordinates,
        bearing: robot.bearing,
    };
}