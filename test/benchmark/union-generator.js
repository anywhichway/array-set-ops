function* union(...args) {
    const nOthers = args.length - 1,
        memory = new Set();
    let j = 0;
    for(let i=0;i<nOthers;i++) {
        let array = args[i];
        if(!Array.isArray(array)) args[i] = array = [...array];
        const len = array.length;
        while(j<len) {
            const elem = array[j++];
            if(!memory.has(elem)) {
                memory.add(elem);
                yield elem;
            }
        }
        j=0;
    }
}

export {
    union,
    union as default
}