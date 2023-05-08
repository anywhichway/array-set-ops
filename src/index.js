import {difference,iterableDifference} from "./difference.js";
import {intersection,iterableIntersection} from "./intersection.js";
import {symmetricDifference,iterableSymmetricDifference} from "./symmetric-difference.js";
import {union,iterableUnion} from "./union.js";
import isDisjointFrom from "./is-disjoint-from.js";
import isSupersetOf from "./is-superset-of.js";
import isSubsetOf from "./is-subset-of.js";
import {createIterable} from "./create-iterable.js";

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
d.iterable = (base,...rest) => iterableDifference.call(base,...rest);
const i = (base,...rest) => intersection.call(base,...rest);
i.iterable = (base,...rest) => iterableIntersection.call(base,...rest);
const s = (base,...rest) => symmetricDifference.call(base,...rest);
s.iterable = (base,...rest) => iterableSymmetricDifference.call(base,...rest);
const u = (base,...rest) => union.call(base,...rest);
u.iterable = (base,...rest) => iterableUnion.call(base,...rest);

const sub = (base,...rest) => isSubsetOf.call(base,...rest)
const sup = (base,...rest) => isSupersetOf.call(base,...rest)
const dis = (base,...rest) => isDisjointFrom.call(base,...rest)

export {
    classPrototype,
    classPrototype as default,
    d as difference,
    i as intersection,
    s as symmetricDifference,
    u as union,
    sub as isSubsetOf,
    sup as isSupersetOf,
    dis as isDisjointFrom
}