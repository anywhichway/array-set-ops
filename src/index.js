import difference from "./difference.js";
import intersection from "./intersection.js";
import symmetricDifference from "./symmetric-difference.js";
import union from "./union.js";
import isDisjointFrom from "./is-disjoint-from.js";
import isSupersetOf from "./is-superset-of.js";
import isSubsetOf from "./is-subset-of.js";
import loopFunctions from "./loop-functions.js";

const classPrototype = {
    difference,
    intersection,
    symmetricDifference,
    union,
    isSubsetOf,
    isSupersetOf,
    isDisjointFrom
}



export {loopFunctions,classPrototype,classPrototype as default}