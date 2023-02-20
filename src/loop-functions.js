const loopFunctions = {
    at(index) {
        if(index>=0) {
            let i = 0;
            for (const item of this) {
                if(i===index) return item;
                i++;
            }
            return;
        }
        const array = !Array.isArray(this) ? [...this] : this;
        return array[(array.length-index)-1]
    },
    every(f) {
        let i = 0;
        for (const item of this) {
            if(!f(item, i++, this)) return false;
        }
        return true;
    },
    filter(f) {
        const set = this instanceof Set,
            result = set ? new Set() : [];
        let i = 0;
        for (const item of this) {
            if(f(item, i++, this)) {
                set ? result.add(item) : result.push(item)
            }
        }
        return result;
    },
    find(f) {
        let i = 0;
        for (const item of this) {
           if(f(item, i++, this)) return item
        }
    },
    findIndex(f) {
        let i = 0;
        for (const item of this) {
            if(f(item, i++, this)) return i
        }
    },
    forEach(f) {
        let i = 0;
        for (const item of this) {
            f(item, i++, this);
        }
    },
    map(f) {
        const set = this instanceof Set,
            result = set ? new Set() : [];
        let i = 0;
        for (const item of this) {
            const value = f(item, i, this);
            set ? result.add(value) : result[i++] = value;
        }
        return result;
    },
    reduce(f, result) {
        let i = 0;
        for (const item of this) {
            if (result === undefined) result = item;
            else result = f(result, item, i++, this);
        }
        return result;
    },
    reduceRight(f, result) {
        return Array.isArray(this) ? this.reduceRight(f,result) : [...this].reduceRight(f,result);
    },
    slice(start=0,end) {
        const set = this instanceof Set,
            memory = set ? new Set() : [],
            len = set ? this.size : this.length;
        if(end===undefined) {
            end = len;
        }
        end = Math.min(end,len);
        if(end<0) {
            end = len - end;
        }
        let i = 0;
        for(const item of this) {
            if(i>=start) {
                if(i<end) set ? memory.add(item) : memory.push(item)
                else break;
            }
            i++;
        }
        return memory;
    },
    some(f) {
        let i = 0;
        for (const item of this) {
            if(f(item, i++, this)) return true;
        }
        return false;
    }
}

const filter = loopFunctions.filter;
Object.defineProperty(loopFunctions,"filter",{configurable:true,get() {
        const ctx = this;
        return new Proxy(filter,{
            get(target,key) {
                if(key==="iterable") {
                    return function*(f) {
                        let i = 0;
                        for (const item of ctx) {
                            if(f(item, i++, ctx)) {
                                yield item;
                            }
                        }
                    }
                }
                return target[key];
            }
        })
    }})

const map = loopFunctions.map;
Object.defineProperty(loopFunctions,"map",{configurable:true,get() {
        const ctx = this;
        return new Proxy(map,{
            get(target,key) {
                if(key==="iterable") {
                    const f = function*(f) {
                        let i = 0;
                        for (const item of f.ctx||ctx) {
                            const value = f(item, i++, this);
                            yield value;
                        }
                    }
                    return f;
                }
                return target[key];
            }
        })
    }})

const slice = loopFunctions.slice;
Object.defineProperty(loopFunctions,"slice",{configurable:true,get() {
        const ctx = this;
        return new Proxy(slice,{
            get(target,key) {
                if(key==="iterable") {
                    return function*(start=0,end) {
                        const set = ctx instanceof Set,
                            len = set ? this.size : this.length;
                        if(end===undefined) {
                            end = len;
                        }
                        end = Math.min(end,len);
                        if(end<0) {
                            end = len - end;
                        }
                        let i = 0;
                        for(const item of ctx) {
                            if(i>=start) {
                                if(i<end) yield item;
                                else break;
                            }
                            i++;
                        }
                    }
                }
                return target[key];
            }
        })
    }})


export {loopFunctions,loopFunctions as default};