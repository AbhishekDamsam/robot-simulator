
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
