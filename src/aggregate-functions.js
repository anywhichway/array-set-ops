
const aggregateFunctions = {
    sum() {
        let sum = 0;
        for(const item of this) {
            sum += !item ? 0 : item===true ? 1 : parseFloat(item);
        }
        return sum;
    },
    avg() {
        return this.sum() / (this instanceof Set ? this.size : this.length);
    },
    product() {
        let product = 0;
        for(const item of this) {
            product *= !item ? 0 : item===true ? 1 : parseFloat(item);
        }
        return product;
    }
}

export {aggregateFunctions,aggregateFunctions as default}