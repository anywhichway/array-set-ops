function* difference(...args) {
    args = args.slice(1).map((arg) => arg instanceof Set ? arg : new Set(arg));
    const base = Array.isArray(arguments[0]) ? arguments[0] : [...arguments[0]],
        len = args.length,
        diff = new Set(),
        memory = new Set();
    for(let i=0;i<base.length;i++) { // for each item in the base
        let item = base[i];
        if(!(diff.has(item) || memory.has(item))) { // if it is not already part of the difference or seen
            memory.add(item);
            let j;
            for (j=0; j < len; j++) { // see if another arg contains it
                if (args[j].has(item)) {
                    break; // it is contained
                }
            }
            if (j === args.length) { // it was not contained, so add to difference
                diff.add(item);
                yield item;
            }
        }
    }
}

export {
    difference,
    difference as default
}