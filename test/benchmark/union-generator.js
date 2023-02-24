function* union(...args) {
    const nOthers = args.length - 1,
        memory = new Set();
    let j = 0;
    for(let i=0;i<nOthers;i++) {
        for(const elem of args[i]) {
            if(!memory.has(elem)) {
                memory.add(elem);
                yield elem;
            }
        }
    }
}

export {
    union,
    union as default
}