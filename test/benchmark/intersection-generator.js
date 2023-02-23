function* intersection(...args) {
        args.sort((a,b) => a.length - b.length);
        const nOthers = args.length - 1,
            memory = new Map();
        let j = 0;
    for(let i=0;i<=nOthers;i++) {
        let array = args[i];
        if(!Array.isArray(array)) args[i] = array = [...array];
        const len = array.length;
        while(j<len) {
            const elem = array[j];
            if (memory.get(elem) === i - 1) {
                if(i===nOthers) {
                    memory.set(elem,0);
                    yield elem;
                } else {
                    memory.set(elem,i)
                }
            } else if (i === 0) {
                memory.set(elem,0);
            }
            j++;
        }
        j=0;
    }
}

export {
    intersection,
    intersection as default
}