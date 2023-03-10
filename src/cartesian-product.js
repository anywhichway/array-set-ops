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

/// portions from http://phrogz.net/lazy-cartesian-product

function CartesianProduct(...collections) {
    if(!(this instanceof CartesianProduct)) return new CartesianProduct(...collections);
    collections = collections.map((item) => Array.isArray(item) ? item : [...item]);
    for (var dm=[],f=1,l,i=collections.length;i--;f*=l){ dm[i]=[f,l=collections[i].length] };
    var n = 0;
    Object.defineProperty(this,"next",{configurable:true,writable:true,value:
        function() {
          while(n<f) {
              for (var c=[],i=collections.length;i--;)c[i]=collections[i][(n/dm[i][0]<<0)%dm[i][1]];
              n++;
               return {value:c};
            }
            n = 0;
            return {done: true};
        }});
    Object.defineProperty(this,"at",{configurable:true,writable:true,value:function(n) {
        for (var c=[],i=collections.length;i--;)c[i]=collections[i][(n/dm[i][0]<<0)%dm[i][1]];
        return c;
    }});
    Object.assign(this,{
        [Symbol.iterator]() {
            return this;
        }
    });
    const ctx = this;
    Object.defineProperty(this.filter,"iterable",{configurable:true,*value(start=0,end) {
            for(const item of ctx) {
                if(f(item)) yield item;
            }
        }
    });
    Object.defineProperty(this.map,"iterable",{configurable:true,*value(f) {
        for(const item of ctx) {
            yield f(item)
        }
    }});
    Object.defineProperty(this.slice,"iterable",{configurable:true,*value(start=0,end) {
        const size = ctx.size;
            end ||= size;
            end = Math.min(end,size);
            if(end<0) {
                end = size - end;
            }
            while(start<end) {
                yield ctx.at(start);
                start++;
            }
        }
    });
    Object.defineProperty(this,"size",{configurable:true,get() { return f; }});
    return this;
}
CartesianProduct.prototype.arrayLike = function(allowSet) {
    return new Proxy(this,{
        get(target,key) {
            const num = parseFloat(key);
            return num==key ? (allowSet ? target[Math.round(num)] || target.at(Math.round(num)) : target.at(Math.round(num))) : target[key];
        },
        set(target,key, value) {
            if(allowSet) {
                target[key] = value;
                return true;
            }
            let num = parseFloat(key);
            if(num==key) {
                throw new Error(`Can't update values in array like CartesianProduct`)
            }
            target[key] = value;
            return true;
        }
    })
}
CartesianProduct.prototype.filter = function(f) {
    const result = [];
    let i = 0;
    for (const item of this) {
        if(f(item, i, this)) {
           result.push(item)
        }
        i++;
    }
    return result;
}
CartesianProduct.prototype.map = function(f) {
    const result = [];
    let i = 0;
    for (const item of this) {
        const value = f(item, i, this);
        result[i++] = value;
    }
    return result;
}
CartesianProduct.prototype.reduceRight = function(f,result) {
    let i = this.size;
    while(--i>=0) {
        if (result === undefined) result = this.at(i);
        else result = f(result, this.at(i), i, this);
    }
    return result;
}
CartesianProduct.prototype.slice = function(start=0,end) {
    const items = [], size = this.size;
    end ||= size;
    end = Math.min(end,size);
    if(end<0) {
        end = size - end;
    }
    while(start<end) {
        items.push(this.at(start));
        start++;
    }
    return items;
}

import loopFunctions from "./loop-functions.js";
Object.entries(loopFunctions).forEach(([key,value]) => {
    if(!["at","filter","map","reduceRight","slice"].includes(key)) {
        CartesianProduct.prototype[key] = value;
    }
})

function cartesianProduct(...collections) {
    const cp = new CartesianProduct(this,...collections);
    return this instanceof Set ? new Set([...cp]) : [...cp];
}

export {cartesianProduct,CartesianProduct,CartesianProduct as default};
