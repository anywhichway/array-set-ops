import difference from "./difference.js";
import intersection from "./intersection.js";
import symmetricDifference from "./symmetric-difference.js";
import union from "./union.js";
import isDisjointFrom from "./is-disjoint-from.js";
import isSupersetOf from "./is-superset-of.js";
import isSubsetOf from "./is-subset-of.js";

const classPrototype = {
    patch(cls) {
        Object.entries({difference,intersection,symmetricDifference,union}).forEach(([name,f]) => {
            Object.defineProperty(cls.prototype,name,{get() {
                    const ctx = this;
                    return new Proxy(f,{
                        get(target,property) {
                            const value = target[property];
                            if(typeof(value)==="function") return value.bind(ctx);
                            return value;
                        }
                    })
                }})

        })
        Object.assign(cls.prototype,{
            isSubsetOf,
            isSupersetOf,
            isDisjointFrom,
        })
    }
}

const d = (base,...rest) => difference.call(base,...rest);
const i = (base,...rest) => intersection.call(base,...rest);
const s = (base,...rest) => symmetricDifference.call(base,...rest);
const u = (base,...rest) => union.call(base,...rest);

export {
    classPrototype,
    classPrototype as default,
    d as difference,
    i as intersection,
    s as symmetricDifference,
    u as union
}