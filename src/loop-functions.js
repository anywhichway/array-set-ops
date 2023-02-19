import CartesianProduct from "./cartesian-product.js";
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
            const value = f(item, i++, this);
            set ? result.add(value) : result[i] = value;
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
    some(f) {
        let i = 0;
        for (const item of this) {
            if(f(item, i++, this)) return true;
        }
        return false;
    }
}

export {loopFunctions,loopFunctions as default};