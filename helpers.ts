import { ClockwiseDirection } from "./constants";

export const getDirection = (index: number) => {
    const arrLength = ClockwiseDirection.length;
    return ClockwiseDirection[(index % arrLength + arrLength) % arrLength];
}
