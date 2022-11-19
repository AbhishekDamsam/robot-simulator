import { ClockwiseDirection, NORTH, EAST, SOUTH, WEST, Movement } from "./constants";
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
        let x = this.coordinates[0];
        let y = this.coordinates[1];
        switch (this.bearing) {
            case NORTH: y = y + moveCoordinate;
                break;
            case EAST: x = x + moveCoordinate;
                break;
            case SOUTH: y = y - moveCoordinate;
                break;
            case WEST: x = x - moveCoordinate;
                break;
        }
        this.at(x, y);
    }

    instructions(stream: string): string[] {
        const result: string[] = [];
        for (const char of stream) {
            let movement: string;
            switch (char) {
                case 'L': movement = Movement.turnLeft;
                    break;

                case 'R': movement = Movement.turnRight;
                    break;

                case 'A': movement = Movement.advance;
                    break;

                default: throw 'Invalid Instruction'; //Or may be regex /^[lraLRA]$/.test(char)
            }
            result.push(movement);
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