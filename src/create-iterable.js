import {loopFunctions} from "./loop-functions.js";

function createIterable(setFunction) {
    return function(...args) {
        const f = setFunction(true),
            ctx = this;
        let started;
        return {
            next() {
                if (started) {
                    return f(); // fast, don't push args on stack, not needed!
                }
                started = true;
                return f.call(ctx,...args);
            },
            [Symbol.iterator]() {
                started = false; // reset so iteration can be done again
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
