export type voidFn = () => void;

export type Coordinates = [number, number];

export interface IRobot {
    turnRight: voidFn;
    turnLeft: voidFn;
    advance: voidFn;
}