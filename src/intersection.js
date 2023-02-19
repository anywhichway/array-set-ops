/* MIT License
Copyright (c) 2023 Simon Y. Blackwell & 2019 Ophir LOJKINE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

import {loopFunctions} from "./loop-functions.js";

/* Portions of algorithm taken from old version of https://github.com/lovasoa/fast_array_intersect under MIT license */
    const create = (iterating) => {
        let i, j, len, nOthers, args, result, memory;
        return function() {
            const set = this instanceof Set;
            if(!args) {
                args = [].sort.call([this,...arguments],(a,b) => a.length - b.length);
                nOthers = args.length - 1;
                result = [];
                memory = new Map();
                i = 0;
                j = 0;
            }
            for(;i<=nOthers;i++) {
                let array = args[i];
                if(!Array.isArray(array)) args[i] = array = [...array];
                const len = array.length;
                while(j<len) {
                    const elem = array[j];
                    if (memory.get(elem) === i - 1) {
                        if(i===nOthers) {
                            result[result.length] = elem;
                            memory.set(elem,0);
                            if(iterating) {
                                j++;
                                return {value:elem}
                            }
                        } else {
                            memory.set(elem,i)
                        }
                    } else if (i === 0) {
                        memory.set(elem,0);
                    }
                    j++;
                }
                j=0;
            }
            args = null;
            return iterating ? {done:true} : (set ? new Set(result) : result);
        }
    }
function iterable(...args) {
    const intersect = create(true),
        set = this instanceof Set;
    let started;
    return {
        next() {
            if (started) {
                return intersect();
            }
            started = true;
            return intersect(...args);
        },
        [Symbol.iterator]() {
            started = false;
            return this;
        },
        ...loopFunctions
    }
}

const intersection = create();
Object.defineProperty(intersection,"iterable",{get() {
    return iterable.bind(this);
}});

export {intersection,intersection as default};
