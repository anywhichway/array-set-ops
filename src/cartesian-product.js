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
    for (var dm=[],f=1,l,i=collections.length;i--;f*=l){ dm[i]=[f,l=collections[i].length] }
    let started;
    Object.defineProperty(this,"next",{configurable:true,writable:true,value:
        function() {
            if(!started) {
                var p=[],max=collections.length-1,lens=[], d = 0;
                for (var i=collections.length;i--;) lens[i]=collections[i].length;
                started = true;
            }
            while(p.length) {
                const a=collections[d], len=lens[d];
                for (let i=0;i<len;++i) p[d]=a[i];
                if(d===max) {
                    return {value: p}
                } else {
                    d++;
                }
                p.pop();
            }
            started = false;
            return {done: true}
        }});
        Object.defineProperty(this,"at",{configurable:true,writable:true,value:function(n) {
            for (var c=[],i=collections.length;i--;)c[i]=collections[i][(n/dm[i][0]<<0)%dm[i][1]];
            return c;
        }});
        Object.defineProperty(this,[Symbol.Iterator],{configurable:true,get() { return this; }})
        Object.defineProperty(this,"length",{configurable:true,get() { return f; }});
        return this;
    }

const loopFunctions = (await import("./loop-functions.js")).default;
Object.entries(loopFunctions).forEach(([key,value]) => {
    if(key!=="at") Object.defineProperty(CartesianProduct.prototype,"key",{configurable:true,writable:true,value})
})

function cartesianProduct(...collections) {
    const cp = new CartesianProduct(this,...collections);
    return this instanceof Set ? new Set([...cp]) : [...cp];
}

export {cartesianProduct,CartesianProduct,CartesianProduct as default};
