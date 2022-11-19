import { ClockwiseDirection, NORTH, EAST, SOUTH, WEST } from "./constants";
import { includes, indexOf, getClassProperty } from "./helpers";
import { Coordinates, IRobot, voidFn } from "./types";

function nextIndexOfClockwiseDirection(index: number): number {
    return (index + 1) >= ClockwiseDirection.length ? 0 : index + 1;
}

function prevIndexOfClockwiseDirection(index: number): number {
    return index == 0 ? ClockwiseDirection.length - 1 : index - 1;
}

export default class Robot implements IRobot {
    bearing?: string;
    coordinates: Coordinates;

    constructor(x = 0, y = 0, bearing?: string) {
        this.bearing = bearing;
        this.coordinates = [x, y];
    }

    orient(direction: string): void | Error {
        if (!includes(ClockwiseDirection, direction)) {
            throw 'Invalid Robot Bearing';
        }
        this.bearing = direction;
    }

    turnRight(): void {
        const currIndex = indexOf(ClockwiseDirection, this.bearing);
        this.bearing = ClockwiseDirection[nextIndexOfClockwiseDirection(currIndex)];
    }

    turnLeft(): void {
        const currIndex = indexOf(ClockwiseDirection, this.bearing);
        this.bearing = ClockwiseDirection[prevIndexOfClockwiseDirection(currIndex)];
    }

    at(x: number, y: number): void {
        this.coordinates = [x, y];
    }

    advance(): void {
        const moveCoordinate = 1;
        let x: number, y: number;
        switch (this.bearing) {
            case NORTH: x = this.coordinates[0]; y = this.coordinates[1] + moveCoordinate;
                break;
            case EAST: x = this.coordinates[0] + moveCoordinate; y = this.coordinates[1];
                break;
            case SOUTH: x = this.coordinates[0]; y = this.coordinates[1] - moveCoordinate;
                break;
            case WEST: x = this.coordinates[0] - moveCoordinate; y = this.coordinates[1];
                break;
            default: throw 'Invalid Robot Bearing';
        }
        this.at(x, y);
    }

    instructions(stream: string): string[] {
        const result: string[] = [];
        for (const char of stream) {
            const methods = Object.getOwnPropertyNames(Robot.prototype);
            switch (char) {
                case 'L': result.push(methods.filter(methodName => methodName.includes('turnLeft'))[0]);
                    break;

                case 'R': result.push(methods.filter(methodName => methodName.includes('turnRight'))[0]);
                    break;

                case 'A': result.push(methods.filter(methodName => methodName.includes('advance'))[0]);
                    break;
                default: throw 'Invalid Instruction'; //Or may be regex /^[lraLRA]$/.test(char)
            }
        }
        return result;
    }

    evaluate(stream: string): void {
        const instructionList = this.instructions(stream);
        instructionList.forEach((instruction) => {
            const move: voidFn = getClassProperty<Robot, keyof IRobot>(this, instruction as keyof IRobot);
            move.bind(this)();
        })
    }
}