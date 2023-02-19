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

import intersection from "./intersection.js";
/* Portions of algorithm taken from old version of https://github.com/lovasoa/fast_array_intersect under MIT license */
const create = (iterating) => {
    let i, j, base, nOthers, args, memory, seen, diff;
    return function () {
        const set = this instanceof Set;
        if(!args) {
            args = [...arguments],
            base = set ? [...this] : this;
            diff = new Set();
            i = 0;
            j = 0;
        }
        for(;i<base.length;i++) {
            let item = base[i];
            for(;j<args.length;j++) {
                const arg = args[j];
                if(Array.isArray(arg) ? arg.includes(item) : arg.has(item)) {
                    break
                }
            }
            if(j===args.length) {
                if(iterating) {
                    i++;
                    j = 0;
                    return {value: item};
                }
                diff.add(item);
            }
            j = 0;
        }
        args = null;
        return iterating ? { done: true} : (set ? diff : [...diff]);
    }
}
function iterable(...args) {
    const difference = create(true),
        ctx = this;
    let started;
    return {
        next() {
            if (started) {
                return difference();
            }
            started = true;
            return difference.call(ctx,...args);
        },
        [Symbol.iterator]() {
            started = false;
            return this;
        },
        ...loopFunctions
    }
}

const difference = create();
difference.iterable = iterable;


export {difference,difference as default}