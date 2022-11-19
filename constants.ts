export const NORTH = 'north';
export const EAST = 'east';
export const SOUTH = 'south';
export const WEST = 'west';
export const ClockwiseDirection = [NORTH, EAST, SOUTH, WEST] as const; //New directions can be added in clockwise

export enum Movement {
    turnRight = 'turnRight',
    turnLeft = 'turnLeft',
    advance = 'advance'
}