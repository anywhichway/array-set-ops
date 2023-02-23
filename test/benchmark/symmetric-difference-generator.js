function* symmetricDifference(...args) {
        const arrays = args.map((item) => item instanceof Set ? [...item] : item),
            sets = args.map((item) => item instanceof Set ? item : new Set(item)),
            memory = new Set(),
            diff = new Set();
    for(let i=0;i<arrays.length;i++) {
        const array = arrays[i];
        for(let j=0;j<array.length;j++) {
            const item = array[j];
            if(!(diff.has(item) || memory.has(item))) {
                memory.add(item);
                let k = 0;
                for(k;k<sets.length;k++) {
                    if(k===i) continue;
                    if(sets[k].has(item)) break;
                }
                if(k===sets.length) {
                    diff.add(item);
                    yield item;
                }
            }
        }
    }
}

export {
    symmetricDifference,
    symmetricDifference as default
}