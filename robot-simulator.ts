import { ClockwiseDirection, Orientation } from "./constants";
import { getDirection } from "./helpers";


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

    turnRight(): Robot {
        if(!this.bearing){
            throw 'Set the Orientation before moving ahead';
        }
        
        let currIndex = ClockwiseDirection.findIndex((dir) => this.bearing == dir);
        this.bearing = getDirection(++currIndex);
        return this;
    }

    turnLeft(): Robot {
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

    advance(): Robot {
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

    evaluateNew(stream: string): Robot {
        const self = this;
        [...stream].forEach(char => {
            switch (char) {
                case 'L': self.turnLeft();
                    break;

                case 'R': self.turnRight();
                    break;

                case 'A': self.advance();
                    break;
            }
        });
        return self;
    }
}