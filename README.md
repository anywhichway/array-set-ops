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

Object.assign(Set.prototype,classPrototype);
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
------------------------|---------|----------|---------|---------|---------------------------------------------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                       
------------------------|---------|----------|---------|---------|---------------------------------------------------------
All files               |   46.66 |     90.9 |       0 |   46.66 |                                                        
cartesian-product.js    |   37.68 |       50 |       0 |   37.68 | 25-57,60-69                                            
difference.js           |    36.9 |      100 |       0 |    36.9 | 26-77,81                                               
index.js                |     100 |      100 |     100 |     100 |                                                        
intersection.js         |   35.16 |      100 |       0 |   35.16 | 27-84,88                                               
is-disjoint-from.js     |   70.58 |      100 |       0 |   70.58 | 23-32                                                  
is-subset-of.js         |   55.81 |      100 |       0 |   55.81 | 23-41                                                  
is-superset-of.js       |   66.66 |      100 |       0 |   66.66 | 23-34                                                  
loop-functions.js       |   29.62 |      100 |       0 |   29.62 | 4-13,16-20,23-31,34-37,40-43,46-49,52-59,62-67,70,73-78
symmetric-difference.js |   48.67 |      100 |       0 |   48.67 | 50-106,110                                             
union.js                |   52.88 |      100 |       0 |   52.88 | 49-96,100                                              
------------------------|---------|----------|---------|---------|---------------------------------------------------------
```


# Change History (Reverse Chronological Order)

2023-02-18 v0.2.0 More documentation, more unit tests, almost complete and standardized API.

2023-02-18 v0.1.0 First public release