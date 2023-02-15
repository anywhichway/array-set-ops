const chai = await import("chai"),
    expect = chai.expect,
    {classPrototype,loopFunctions} = await import("../src/index.js");

Object.assign(Set.prototype,classPrototype);
Object.assign(Set.prototype,loopFunctions);
Object.assign(Array.prototype,classPrototype);

describe("Array",() => {
    it("intersection",() => {
        const array = new Array(1,2,3,4),
            result = array.intersection([2,4]);
        expect(result.length).to.equal(2);
        expect(result[0]).to.equal(2);
        expect(result[1]).to.equal(4);
    })
    it("union",() => {
        const array = new Array(1,2,4),
            result = array.union([3,4]);
        expect(result.length).to.equal(4);
        expect(result[0]).to.equal(1);
        expect(result[1]).to.equal(2);
        expect(result[2]).to.equal(4);
        expect(result[3]).to.equal(3);
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
        const array = new Array(1,2,4),
            result = array.difference([3,4]);
        expect(result.length).to.equal(2);
        expect(result[0]).to.equal(1);
        expect(result[1]).to.equal(2);
    })
    it("symmetricDifference",() => {
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
        expect(result.length).to.equal(4);
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