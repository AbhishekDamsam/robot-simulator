import { Movement } from "./constants";

export type voidFn = () => void;

export type Coordinates = [number, number];

export interface IRobot {
    [Movement.turnRight]: voidFn;
    [Movement.turnLeft]: voidFn;
    [Movement.advance]: voidFn;
}