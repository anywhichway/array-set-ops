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

import {createIterable} from "./create-iterable.js";

/* Portions of algorithm taken from https://gist.github.com/lovasoa/3361645 under MIT license */
const unionizor = (iterating) => {
    let i, j, nOthers, args, memory;
    return function() {
        const set = this instanceof Set;
        if(!args) {
            args = [this,...arguments];
            nOthers = args.length - 1;
            memory = new Set();
            i = 0;
            j = 0;
        }
        for(;i<=nOthers;i++) {
            let array = args[i];
            if(!Array.isArray(array)) args[i] = array = [...array];
            const len = array.length;
            while(j<len) {
                const elem = array[j++];
                if(!memory.has(elem)) {
                    memory.add(elem);
                    if(iterating) {
                        return {value:elem}
                    }
                }
            }
            j=0;
        }
        args = null;
        return iterating ? {done:true} : (set ? memory : [...memory]);
    }
}
function iterable(...args) {
    const union = create(true),
        ctx = this;
    let started;
    return {
        next() {
            if (started) {
                return union();
            }
            started = true;
            return union.call(ctx,...args);
        },
        [Symbol.iterator]() {
            started = false;
            return this;
        },
        ...loopFunctions
    }
}

const union = unionizor();
//union.iterable = iterable;
union.iterable = createIterable(unionizor)


export {union,union as default};

