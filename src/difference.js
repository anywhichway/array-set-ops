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


import {createIterable} from "./create-iterable.js";

const differ = (iterating) => {
    let i, j, base, args, len, diff, memory;
    return function () {
        if(!args) {
            args = [].map.call(arguments,(arg) => arg instanceof Set ? arg : new Set(arg));
            len = args.length;
            base = Array.isArray(this) ? this : [...this];
            diff = new Set();
            memory = new Set();
            i = 0;
            j = 0;
        }
        for(;i<base.length;i++) { // for each item in the base
            let item = base[i];
            if(!(diff.has(item) || memory.has(item))) { // if it is not already part of the difference or seen
                memory.add(item);
                for (; j < len; j++) { // see if another arg contains it
                    if (args[j].has(item)) {
                        break; // it is contained
                    }
                }
                if (j === args.length) { // it was not contained, so add to difference
                    diff.add(item);
                    if (iterating) {
                        i++;
                        j = 0;
                        return {value: item};
                    }
                }
                j = 0;
            }
        }
        args = null;
        memory = null;
        return iterating ? { done: true} : (Array.isArray(this) ? [...diff] : diff);
    }
}

const difference = differ();
difference.iterable = createIterable(differ);

export {difference,difference as default}