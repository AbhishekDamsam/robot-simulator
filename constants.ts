
type OrientType = 
| "north"
| "east"
| "south"
| "west"

export enum Orientation {
    north = 'north',
    east = 'east',
    south = 'south',
    west = 'west',
}

export const ClockwiseDirection = [...Object.values(Orientation)] as const;

export enum Action {
    L = "turnLeft",
    R = "turnRight",
    A = "advance"
}

const Action1 =  {
    L: "turnLeft",
    R: "turnRight",
    A: "advance"
} as const;

type ObjectValues<T> = T[keyof T];
export type ActionType =  ObjectValues<typeof Action1>;
console.log(Action1.A)

function log(action: ActionType){console.log(action)}
log("advance");

type Enum = (typeof Action1)
type EnumValues = (typeof Action1)[keyof typeof Action1]