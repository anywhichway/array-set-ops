/* MIT License
Copyright (c) 2023 Simon Y. Blackwell

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

import intersection from "./intersection.js";

/* MIT License
Copyright (c) 2023 Simon Y. Blackwell

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
    let i, j, k, arrays,  sets, memory, diff;
    return function() {
        const set = this instanceof Set;
        if(!arrays) {
            arrays = [this,...arguments].map((item) => item instanceof Set ? [...item] : item),
            sets = [this,...arguments].map((item) => item instanceof Set ? item : new Set(item)),
            memory = new Set(),
            diff = new Set(),
            i = 0;
            j = 0;
            k = 0;
        }
        for(;i<arrays.length;i++) {
            const array = arrays[i];
            for(;j<array.length;j++) {
                const item = array[j];
                if(!memory.has(item)) {
                    memory.add(item);
                    for(;k<sets.length;k++) {
                        if(k===i) continue;
                        if(sets[k].has(item)) break;
                    }
                    if(k===sets.length) {
                        diff.add(item);
                        if(iterating) {
                            k = 0;
                            return {value:item}
                        }
                        k = 0;
                    }
                }
            }
            j = 0;
        }
        arrays = null;
        return iterating ? {done:true} : (set ? diff : [...diff]);
    }
}
function iterable(...args) {
    const symmetricDifference = create(true),
        set = this instanceof Set;
    let started;
    return {
        next() {
            if (started) {
                return symmetricDifference();
            }
            started = true;
            return symmetricDifference(...args);
        },
        [Symbol.iterator]() {
            started = false;
            return this;
        },
        ...loopFunctions
    }
}

const symmetricDifference = create();
Object.defineProperty(symmetricDifference,"iterable",{get() {
        return iterable.bind(this);
    }});

export {symmetricDifference,symmetricDifference as default}
