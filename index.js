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
    at (index) {
        if (index >= 0) {
            let i = 0;
            for (const item of this){
                if (i === index) return item;
                i++;
            }
            return;
        }
        const array = !Array.isArray(this) ? [
            ...this
        ] : this;
        return array[array.length - index - 1];
    },
    every (f) {
        let i = 0;
        for (const item of this){
            if (!f(item, i, this)) return false;
            i++;
        }
        return true;
    },
    filter (f) {
        const set = this instanceof Set, result = set ? new Set() : [];
        let i = 0;
        for (const item of this){
            if (f(item, i, this)) set ? result.add(item) : result.push(item);
            i++;
        }
        return result;
    },
    find (f) {
        let i = 0;
        for (const item of this){
            if (f(item, i, this)) return item;
            i++;
        }
    },
    findIndex (f) {
        let i = 0;
        for (const item of this){
            if (f(item, i, this)) return i;
            i++;
        }
    },
    forEach (f) {
        let i = 0;
        for (const item of this){
            f(item, i, this);
            i++;
        }
    },
    map (f) {
        const set = this instanceof Set, result = set ? new Set() : [];
        let i = 0;
        for (const item of this){
            const value = f(item, i, this);
            set ? result.add(value) : result[i++] = value;
        }
        return result;
    },
    reduce (f, result) {
        let i = 0;
        for (const item of this){
            if (result === undefined) result = item;
            else result = f(result, item, i, this);
            i++;
        }
        return result;
    },
    reduceRight (f, result) {
        Array.isArray(this) ? this.reduceRight(f, result) : [
            ...this
        ].reduceRight(f, result);
    },
    slice (start = 0, end) {
        const set = this instanceof Set, memory = set ? new Set() : [], len = set ? this.size : this.length;
        if (end === undefined) end = len;
        end = Math.min(end, len);
        if (end < 0) end = len - end;
        let i = 0;
        for (const item of this){
            if (i >= start) {
                if (i < end) set ? memory.add(item) : memory.push(item);
                else break;
            }
            i++;
        }
        return memory;
    },
    some (f) {
        let i = 0;
        for (const item of this){
            if (f(item, i++, this)) return true;
        }
        return false;
    }
};
const $2e79f34cf327f706$var$filter = $2e79f34cf327f706$export$a42bef84e41fffbb.filter;
Object.defineProperty($2e79f34cf327f706$export$a42bef84e41fffbb, "filter", {
    configurable: true,
    get () {
        const ctx = this;
        return new Proxy($2e79f34cf327f706$var$filter, {
            get (target, key) {
                if (key === "iterable") return function*(f) {
                    let i = 0;
                    for (const item of ctx)if (f(item, i++, ctx)) yield item;
                };
                return target[key];
            }
        });
    }
});
const $2e79f34cf327f706$var$map = $2e79f34cf327f706$export$a42bef84e41fffbb.map;
Object.defineProperty($2e79f34cf327f706$export$a42bef84e41fffbb, "map", {
    configurable: true,
    get () {
        const ctx = this;
        return new Proxy($2e79f34cf327f706$var$map, {
            get (target, key) {
                if (key === "iterable") {
                    const f = function*(f) {
                        let i = 0;
                        for (const item of f.ctx || ctx){
                            const value = f(item, i++, this);
                            yield value;
                        }
                    };
                    return f;
                }
                return target[key];
            }
        });
    }
});
const $2e79f34cf327f706$var$slice = $2e79f34cf327f706$export$a42bef84e41fffbb.slice;
Object.defineProperty($2e79f34cf327f706$export$a42bef84e41fffbb, "slice", {
    configurable: true,
    get () {
        const ctx = this;
        return new Proxy($2e79f34cf327f706$var$slice, {
            get (target, key) {
                if (key === "iterable") return function*(start = 0, end) {
                    const set = ctx instanceof Set, len = set ? this.size : this.length;
                    if (end === undefined) end = len;
                    end = Math.min(end, len);
                    if (end < 0) end = len - end;
                    let i = 0;
                    for (const item of ctx){
                        if (i >= start) {
                            if (i < end) yield item;
                            else break;
                        }
                        i++;
                    }
                };
                return target[key];
            }
        });
    }
});


function $83be53f676a4c193$export$f9c2f07d6e2a6221(setFunction) {
    return function(...args) {
        const f = setFunction(true), ctx = this;
        return {
            next () {
                return f.call(ctx, ...args);
            },
            [Symbol.iterator] () {
                return this;
            },
            ...(0, $2e79f34cf327f706$export$a42bef84e41fffbb)
        };
    };
}


const $1d6902f2c8ca2182$var$differ = (iterating)=>{
    let i, j, base, args, len, diff, memory;
    return function() {
        if (!args) {
            args = [].map.call(arguments, (arg)=>arg instanceof Set ? arg : new Set(arg));
            len = args.length;
            base = Array.isArray(this) ? this : [
                ...this
            ];
            diff = new Set();
            memory = new Set();
            i = 0;
            j = 0;
        }
        for(; i < base.length; i++){
            let item = base[i];
            if (!(diff.has(item) || memory.has(item))) {
                memory.add(item);
                for(; j < len; j++){
                    if (args[j].has(item)) break; // it is contained
                }
                if (j === args.length) {
                    diff.add(item);
                    if (iterating) {
                        i++;
                        j = 0;
                        return {
                            value: item
                        };
                    }
                }
                j = 0;
            }
        }
        args = null;
        memory = null;
        return iterating ? {
            done: true
        } : Array.isArray(this) ? [
            ...diff
        ] : diff;
    };
};
const $1d6902f2c8ca2182$export$acaf96a27438246b = $1d6902f2c8ca2182$var$differ();
$1d6902f2c8ca2182$export$acaf96a27438246b.iterable = (0, $83be53f676a4c193$export$f9c2f07d6e2a6221)($1d6902f2c8ca2182$var$differ);


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
/* Portions of algorithm taken from old version of https://github.com/lovasoa/fast_array_intersect under MIT license */ const $7d92985b693b5ee7$var$intersector = (iterating)=>{
    let i, j, len, nOthers, args, result, memory;
    return function() {
        const set = this instanceof Set;
        if (!args) {
            args = [
                this,
                ...arguments
            ].sort((a, b)=>a.length - b.length);
            nOthers = args.length - 1;
            result = [];
            memory = new Map();
            i = 0;
            j = 0;
        }
        for(; i <= nOthers; i++){
            let array = args[i];
            if (!Array.isArray(array)) args[i] = array = [
                ...array
            ];
            const len = array.length;
            while(j < len){
                const elem = array[j];
                if (memory.get(elem) === i - 1) {
                    if (i === nOthers) {
                        memory.set(elem, 0);
                        if (iterating) {
                            j++;
                            return {
                                value: elem
                            };
                        } else result[result.length] = elem;
                    } else memory.set(elem, i);
                } else if (i === 0) memory.set(elem, 0);
                j++;
            }
            j = 0;
        }
        args = null;
        return iterating ? {
            done: true
        } : set ? new Set(result) : result;
    };
};
const $7d92985b693b5ee7$export$bc86dfbf7795668c = $7d92985b693b5ee7$var$intersector();
$7d92985b693b5ee7$export$bc86dfbf7795668c.iterable = (0, $83be53f676a4c193$export$f9c2f07d6e2a6221)($7d92985b693b5ee7$var$intersector);


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

/* Portions of algorithm taken from old version of https://github.com/lovasoa/fast_array_intersect under MIT license */ const $795045768c282dd9$var$differ = (iterating)=>{
    let i, j, k, arrays, sets, memory, diff;
    return function() {
        const set = this instanceof Set;
        if (!arrays) {
            arrays = [
                this,
                ...arguments
            ].map((item)=>item instanceof Set ? [
                    ...item
                ] : item), sets = [
                this,
                ...arguments
            ].map((item)=>item instanceof Set ? item : new Set(item)), memory = new Set(), diff = new Set(), i = 0;
            j = 0;
            k = 0;
        }
        for(; i < arrays.length; i++){
            const array = arrays[i];
            for(; j < array.length; j++){
                const item = array[j];
                if (!(diff.has(item) || memory.has(item))) {
                    memory.add(item);
                    for(; k < sets.length; k++){
                        if (k === i) continue;
                        if (sets[k].has(item)) break;
                    }
                    if (k === sets.length) {
                        diff.add(item);
                        if (iterating) {
                            k = 0;
                            return {
                                value: item
                            };
                        }
                        k = 0;
                    }
                }
            }
            j = 0;
        }
        arrays = null;
        sets = null;
        memory = null;
        return iterating ? {
            done: true
        } : set ? diff : [
            ...diff
        ];
    };
};
const $795045768c282dd9$export$4cd1b4d03646b02c = $795045768c282dd9$var$differ();
$795045768c282dd9$export$4cd1b4d03646b02c.iterable = (0, $83be53f676a4c193$export$f9c2f07d6e2a6221)($795045768c282dd9$var$differ);


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
 */ /* MIT License
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
/* Portions of algorithm taken from https://gist.github.com/lovasoa/3361645 under MIT license */ const $4e80d28291a67501$var$unionizor = (iterating)=>{
    let i, j, ctx, nOthers, thisDone, args, memory;
    return function(...args) {
        if (!ctx) {
            ctx = Array.isArray(this) ? this : [
                ...this
            ];
            nOthers = args.length - 1;
            memory = new Set();
            thisDone = false;
            i = 0;
            j = 0;
        }
        while(i <= nOthers){
            let array = thisDone ? args[i++] : ctx;
            array = array === ctx || Array.isArray(array) ? array : [
                ...array
            ];
            const len = array.length;
            while(j < len){
                const elem = array[j++];
                if (iterating && !memory.has(elem)) {
                    memory.add(elem);
                    return {
                        value: elem
                    };
                }
                memory.add(elem);
            }
            thisDone = true;
            j = 0;
        }
        ctx = null;
        return iterating ? {
            done: true
        } : this instanceof Set ? memory : [
            ...memory
        ];
    };
};
const $4e80d28291a67501$export$971dd5b0dfd021b6 = $4e80d28291a67501$var$unionizor();
//union.iterable = iterable;
$4e80d28291a67501$export$971dd5b0dfd021b6.iterable = (0, $83be53f676a4c193$export$f9c2f07d6e2a6221)($4e80d28291a67501$var$unionizor);


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
    for (const item of this){
        if (args.some((arg, i)=>{
            return Array.isArray(arg) ? arg.includes(item) : arg.has(item);
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
    for (let set of args){
        if (set instanceof Set && set.size > base.size) return false;
        for (const item of set){
            if (base.has(item)) continue;
            return false;
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
    if (Array.isArray(base)) base = new Set(base);
    for (let set of args){
        if (set instanceof Set) {
            if (set.size < base.size) return false;
            for (const item of base){
                if (set.has(item)) continue;
                return false;
            }
        } else for (const item of base){
            if (set.includes(item)) continue;
            return false;
        }
    }
    return true;
}



const $cf838c15c8b009ba$export$61c7cc1fdf4f602b = {
    patch (cls) {
        Object.entries({
            difference: $1d6902f2c8ca2182$export$acaf96a27438246b,
            intersection: $7d92985b693b5ee7$export$bc86dfbf7795668c,
            symmetricDifference: $795045768c282dd9$export$4cd1b4d03646b02c,
            union: $4e80d28291a67501$export$971dd5b0dfd021b6
        }).forEach(([name, f])=>{
            Object.defineProperty(cls.prototype, name, {
                get () {
                    const ctx = this;
                    return new Proxy(f, {
                        get (target, property) {
                            const value = target[property];
                            if (typeof value === "function") return value.bind(ctx);
                            return value;
                        }
                    });
                }
            });
        });
        Object.assign(cls.prototype, {
            isSubsetOf: $4651de7ca80cac86$export$2b09cdc61b8a3240,
            isSupersetOf: $20098100dd9d9520$export$22c04563e192ea02,
            isDisjointFrom: $eacc4266f55dc114$export$3b086d46cb5f10ec
        });
    }
};
const $cf838c15c8b009ba$export$acaf96a27438246b = (base, ...rest)=>(0, $1d6902f2c8ca2182$export$acaf96a27438246b).call(base, ...rest);
const $cf838c15c8b009ba$export$bc86dfbf7795668c = (base, ...rest)=>(0, $7d92985b693b5ee7$export$bc86dfbf7795668c).call(base, ...rest);
const $cf838c15c8b009ba$export$4cd1b4d03646b02c = (base, ...rest)=>(0, $795045768c282dd9$export$4cd1b4d03646b02c).call(base, ...rest);
const $cf838c15c8b009ba$export$971dd5b0dfd021b6 = (base, ...rest)=>(0, $4e80d28291a67501$export$971dd5b0dfd021b6).call(base, ...rest);
const $cf838c15c8b009ba$export$2b09cdc61b8a3240 = (base, ...rest)=>(0, $4651de7ca80cac86$export$2b09cdc61b8a3240).call(base, ...rest);
const $cf838c15c8b009ba$export$22c04563e192ea02 = (base, ...rest)=>(0, $20098100dd9d9520$export$22c04563e192ea02).call(base, ...rest);
const $cf838c15c8b009ba$export$3b086d46cb5f10ec = (base, ...rest)=>(0, $eacc4266f55dc114$export$3b086d46cb5f10ec).call(base, ...rest);


export {$cf838c15c8b009ba$export$61c7cc1fdf4f602b as classPrototype, $cf838c15c8b009ba$export$61c7cc1fdf4f602b as default, $cf838c15c8b009ba$export$acaf96a27438246b as difference, $cf838c15c8b009ba$export$bc86dfbf7795668c as intersection, $cf838c15c8b009ba$export$4cd1b4d03646b02c as symmetricDifference, $cf838c15c8b009ba$export$971dd5b0dfd021b6 as union, $cf838c15c8b009ba$export$2b09cdc61b8a3240 as isSubsetOf, $cf838c15c8b009ba$export$22c04563e192ea02 as isSupersetOf, $cf838c15c8b009ba$export$3b086d46cb5f10ec as isDisjointFrom, $83be53f676a4c193$export$f9c2f07d6e2a6221 as createIterable};
//# sourceMappingURL=index.js.map
