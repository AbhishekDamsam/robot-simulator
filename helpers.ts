import { ClockwiseDirection } from "./constants";
import { Enum } from "./types";

export const getDirection = (index: number) => {
    const arrLength = ClockwiseDirection.length;
    return ClockwiseDirection[(index % arrLength + arrLength) % arrLength];
}

export function isEnumKey<T extends Enum>(enumSrc: T, key: unknown) : key is keyof T {
    return !!enumSrc[key as keyof T];
}

type numType = {

}

//https://www.youtube.com/watch?v=IPcAeo1ZKEk&list=PLYvdvJlnTOjF6aJsWWAt7kZRJvzw-en8B&index=46

export class State<T>{
    constructor(public current: T){}
    update(next: Partial<T>): T {
        return { ...this.current, ...next};
    }
    right<T extends { x: number}>(next: T): T {
        next.x = next.x + 1;
        return { ...this.current, ...next};
    }
    left<T extends { x: number}>(next: T): T {
        next.x = next.x + 1;
        return { ...this.current, ...next};
    }
}

const state = new State({x: 0, y:0})
state.update({x: 1, y: 7});
console.log(state.current);
state.right(state.current)
