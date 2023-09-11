import { Action } from "./constants";

export type ActionType = keyof typeof Action;

export interface RobotType<Type> {
    bearing?: string;
    coordinates: [number, number];
    [Action.A](): Type;
    [Action.L](): Type;
    [Action.R](): Type;
}