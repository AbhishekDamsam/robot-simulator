import { ClockwiseDirection } from "./constants";
import { Enum } from "./types";

export const getDirection = (index: number) => {
    const arrLength = ClockwiseDirection.length;
    return ClockwiseDirection[(index % arrLength + arrLength) % arrLength];
}

export function isEnumKey<T extends Enum>(enumSrc: T, key: unknown) : key is keyof T {
    return !!enumSrc[key as keyof T];
  }
