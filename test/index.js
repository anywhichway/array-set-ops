
const chai = await import("chai"),
    expect = chai.expect,
    {classPrototype,difference,intersection,symmetricDifference,union} = await import("../src/index.js"),
    {loopFunctions} = await import("../src/loop-functions.js"),
    {aggregateFunctions} = await import("../src/aggregate-functions.js"),
    {cartesianProduct,CartesianProduct} = await import("../src/cartesian-product.js");

classPrototype.patch(Set);
Object.assign(Set.prototype,loopFunctions);
Object.assign(Set.prototype,aggregateFunctions);
Set.prototype.cartesianProduct = cartesianProduct;
classPrototype.patch(Array);
Object.assign(Array.prototype,aggregateFunctions);
Array.prototype.cartesianProduct = cartesianProduct;

describe("Cartesian",() => {
    it("CartesianProduct",() => {
        const product = CartesianProduct([1,2],[2,1]);
        expect(product.size).to.equal(4);
        expect(product.at(0)[0]).to.equal(1);
        expect(product.at(0)[1]).to.equal(2);
        expect(product.at(1)[0]).to.equal(1);
        expect(product.at(1)[1]).to.equal(1);
        expect(product.at(2)[0]).to.equal(2);
        expect(product.at(2)[1]).to.equal(2);
        expect(product.at(3)[0]).to.equal(2);
        expect(product.at(3)[1]).to.equal(1);
    });
    it("at",() => {
        const product = CartesianProduct([1,2],[2,1]);
        expect(product.at(1)[0]).to.equal(1);
        expect(product.at(1)[1]).to.equal(1);
    });
    it("every",() => {
        const product = CartesianProduct([1,2],[2,1]);
        let i = 0;
        expect(product.every((item) => expect(Array.isArray(item)).to.equal(true) && ++i)).to.equal(true);
        expect(i).to.equal(4);
    });
    it("filter",() => {
        const product = CartesianProduct([1,2],[2,1]);
        expect(product.filter((item) => item).length).to.equal(4);
    });
    it("findIndex",() => {
        const product = CartesianProduct([1,2],[2,1]);
        expect(product.findIndex(([a,b]) => a===2 && b===2)).to.equal(2);
    });
    it("forEach",() => {
        const product = CartesianProduct([1,2],[2,1]);
        const result = [];
        product.forEach(([a,b],i) => result[i] = [++a,++b]);
        expect(result.length).to.equal(4);
        expect(result.at(0)[0]).to.equal(2);
        expect(result.at(0)[1]).to.equal(3);
        expect(result.at(1)[0]).to.equal(2);
        expect(result.at(1)[1]).to.equal(2);
        expect(result.at(2)[0]).to.equal(3);
        expect(result.at(2)[1]).to.equal(3);
        expect(result.at(3)[0]).to.equal(3);
        expect(result.at(3)[1]).to.equal(2);
    });
    it("map",() => {
        const product = CartesianProduct([1,2],[2,1]);
        expect(product.size).to.equal(4);
        const mapped = product.map(([a,b]) => [a+1,b+1]);
        expect(mapped.length).to.equal(4);
        expect(mapped.at(0)[0]).to.equal(2);
        expect(mapped.at(0)[1]).to.equal(3);
        expect(mapped.at(1)[0]).to.equal(2);
        expect(mapped.at(1)[1]).to.equal(2);
        expect(mapped.at(2)[0]).to.equal(3);
        expect(mapped.at(2)[1]).to.equal(3);
        expect(mapped.at(3)[0]).to.equal(3);
        expect(mapped.at(3)[1]).to.equal(2);
    });
    it("map.iterable",() => {
        const product = CartesianProduct([1,2],[2,1]);
        let mapped = product.map.iterable(([a,b]) => [a+1,b+1]);
        expect(typeof(mapped.next)).to.equal("function");
        mapped = [...mapped];
        expect(mapped.length).to.equal(4);
        expect(mapped.at(0)[0]).to.equal(2);
        expect(mapped.at(0)[1]).to.equal(3);
        expect(mapped.at(1)[0]).to.equal(2);
        expect(mapped.at(1)[1]).to.equal(2);
        expect(mapped.at(2)[0]).to.equal(3);
        expect(mapped.at(2)[1]).to.equal(3);
        expect(mapped.at(3)[0]).to.equal(3);
        expect(mapped.at(3)[1]).to.equal(2);
    });
    it("reduce",() => {
        const product = CartesianProduct([1,2],[2,1]),
            reduced = product.reduce(([ra,rb],[a,b]) => [ra-1,rb-1])
        expect(reduced.length).to.equal(2);
        expect(reduced[0]).to.equal(-2);
        expect(reduced[1]).to.equal(-1);
    });
    it("reduce with start",() => {
        const product = CartesianProduct([1,2],[2,1]),
            reduced = product.reduce(([ra,rb],[a,b]) => [ra+a,rb+b],[1,1])
        expect(reduced.length).to.equal(2);
        expect(reduced[0]).to.equal(7);
        expect(reduced[1]).to.equal(7);
    });
    it("reduceRight",() => {
        const product = CartesianProduct([1,2],[2,1]),
            reduced = product.reduceRight(([ra,rb],[a,b]) => [ra-a,rb-b])
        expect(reduced.length).to.equal(2);
        expect(reduced[0]).to.equal(-2);
        expect(reduced[1]).to.equal(-4);
    });
    it("slice.iterable",() => {
        const product = CartesianProduct([1,2],[2,1]);
        const section = product.slice(2,4);
        expect(section.length).to.equal(2);
        expect(section[0][0]).to.equal(2);
        expect(section[0][1]).to.equal(2);
        expect(section[1][0]).to.equal(2);
        expect(section[1][1]).to.equal(1);
    });
    it("slice iterable",() => {
        const product = CartesianProduct([1,2],[2,1]);
        const slice = product.slice.iterable(2,4);
        expect(typeof(slice.next)).to.equal("function");
        const section = [...slice];
        expect(section.length).to.equal(2);
        expect(section[0][0]).to.equal(2);
        expect(section[0][1]).to.equal(2);
        expect(section[1][0]).to.equal(2);
        expect(section[1][1]).to.equal(1);
    });
    it("loop",() => {
        const product = CartesianProduct([1,2],[2,1]);
        let i = 0;
        for(const item of product) {
            if(i==0) {
                expect(item[0]).to.equal(1);
                expect(item[1]).to.equal(2);
            } else if(i===1) {
                expect(item[0]).to.equal(1);
                expect(item[1]).to.equal(1);
            } else if(i===2) {
                expect(item[0]).to.equal(2);
                expect(item[1]).to.equal(2);
            } else if(i===3) {
                expect(item[0]).to.equal(2);
                expect(item[1]).to.equal(1);
            }
            i++
        }
    })
    xit("Array cartesianProduct",() => {
        const product = [1,2].cartesianProduct([2,1]);
        expect(product.length).to.equal(4);
        expect(product.at(0)[0]).to.equal(1);
        expect(product.at(0)[1]).to.equal(2);
        expect(product.at(1)[0]).to.equal(1);
        expect(product.at(1)[1]).to.equal(1);
        expect(product.at(2)[0]).to.equal(2);
        expect(product.at(2)[1]).to.equal(2);
        expect(product.at(3)[0]).to.equal(2);
        expect(product.at(3)[1]).to.equal(1);
    });
})

describe("Array",() => {
    it("intersection",() => {
        const result = intersection([1,2,3,4],[2,4]);
        expect(result.length).to.equal(2);
        expect(result[0]).to.equal(2);
        expect(result[1]).to.equal(4);
    })
    it("class intersection",() => {
        const array = new Array(1,2,3,4),
            result = array.intersection([2,4]);
        expect(result.length).to.equal(2);
        expect(result[0]).to.equal(2);
        expect(result[1]).to.equal(4);
    })
    it("intersection.iterable",() => {
        const array = new Array(1,2,3,4),
            result = array.intersection.iterable([2,4]);
        let i = 0;
        for(const item of result) {
            if(i===0) expect(item).to.equal(2);
            if(i===1) expect(item).to.equal(4);
            i++;
        }
        expect(i).to.equal(2);
    })
    it("union",() => {
        const result = union([1,2,4],[3,4]);
        expect(result.length).to.equal(4);
        expect(result[0]).to.equal(1);
        expect(result[1]).to.equal(2);
        expect(result[2]).to.equal(4);
        expect(result[3]).to.equal(3);
    })
    it("class union",() => {
        const array = new Array(1,2,4),
            result = array.union([3,4]);
        expect(result.length).to.equal(4);
        expect(result[0]).to.equal(1);
        expect(result[1]).to.equal(2);
        expect(result[2]).to.equal(4);
        expect(result[3]).to.equal(3);
    })
    it("union.iterable",() => {
        const array = new Array(1,2,4),
            result = array.union.iterable([3,4]);
        let i = 0;
        for(const item of result) {
            if(i===0) expect(item).to.equal(1);
            if(i===1) expect(item).to.equal(2);
            if(i===2) expect(item).to.equal(4);
            if(i===3) expect(item).to.equal(3);
            i++;
        }
        expect(i).to.equal(4);
    })
    it("union - spread",() => {
        const array = new Array(1,2,4),
            result = [...array.union([3,4])];
        expect(result.length).to.equal(4);
        expect(result[0]).to.equal(1);
        expect(result[1]).to.equal(2);
        expect(result[2]).to.equal(4);
        expect(result[3]).to.equal(3);
    })
    it("union - for",() => {
        const array = new Array(1,2,3),
            result = array.union([3,4]);
        let i = 0;
        for(const item of result) {
            expect(item).to.equal(++i);
        }
        expect(i).to.equal(4);
    })
    it("difference",() => {
        const result = difference([1,2,4],[3,4]);
        expect(result.length).to.equal(2);
        expect(result[0]).to.equal(1);
        expect(result[1]).to.equal(2);
    })
    it("class difference",() => {
        const array = new Array(1,2,4),
            result = array.difference([3,4]);
        expect(result.length).to.equal(2);
        expect(result[0]).to.equal(1);
        expect(result[1]).to.equal(2);
    })
    it("difference.iterable",() => {
        const array = new Array(1,2,4),
            result = array.difference.iterable([3,4]);
        let i = 0;
        for(const item of result) {
            if(i===0) expect(item).to.equal(1);
            if(i===1) expect(item).to.equal(2);
            i++;
        }
        expect(i).to.equal(2);
    })
    it("symmetricDifference",() => {
        const result = symmetricDifference([1,2,4],[3,4]);
        expect(result.length).to.equal(3);
        expect(result[0]).to.equal(1);
        expect(result[1]).to.equal(2);
        expect(result[2]).to.equal(3);
    })
    it("class symmetricDifference",() => {
        const array = new Array(1,2,4),
            result = array.symmetricDifference([3,4]);
        expect(result.length).to.equal(3);
        expect(result[0]).to.equal(1);
        expect(result[1]).to.equal(2);
        expect(result[2]).to.equal(3);
    })
    it("isSubsetOf",() => {
        const array = new Array(1,2,4),
            result = array.isSubsetOf([1,2,3,4,5]);
        expect(result).to.equal(true)
    })
    it("isSupersetOf",() => {
        const array = new Array(1,2,4),
            result = array.isSupersetOf([1,2]);
        expect(result).to.equal(true)
    })
    it("isDisjointFrom",() => {
        const array = new Array(1,2,4),
            result = array.isDisjointFrom([5,6,7]);
        expect(result).to.equal(true)
    })
    it("isDisjointFrom - false",() => {
        const array = new Array(1,2,4),
            result = array.isDisjointFrom([1,2,4,5]);
        expect(result).to.equal(false)
    })
})

describe("Set",() => {
    it("intersection",() => {
        const set = new Set([1,2,3,4]),
            result = set.intersection([2,4]);
        expect(result.size).to.equal(2);
        expect(result.has(2)).to.equal(true);
        expect(result.has(4)).to.equal(true);
    });
    it("intersection - forEach",() => {
        const set = new Set([1,2,3,4]),
            result = set.intersection([1,2]);
        result.forEach((item,i) => {
            expect(item).to.equal(i+1)
        })
        expect(result.size).to.equal(2);
    });
    it("intersection - map",() => {
        const set = new Set([1,2,3,4]),
            result = set.intersection([1,2]).map((item) => item);
        expect(result.size).to.equal(2);
    });
    it("intersection - reduce",() => {
        const set = new Set([1,2,3,4]),
            result = set.intersection([1,2]).reduce((sum,item) => sum + item);
        expect(result).to.equal(3);
    });
    it("union",() => {
        const set = new Set([1,2,4]),
            result = set.union([3,4]);
        expect(result.size).to.equal(4);
        expect(result.has(1)).to.equal(true);
        expect(result.has(2)).to.equal(true);
        expect(result.has(3)).to.equal(true);
        expect(result.has(4)).to.equal(true);
    })
    it("union - spread",() => {
        const set = new Set([1,2,4]),
            result = [...set.union([3,4])];
        expect(result.length).to.equal(4);
        expect(result[0]).to.equal(1);
        expect(result[1]).to.equal(2);
        expect(result[2]).to.equal(4);
        expect(result[3]).to.equal(3);
    })
    it("union - for",() => {
        const set = new Set([1,2,3]),
            result = set.union([3,4]);
        let i = 0;
        for(const item of result) {
            expect(item).to.equal(++i);
        }
        expect(i).to.equal(4);
    })
    it("union - forEach",() => {
        const set = new Set([1,2,3]),
            result = set.union([3,4]);
        result.forEach((item,i) => {
            expect(item).to.equal(i+1);
        })
        expect(result.size).to.equal(4);
    })
    it("symmetricDifference",() => {
        const set = new Set([1,2,4]),
            result = set.symmetricDifference([3,4]);
        expect(result.size).to.equal(3);
        expect(result.has(1)).to.equal(true);
        expect(result.has(2)).to.equal(true);
        expect(result.has(3)).to.equal(true);
    })
    it("isSubsetOf",() => {
        const set = new Set([1,2,4]),
            result = set.isSubsetOf([1,2,3,4,5]);
        expect(result).to.equal(true)
    })
    it("isSupersetOf",() => {
        const set = new Set([1,2,4]),
            result = set.isSupersetOf([1,2]);
        expect(result).to.equal(true)
    })
    it("isDisjointFrom",() => {
        const array = new Set([1,2,4]),
            result = array.isDisjointFrom([5,6,7]);
        expect(result).to.equal(true)
    })
    it("isDisjointFrom - false",() => {
        const array = new Set([1,2,4]),
            result = array.isDisjointFrom([1,2,4,5]);
        expect(result).to.equal(false)
    })
})