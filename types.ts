import { Action } from "./constants";

export type Enum = { [s: number]: string };

export interface RobotType<Type> {
    bearing?: string;
    coordinates: [number, number];
    [Action.A](): Type;
    [Action.L](): Type;
    [Action.R](): Type;
}