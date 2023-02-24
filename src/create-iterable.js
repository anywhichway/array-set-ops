import {loopFunctions} from "./loop-functions.js";

function createIterable(setFunction) {
    return function(...args) {
        const f = setFunction(true),
            ctx = this;
        return {
            next() {
                return f.call(ctx,...args);
            },
            [Symbol.iterator]() {
                return this;
            },
            ...loopFunctions
        }
    }
}

export {
    createIterable,
    createIterable as default
}
