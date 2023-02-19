# array-set-ops

Extremely fast set `difference`, `intersection`, `symmetricDifference`, `union` operations on `Sets` and `Arrays`.

All the standard map/reduce/find operations for `Sets`.

`CartesianProduct` as a first class object like `Set` and `Array`. And, `cartesianProduct` asa method on both.

Option to use static or iterable/generative approaches for all operations.

# API

## Set Operations For Arrays and Sets

<Array|Set>.

- cartesianProduct(...iterables)
- difference(...iterables)
- intersection(...iterables)
- symmetricDifference(...iterables)
- union(...iterables)

- isDisjointFrom(...iterables)
- isSubsetOf(...iterables)
- isSupersetOf(...iterables)

The `...iterables` passed as arguments can be `Arrays` or `Sets`. Other iterables like `Map` may work, but have not been tested.

## Loop Functions For Sets

<Set>.

- at(number index)
- cartesianProduct(...iterables)
- every(function f)
- filter(function f)
- findIndex(any value)
- filter(function f)
- forEach(function f)
- map(function f)
- reduce(function f)
- reduceRight(function f)
- some(function f)

## Aggregate Functions For Arrays and Sets

<Array|Set>.

- avg()
- product()
- sum()

## Loop And Aggregate Functions For Iterable Versions Of Set Operations

`operation` can be one of:

- difference
- intersection
- symmetricDifference
- union
- cartesianProduct

<Array|Set>.<operation>.iterator(...iterables)

- at(number index)
- cartesianProduct(...iterables)
- every(function f)
- filter(function f)
- findIndex(any value)
- filter(function f)
- forEach(function f)
- map(function f)
- reduce(function f)
- reduceRight(function f)
- some(function f)

- avg()
- product()
- sum()

By their nature, some of the above force full resolution of the iterable, e.g. `map` and `sum` while others do not, e.g. `at` and `findIndex`. Those that do not require full resolution will be faster than calling the same function on a non-iterator version of the same data. For example, the second two lines of code below will typically be more performant.

```javascript
const staticIntersection = [1,2,3,4,5,6,7,...lots of values].intersection([...lots more values],[...even more values]),
    v1 = staticIntersection[1000]; 

const iterableIntersection = [1,2,3,4,5,6,7,...lots of values].intersection.iterable([...lots more values],[...even more values]),
    v2 = iterableIntersection(1000)
```

Array instances returned by the set operations may also have methods patched to be more efficient that their native implementations.

# Installation

```
npm install array-set-ops
```

# Usage

```javascript
import {classPrototype} from "array-set-ops";
import {loopFunctions} from "../src/loop-functions.js",
import {aggregateFunctions} from "../src/aggregate-functions.js",
import {cartesianProduct,CartesianProduct} from "../src/cartesian-product.js";

classPrototype.patch(Set);
classPrototype.patch(Array);
Object.assign(Set.prototype,loopFunctions);
Object.assign(Set.prototype,aggregateFunctions); // optional
Set.prototype.cartesianProduct = cartesianProduct; // optional
Object.assign(Array.prototype,aggregateFunctions); // optional
Array.prototype.cartesianProduct = cartesianProduct; // optional

// the class CartesianProduct(...iterables) will also be available

```

See the file `./test/index.js` for examples.

# Unit Testing

Unit testing is conducted with Mocha and C8.

```
-------------------------|---------|----------|---------|---------|---------------------------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                     
-------------------------|---------|----------|---------|---------|---------------------------------------
All files                |   87.51 |    88.96 |      70 |   87.51 |                                      
 aggregate-functions.js  |   45.45 |      100 |       0 |   45.45 | 4-8,11,14-19                         
 cartesian-product.js    |   93.75 |    93.75 |   83.33 |   93.75 | 59-62                                
 difference.js           |     100 |    85.71 |     100 |     100 | 33,42,57                             
 index.js                |   97.72 |       90 |     100 |   97.72 | 18                                   
 intersection.js         |   97.77 |    96.15 |     100 |   97.77 | 54-55                                
 is-disjoint-from.js     |     100 |    85.71 |     100 |     100 | 26                                   
 is-subset-of.js         |   83.72 |    66.66 |     100 |   83.72 | 28-32,36-37                          
 is-superset-of.js       |   94.44 |    57.14 |     100 |   94.44 | 30-31                                
 loop-functions.js       |   51.25 |       80 |      30 |   51.25 | 3-12,15-19,22-30,33-36,39-42,69,72-77
 symmetric-difference.js |   80.53 |    90.47 |      50 |   80.53 | 76-78,89-107                         
 union.js                |     100 |      100 |     100 |     100 |                                      
-------------------------|---------|----------|---------|---------|---------------------------------------
```


# Change History (Reverse Chronological Order)

2023002019 v0.3.0 More unit tests. Performance tests. Simplified patching of Array and Class. Fixed algorithmic issues with `difference`.

2023-02-18 v0.2.0 More documentation, more unit tests, almost complete and standardized API.

2023-02-18 v0.1.0 First public release