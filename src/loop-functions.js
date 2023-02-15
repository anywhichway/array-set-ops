const loopFunctions = {
    forEach(f) {
        return [...this].forEach(f)
    },
    map(f) {
        return new this.constructor([...this].map(f))
    },
    reduce(f) {
        return [...this].reduce(f)
    }
}

export {loopFunctions,loopFunctions as default};