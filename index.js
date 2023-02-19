function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequired1f4"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequired1f4"] = parcelRequire;
}
parcelRequire.register("3Zole", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "loopFunctions", () => $2e79f34cf327f706$export$a42bef84e41fffbb);
$parcel$export(module.exports, "default", () => $2e79f34cf327f706$export$a42bef84e41fffbb);
parcelRequire("5ETxi");
const $2e79f34cf327f706$export$a42bef84e41fffbb = {
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
            if (!f(item, i++, this)) return false;
        }
        return true;
    },
    filter (f) {
        const set = this instanceof Set, result = set ? new Set() : [];
        let i = 0;
        for (const item of this)if (f(item, i++, this)) set ? result.add(item) : result.push(item);
        return result;
    },
    find (f) {
        let i = 0;
        for (const item of this){
            if (f(item, i++, this)) return item;
        }
    },
    findIndex (f) {
        let i = 0;
        for (const item of this){
            if (f(item, i++, this)) return i;
        }
    },
    forEach (f) {
        let i = 0;
        for (const item of this)f(item, i++, this);
    },
    map (f) {
        const set = this instanceof Set, result = set ? new Set() : [];
        let i = 0;
        for (const item of this){
            const value = f(item, i++, this);
            set ? result.add(value) : result[i] = value;
        }
        return result;
    },
    reduce (f, result) {
        let i = 0;
        for (const item of this)if (result === undefined) result = item;
        else result = f(result, item, i++, this);
        return result;
    },
    reduceRight (f, result) {
        return Array.isArray(this) ? this.reduceRight(f, result) : [
            ...this
        ].reduceRight(f, result);
    },
    some (f) {
        let i = 0;
        for (const item of this){
            if (f(item, i++, this)) return true;
        }
        return false;
    }
};

});
parcelRequire.register("5ETxi", function(module, exports) {
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
 */ /// portions from http://phrogz.net/lazy-cartesian-product
function $41ebc47611258f50$export$43a96c507d59f1a5(...collections) {
    if (!(this instanceof $41ebc47611258f50$export$43a96c507d59f1a5)) return new $41ebc47611258f50$export$43a96c507d59f1a5(...collections);
    collections = collections.map((item)=>Array.isArray(item) ? item : [
            ...item
        ]);
    for(var dm = [], f = 1, l, i = collections.length; i--; f *= l)dm[i] = [
        f,
        l = collections[i].length
    ];
    let started;
    Object.defineProperty(this, "next", {
        configurable: true,
        writable: true,
        value: function() {
            if (!started) {
                var p = [], max = collections.length - 1, lens = [], d = 0;
                for(var i = collections.length; i--;)lens[i] = collections[i].length;
                started = true;
            }
            while(p.length){
                const a = collections[d], len = lens[d];
                for(let i = 0; i < len; ++i)p[d] = a[i];
                if (d === max) return {
                    value: p
                };
                else d++;
                p.pop();
            }
            started = false;
            return {
                done: true
            };
        }
    });
    Object.defineProperty(this, "at", {
        configurable: true,
        writable: true,
        value: function(n) {
            for(var c = [], i = collections.length; i--;)c[i] = collections[i][(n / dm[i][0] << 0) % dm[i][1]];
            return c;
        }
    });
    Object.defineProperty(this, [
        Symbol.Iterator
    ], {
        configurable: true,
        get () {
            return this;
        }
    });
    Object.defineProperty(this, "length", {
        configurable: true,
        get () {
            return f;
        }
    });
    return this;
}

const $41ebc47611258f50$var$loopFunctions = (await Promise.resolve((parcelRequire("3Zole")))).default;
Object.entries($41ebc47611258f50$var$loopFunctions).forEach(([key, value])=>{
    if (key !== "at") Object.defineProperty($41ebc47611258f50$export$43a96c507d59f1a5.prototype, "key", {
        configurable: true,
        writable: true,
        value: value
    });
});
function $41ebc47611258f50$export$c65d93cbdf0a1094(...collections) {
    const cp = new $41ebc47611258f50$export$43a96c507d59f1a5(this, ...collections);
    return this instanceof Set ? new Set([
        ...cp
    ]) : [
        ...cp
    ];
}

});


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
var $3Zole = parcelRequire("3Zole");
/* Portions of algorithm taken from old version of https://github.com/lovasoa/fast_array_intersect under MIT license */ const $1d6902f2c8ca2182$var$create = (iterating)=>{
    let i, j, base, nOthers, args, memory, diff;
    return function() {
        const set = this instanceof Set;
        if (!args) {
            args = [
                ...arguments
            ], base = set ? [
                ...this
            ] : this;
            memory = new Set();
            diff = new Set(), i = 0;
            j = 0;
        }
        for(; i < base.length; i++){
            const item = base[i];
            if (!memory.has(item)) {
                memory.add(item);
                for(; j < args.length; j++){
                    let arg = args[j];
                    if (!(arg instanceof Set)) arg = args[j] = new Set(arg);
                    if (arg.has(item)) break;
                }
                if (j === args.length) {
                    diff.add(item);
                    if (iterating) return {
                        value: item
                    };
                }
            }
            j = 0;
        }
        args = null;
        return iterating ? {
            done: true
        } : set ? diff : [
            ...diff
        ];
    };
};
function $1d6902f2c8ca2182$var$iterable(...args) {
    const difference = $1d6902f2c8ca2182$var$create(true), set = this instanceof Set;
    let started;
    return {
        next () {
            if (started) return difference();
            started = true;
            return difference(...args);
        },
        [Symbol.iterator] () {
            started = false;
            return this;
        },
        ...(0, $3Zole.loopFunctions)
    };
}
const $1d6902f2c8ca2182$export$acaf96a27438246b = $1d6902f2c8ca2182$var$create();
Object.defineProperty($1d6902f2c8ca2182$export$acaf96a27438246b, "iterable", {
    get () {
        return $1d6902f2c8ca2182$var$iterable.bind(this);
    }
});


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
var $3Zole = parcelRequire("3Zole");
/* Portions of algorithm taken from old version of https://github.com/lovasoa/fast_array_intersect under MIT license */ const $7d92985b693b5ee7$var$create = (iterating)=>{
    let i, j, len, nOthers, args, result, memory;
    return function() {
        const set = this instanceof Set;
        if (!args) {
            args = [].sort.call([
                this,
                ...arguments
            ], (a, b)=>a.length - b.length);
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
                        result[result.length] = elem;
                        memory.set(elem, 0);
                        if (iterating) {
                            j++;
                            return {
                                value: elem
                            };
                        }
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
function $7d92985b693b5ee7$var$iterable(...args) {
    const intersect = $7d92985b693b5ee7$var$create(true), set = this instanceof Set;
    let started;
    return {
        next () {
            if (started) return intersect();
            started = true;
            return intersect(...args);
        },
        [Symbol.iterator] () {
            started = false;
            return this;
        },
        ...(0, $3Zole.loopFunctions)
    };
}
const $7d92985b693b5ee7$export$bc86dfbf7795668c = $7d92985b693b5ee7$var$create();
Object.defineProperty($7d92985b693b5ee7$export$bc86dfbf7795668c, "iterable", {
    get () {
        return $7d92985b693b5ee7$var$iterable.bind(this);
    }
});


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

var $3Zole = parcelRequire("3Zole");
/* Portions of algorithm taken from old version of https://github.com/lovasoa/fast_array_intersect under MIT license */ const $795045768c282dd9$var$create = (iterating)=>{
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
                if (!memory.has(item)) {
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
        return iterating ? {
            done: true
        } : set ? diff : [
            ...diff
        ];
    };
};
function $795045768c282dd9$var$iterable(...args) {
    const symmetricDifference = $795045768c282dd9$var$create(true), set = this instanceof Set;
    let started;
    return {
        next () {
            if (started) return symmetricDifference();
            started = true;
            return symmetricDifference(...args);
        },
        [Symbol.iterator] () {
            started = false;
            return this;
        },
        ...(0, $3Zole.loopFunctions)
    };
}
const $795045768c282dd9$export$4cd1b4d03646b02c = $795045768c282dd9$var$create();
Object.defineProperty($795045768c282dd9$export$4cd1b4d03646b02c, "iterable", {
    get () {
        return $795045768c282dd9$var$iterable.bind(this);
    }
});


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
var $3Zole = parcelRequire("3Zole");
/* Portions of algorithm taken from old version of https://github.com/lovasoa/fast_array_intersect under MIT license */ const $4e80d28291a67501$var$create = (iterating)=>{
    let i, j, nOthers, args, memory;
    return function() {
        const set = this instanceof Set;
        if (!args) {
            args = [
                this,
                ...arguments
            ];
            nOthers = args.length - 1;
            memory = new Set();
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
                const elem = array[j++];
                if (!memory.has(elem)) {
                    memory.add(elem);
                    if (iterating) return {
                        value: elem
                    };
                }
            }
            j = 0;
        }
        args = null;
        return iterating ? {
            done: true
        } : set ? memory : [
            ...memory
        ];
    };
};
function $4e80d28291a67501$var$iterable(...args) {
    const union = $4e80d28291a67501$var$create(true), set = this instanceof Set;
    let started;
    return {
        next () {
            if (started) return union();
            started = true;
            return union(...args);
        },
        [Symbol.iterator] () {
            started = false;
            return this;
        },
        ...(0, $3Zole.loopFunctions)
    };
}
const $4e80d28291a67501$export$971dd5b0dfd021b6 = $4e80d28291a67501$var$create();
Object.defineProperty($4e80d28291a67501$export$971dd5b0dfd021b6, "iterable", {
    get () {
        return $4e80d28291a67501$var$iterable.bind(this);
    }
});


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
    difference: $1d6902f2c8ca2182$export$acaf96a27438246b,
    intersection: $7d92985b693b5ee7$export$bc86dfbf7795668c,
    symmetricDifference: $795045768c282dd9$export$4cd1b4d03646b02c,
    union: $4e80d28291a67501$export$971dd5b0dfd021b6,
    isSubsetOf: $4651de7ca80cac86$export$2b09cdc61b8a3240,
    isSupersetOf: $20098100dd9d9520$export$22c04563e192ea02,
    isDisjointFrom: $eacc4266f55dc114$export$3b086d46cb5f10ec
};


export {$cf838c15c8b009ba$export$61c7cc1fdf4f602b as classPrototype, $cf838c15c8b009ba$export$61c7cc1fdf4f602b as default};
//# sourceMappingURL=index.js.map
