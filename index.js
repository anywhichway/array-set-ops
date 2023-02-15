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
 */ const $2e79f34cf327f706$export$a42bef84e41fffbb = {
    forEach (f) {
        return [
            ...this
        ].forEach(f);
    },
    map (f) {
        return new this.constructor([
            ...this
        ].map(f));
    },
    reduce (f) {
        return [
            ...this
        ].reduce(f);
    }
};


function $1d6902f2c8ca2182$export$acaf96a27438246b(...args) {
    let base = this;
    const set = !Array.isArray(base), result = new Set();
    if (set) base = [
        ...base
    ];
    for (const item of base)if (!args.some((arg, i)=>{
        if (Array.isArray(arg)) arg = args[i] = new Set(arg);
        return arg.has(item);
    })) result.add(item);
    return set ? result : [
        ...result
    ];
}


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
 */ const $7d92985b693b5ee7$var$shortest = (args)=>{
    const len = args.length;
    let i = 0, j = 0, min = args[0].length;
    for(; i < len; i++)if (args[i].length < min) {
        min = args[i].length;
        j = i;
    }
    return j;
};
function $7d92985b693b5ee7$export$bc86dfbf7795668c(...args) {
    args = [
        this,
        ...args
    ].map((arg)=>Array.isArray(arg) ? arg : [
            ...arg
        ]);
    const set = !Array.isArray(this), shortestIndex = $7d92985b693b5ee7$var$shortest(args), maxlen = args.length - 1;
    let memory = new Set(args[shortestIndex]);
    for(let i = 0; i <= maxlen; i++){
        if (i === shortestIndex) continue;
        const found = new Set();
        for (const item of args[i])if (memory.has(item)) found.add(item);
        if (found.size === 0) return [];
        if (found.size < memory.size) memory = found;
    }
    return set ? memory : [
        ...memory
    ];
}


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
function $795045768c282dd9$export$4cd1b4d03646b02c(...args) {
    const set = !Array.isArray(this), result = new Set(), intersects = (0, $7d92985b693b5ee7$export$bc86dfbf7795668c).apply(set ? this : new Set(this), args);
    [
        this,
        ...args
    ].forEach((arg, i)=>{
        if (!Array.isArray(arg)) arg = [
            ...arg
        ];
        for (const item of arg)if (!intersects.has(item)) result.add(item);
    });
    return set ? result : [
        ...result
    ];
}


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
 */ function $4e80d28291a67501$export$971dd5b0dfd021b6(...iterables) {
    iterables = [
        this,
        ...iterables
    ];
    const set = !Array.isArray(this), memory = new Set(), results = [], target = set ? memory : results;
    let i = 0, k = 0, length;
    Object.defineProperty(target, "forEach", {
        value: (f)=>{
            let i = 0; // avoid accessing length
            for (const item of proxy)f(item, i++, proxy);
        }
    });
    Object.defineProperty(target, "map", {
        value: (f)=>{
            const result = [];
            let i = 0; // avoid accessing length
            for (const item of proxy)result[i] = f(item, i++, proxy);
            return set ? new Set(result) : result;
        }
    });
    Object.defineProperty(target, "reduce", {
        value: (f, result)=>{
            let i = 0; // avoid accessing length
            for (const item of proxy)if (result === undefined) result = item;
            else result = f(result, item, i++, proxy);
            return result;
        }
    });
    const proxy = new Proxy(target, {
        get (target, key) {
            const type = typeof key;
            let item = target[key];
            if (key !== "length" && key !== "size" && type !== "symbol") {
                if (item != undefined) {
                    if (typeof item === "function" && ![
                        "forEach",
                        "map",
                        "reduce"
                    ].includes(key)) return item.bind(target);
                    return item;
                }
                if (type === "string") {
                    const num = parseInt(key);
                    if (num + "" === key) key = num;
                }
                if (key < 0 || key === Infinity) throw new RangeError(`${key} is out of range`);
            }
            if (key === "length" || key === "size") {
                if (length >= 0) return length;
                key = Infinity;
            }
            if (typeof key === "number") {
                if (key >= length) return;
                if (key < results.length) return results[key];
                const il = iterables.length;
                let item;
                while(k < il){
                    let array = iterables[k];
                    if (!Array.isArray(array)) array = [
                        ...array
                    ];
                    const al = array.length;
                    while(key >= results.length && i < al){
                        item = array[i++];
                        if (!memory.has(item)) {
                            memory.add(item);
                            results[results.length] = item;
                        }
                    }
                    if (i === al) {
                        i = 0;
                        k++;
                    }
                    if (key <= results.length) break;
                }
                if (k === il) length = results.length;
                return key === Infinity ? length : item;
            }
            if (type === "symbol" && key.toString() === "Symbol(Symbol.iterator)") return ()=>{
                if (length >= 0) {
                    let l = 0;
                    return {
                        next () {
                            while(l < results.length)return {
                                value: results[l++]
                            };
                            return {
                                done: true
                            };
                        }
                    };
                }
                return {
                    next () {
                        while(k < iterables.length){
                            let array = iterables[k];
                            if (!Array.isArray(array)) array = [
                                ...array
                            ];
                            while(i < array.length){
                                const item = array[i++];
                                if (!memory.has(item)) {
                                    memory.add(item);
                                    results[results.length] = item;
                                    return {
                                        value: item
                                    };
                                }
                            }
                            if (i === array.length) {
                                i = 0;
                                k++;
                            }
                        }
                        length = results.length;
                        return {
                            done: true
                        };
                    }
                };
            };
            return target[key];
        }
    });
    return proxy;
}


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
 */ function $eacc4266f55dc114$export$3b086d46cb5f10ec(...args) {
    let base = this;
    if (!Array.isArray(base)) base = [
        ...base
    ];
    for (const item of base){
        if (args.some((arg, i)=>{
            if (Array.isArray(arg)) arg = args[i] = new Set(arg);
            return arg.has(item);
        })) return false;
    }
    return true;
}


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
 */ function $20098100dd9d9520$export$22c04563e192ea02(...args) {
    let base = this;
    if (Array.isArray(base)) base = new Set(base);
    args = args.map((arg)=>{
        return Array.isArray(arg) ? [
            ...new Set(arg)
        ] : arg;
    });
    for (const array of args){
        if (array.length > base.size) return false;
        for (const item of array){
            if (!base.has(item)) return false;
        }
    }
    return true;
}


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
 */ function $4651de7ca80cac86$export$2b09cdc61b8a3240(...args) {
    let base = this;
    if (Array.isArray(base)) base = [
        ...new Set(base)
    ];
    args = args.map((arg)=>{
        return Array.isArray(arg) ? new Set(arg) : arg;
    });
    for (const set of args){
        if (set.size < base.length) return false;
        for (const item of base){
            if (!set.has(item)) return false;
        }
    }
    return true;
}



const $cf838c15c8b009ba$export$61c7cc1fdf4f602b = {
    difference: $1d6902f2c8ca2182$export$acaf96a27438246b,
    intersection: $7d92985b693b5ee7$export$bc86dfbf7795668c,
    symmetricDifference: $795045768c282dd9$export$4cd1b4d03646b02c,
    union: $4e80d28291a67501$export$971dd5b0dfd021b6,
    isSubsetOf: $4651de7ca80cac86$export$2b09cdc61b8a3240,
    isSupersetOf: $20098100dd9d9520$export$22c04563e192ea02,
    isDisjointFrom: $eacc4266f55dc114$export$3b086d46cb5f10ec
};


export {$cf838c15c8b009ba$export$61c7cc1fdf4f602b as classPrototype, $cf838c15c8b009ba$export$61c7cc1fdf4f602b as default, $2e79f34cf327f706$export$a42bef84e41fffbb as loopFunctions};
//# sourceMappingURL=index.js.map
