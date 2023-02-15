# array-set-ops

Extremely fast set and map/reduce operations for Arrays and Sets.

## Set Operations For Arrays and Sets

- difference(...iterables)
- intersection(...iterables)
- symmetricDifference(...iterables)
- union(...iterables)

If the above methods are called on a Set, a Set is returned. If called on an Array, an Array of unique elements is returned

- isDisjointFrom(...iterables)
- isSubsetOf(...iterables)
- isSupersetOf(...iterables)

The `...iterables` passed as arguments can be Arrays, Sets, Maps, or custom iterables.

## Loop Functions For Sets

- forEach
- map
- reduce

Array instances returned by the set operations are also patched to be more efficient.

# Installation

```
npm install array-set-ops
```

# Usage

```javascript
import {classPrototype,loopFunctions} from "array-set-ops";

Object.assign(Set.prototype,classPrototype);
Object.assign(Array.prototype,classPrototype);
Object.assign(Set.prototype,loopFunctions); // optional if you desire forEach, map, reduce on Sets
```

*Note*: `forEach`, `map`, `reduce` are highly optimized for `union` and are present on Set results from `union` even if the prototype is not patched.

# Unit Testing

Unit testing is conducted with Mocha and C8.

23 passing (43ms)

-------------------------|---------|----------|---------|---------|---------------------------------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                           
-------------------------|---------|----------|---------|---------|---------------------------------------------
All files                |   92.13 |    84.25 |   82.35 |   92.13 |                                            
difference.js           |     100 |       75 |     100 |     100 | 29,38                                      
index.js                |     100 |      100 |     100 |     100 |                                            
intersection.js         |     100 |    94.44 |     100 |     100 | 50                                         
is-disjoint-from.js     |     100 |      100 |     100 |     100 |                                            
is-subset-of.js         |     100 |     62.5 |     100 |     100 | 27-30,32                                   
is-superset-of.js       |     100 |     62.5 |     100 |     100 | 27-30,32                                   
loop-functions.js       |     100 |      100 |     100 |     100 |                                            
symmetric-difference.js |     100 |      100 |     100 |     100 |                                            
union.js                |   78.12 |    81.39 |   57.14 |   78.12 | 41-47,51-57,68-73,75-76,107-108,118-127,154
-------------------------|---------|----------|---------|---------|---------------------------------------------


# Change History (Reverse Chronological Order)

2023-02-18 v0.1.0 First public release