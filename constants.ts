
export enum Orientation {
    north = 'north',
    east = 'east',
    south = 'south',
    west = 'west',
}

export const ClockwiseDirection = [...Object.values(Orientation)] as const;
