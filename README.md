# array-set-ops

Extremely fast set `difference`, `intersection`, `symmetricDifference`, `union` operations on `Sets` and `Arrays`.

All the standard map/reduce/find operations for `Sets`.

`CartesianProduct` as a first class object like `Set` and `Array`. And, `cartesianProduct` as a method on both.

Option to use static or iterable/generative approaches for all operations.

# API


## Direct Calls

### Cartesian Product

- `CartesianProduct(...iterables)` returns an instance of a `CartesianProduct` which is an iterable and also supports the standard map/reduce methods.

- Creation of the `CartesianProduct` is O(number of iterables).
- Access to any specific item in a `CartesianProduct` using `at(n)` is an O(number of iterables)
- Iteration across an entire `CartesianProduct` is O(product of lengths of iterables)

A naive Cartesian product implementation that computes all combinations is O(product of lengths of iterables).

```javascript
const naiveCartesian = (arrays) => arrays.reduce((a, b) => a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))),[]));
```

When the typical order of magnitude differences between the number of iterables and the product of their sizes is taken into account, this effectively makes `CartesianProduct` O(1) for creation and access while maintaining a similar speed for iterating across all combinations. However, the time to get the first item from `CartesianProduct` will be almost instantaneous and typically orders of magnitude faster than the first item from a naive implementation.

For example assume it takes 1ms to create a `CartesianProduct` from 5 arrays each having 100 items (it's actually far less, its on the order of .125ms). And assume that access to an item is 1ms (it's actually far less, its on the order of .125ms). Then access to the first item will be 2ms and the last 100^5 ms. For a naive implementation access to the first item will be 100^5 ms!

A generator like the below will solve problem related to accessing the first item.

```javascript
function* generatorCartesian([head, ...tail]) {
  const remainder = tail.length > 0 ? generatorCartesian(tail) : [[]];
  for (let r of remainder) for (let h of head) yield [h, ...r];
}
```

However, if there is a desire to sample or split the product for additional processing, bottlenecks will occur because generator access must be sequential. With `CartesianProduct` you can do something like this:

```javascript
const cp = CartesianProduct(array1,array2,array3);
cons start = cp.size * .1, end = cp.size * .9
for(let i=start;i<end;i++) {
    doSoemthing(cp.at(i));
}
```

Even easier, `CartesianProduct` supports `slice` and `slice` as an iterable!

```javascript
const cp = CartesianProduct(array1,array2,array3);
cons start = cp.size * .1, end = cp.size * .9
for(const item of cp.slice(start,end)) { // iterating over Array but the entire array has to be assembled first
    doSomething(item);
}

const cp = CartesianProduct(array1,array2,array3);
cons start = cp.size * .1, end = cp.size * .9
for(const item of cp.slice.iterable(start,end)) { // on demand iteration as the slice elements are generated
    doSomething(item);
}
```

See the [#benchmarks](Benchmarks) below.

### Set Operations

The four functions below return an Array or Set depending on class of the first argument

- `difference(base,...iterables)` returns items in base but not in the rest of the iterables
- `intersection(...iterables)`
- `symmetricDifference(...iterables)` returns all items that exist in at most one of the iterables.
- `union(...iterables)`

Each of the above also has a form:

`<operation>.iterable(...iterables)` where `operation` is one of `difference`, `intersection`, `symmetricDifference`, `union`.

These iterable versions can prevent the blocking of a data processing pipeline by returning values on demand rather than all at once. The gains in performance depend heavily on the nature of the data processed but are typically as follows for yielding the first item:

- difference, 1.5 to 2x
- intersection, 1.5 to 2x
- symmetricDifference, 2.5 to 3x
- union, 2.5 to 3 orders of magnitude

See the [#benchmarks](Benchmarks) below.

The below functions return true if the named predicate is true of the base for all the iterables passed in.

```javascript
import {isDisjointFrom,isSubsetOf,isSupersetOf} from "array-set-ops";
```

- isDisjointFrom(base,...iterables)
- isSubsetOf(base,...iterables)
- isSupersetOf(base,...iterables)

## Set Operations For Arrays and Sets

```javascript
import {classPrototype} from "array-set-ops";
classPrototype.patch(Set);
classPrototype.patch(Array);
```

<Array|Set>.

- `cartesianProduct(...iterables)`
- `difference(...iterables)`
- `intersection(...iterables)`
- `symmetricDifference(...iterables)`
- `union(...iterables)`

If the method is called on an Array, an Array is returned. If called on a Set, a Set is returned.

- `isDisjointFrom(...iterables)`
- `isSubsetOf(...iterables)`
- `isSupersetOf(...iterables)`

The `...iterables` passed as arguments can be `Arrays` or `Sets`. Other iterables like `Map` may work, but have not been tested.

For example:

```javascript
const set = union(new Set([1,2,2,3]),[2,3,4]) // Set containing 1,2,3,4
    array = union([2,3,4],new Set([1,2,2,3])) // [2,3,4,1]
```

## Loop Functions For Sets and Cartesian Products

The loop functions are built-in to JavaScript for `Array`.

```javascript
import {classPrototype} from "array-set-ops";
classPrototype.patch(Set);
import {loopFunctions} from "array-set-ops/src/loop-functions.js",
Object.assign(Set.prototype,loopFunctions);
```

<Set>.

- `at(number index)`
- `cartesianProduct(...iterables)`
- `every(function f)`
- `find(function f)`
- `findIndex(any value)`
- `filter(function f)`
- `forEach(function f)`
- `map(function f)`
- `reduce(function f)`
- `reduceRight(function f)`
- `slice(start,end)`
- `some(function f)`

For example:

```javascript
const value = new Set([1,2,2,3]).reduce((sum,value) => sum + value); // 6
```

## Aggregate Functions For Arrays, CartesianProducts, and Sets

```javascript
import {aggregateFunctions} from "array-set-ops/src/aggregate-functions.js",
Object.assign(Set.prototype,aggregateFunctions); // optional
Object.assign(Array.prototype,aggregateFunctions); // optional
```

<Array|Set>.

- `avg()`
- `product()`
- `sum()`

For example:

```javascript
const value = new Set([1,2,2,3]).sum(); // 6
```

## Loop And Aggregate Functions For Iterable Versions Of Set Operations

```javascript
import {classPrototype} from "array-set-ops";
classPrototype.patch(Set);
classPrototype.patch(Array);
import {loopFunctions} from "array-set-ops/src/loop-functions.js",
Object.assign(Set.prototype,loopFunctions);
Object.assign(Array.prototype,loopFunctions);
```

`operation` can be one of `difference`, `intersection`, `symmetricDifference`, `union`, `cartesianProduct`.

<Array|Set>.<operation>.iterator(...iterables)

- `at(number index)`
- `cartesianProduct(...iterables)`
- `every(function f)`
- `findIndex(any value)`
- `forEach(function f)`
- `some(function f)`
- `reduce(function f)`
- `reduceRight(function f)`
- `slice(start,end)`

For example:

```javascript
const union = largeArray1.union.iterable(largeArray2,largeArray3),
    result = union.map((item) => item * 10)
```

If you are looking for performance on really large data sets, the iterator functions below can return items before they complete.

`operation` is one of `filter`, `map`, `slice`.

- `<operation>.iterable(function f)`

For example:

```javascript
const union = largeArray1.union.iterable(largeArray2,largeArray3);
for(const item of union.map.iterable((item) => item * 10)) {
    doSomething(item);
}
```

And finally there are aggregate functions.

- `avg()`
- `product()`
- `sum()`

For example:

```javascript
const union = largeArray1.union.iterable(largeArray2,largeArray3),
    result = union.sum()
```

  By their nature, some of the above force full resolution of the iterable, e.g. `map` and `sum` while others do not, e.g. `at` and `findIndex`. Some functions may force full resolution based on the data to which they are applied, e.g. `some` and `every`. Those that do not require full resolution will typically be faster than calling the same function on a non-iterator version of the same data. For example, the second two lines of code below will typically be more performant.

```javascript
const staticIntersection = [1,2,3,4,5,6,7,...lots of values].intersection([...lots more values],[...even more values]),
    v1 = staticIntersection[1000]; // or iterableIntersection.at(1000)

const iterableIntersection = [1,2,3,4,5,6,7,...lots of values].intersection.iterable([...lots more values],[...even more values]),
    v2 = iterableIntersection.at(1000); // array index technique not available unless you put a proxy arround iterableIntersection
```


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

See the file `./test/index.js` for more examples.

# Unit Testing

Unit testing is conducted with Mocha and C8.

```
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------|---------|----------|---------|---------|----------------------------------------------------------
All files                |   83.76 |     90.9 |   67.92 |   83.76 |                                                         
 aggregate-functions.js  |   45.45 |      100 |       0 |   45.45 | 4-8,11,14-19                                            
 cartesian-product.js    |   79.47 |    90.62 |   78.57 |   79.47 | 51-54,66-67,78-96,130-131,146-149                       
 create-iterable.js      |     100 |      100 |     100 |     100 |                                                         
 difference.js           |     100 |    81.25 |     100 |     100 | 30-32,60                                                
 index.js                |   98.03 |       90 |      70 |   98.03 | 18                                                      
 intersection.js         |   97.18 |    95.23 |     100 |   97.18 | 54-55                                                   
 is-disjoint-from.js     |     100 |      100 |     100 |     100 |                                                         
 is-subset-of.js         |     100 |      100 |     100 |     100 |                                                         
 is-superset-of.js       |     100 |      100 |     100 |     100 |                                                         
 loop-functions.js       |   49.72 |    77.77 |   52.94 |   49.72 | 9-10,23-32,35-39,75,78-96,99-104,112-123,132-143,152-174
 symmetric-difference.js |   96.84 |    90.47 |     100 |   96.84 | 76-78                                                   
 union.js                |     100 |       95 |     100 |     100 | 61                                                      
-------------------------|---------|----------|---------|---------|----------------------------------------------------------
```

# Benchmarks

Benchmarking involves applying set functions to 3 sequences of random lengths between 1 and 99999 containing random numbers between -99 and 99, 50% of which are randomly negative. The sizes of the results are shown on each line.

`Lengths: 69844 54956 46350`

## Cartesian Product

``````
CartesianProduct first x 133,496 ops/sec ±0.65% (87 runs sampled) 3838346864
bigCartesian first x 108,580 ops/sec ±0.97% (90 runs sampled) 3838346864
generatorCartesian first x 113,336 ops/sec ±2.07% (88 runs sampled) 3838346864
CartesianProduct item at 10% point 383834686 x 118,814 ops/sec ±7.25% (83 runs sampled) 3838346864
bigCartesian item at 10% point 383834686 x 0.01 ops/sec ±29.96% (5 runs sampled) 3838346864
```

## Difference

```
difference x 21.12 ops/sec ±12.06% (40 runs sampled) 8028
Array difference.iterable first x 26.40 ops/sec ±17.64% (46 runs sampled) 1
Array difference.iterable x 27.76 ops/sec ±9.26% (51 runs sampled) 8028
```

## Intersection

```
intersection x 64.49 ops/sec ±1.58% (65 runs sampled) 23553
intersection generator first x 87.25 ops/sec ±1.39% (72 runs sampled) 1
intersection.iterable first x 91.24 ops/sec ±1.57% (74 runs sampled) 1
intersection generator 50% x 64.65 ops/sec ±5.63% (64 runs sampled) 11777
intersection.iterable 50% x 65.28 ops/sec ±2.17% (65 runs sampled) 11777
intersection generator x 60.02 ops/sec ±1.56% (61 runs sampled) 23553
intersection.iterable x 57.03 ops/sec ±1.47% (58 runs sampled) 23553
fast_array_intersect x 53.87 ops/sec ±4.26% (55 runs sampled) 23553
```

## Symmetric Difference

```
symmetricDifference x 12.63 ops/sec ±1.02% (34 runs sampled) 44251
symmetricDifferenceGenerator first x 39.34 ops/sec ±1.70% (51 runs sampled) 1
symmetricDifference.iterable first x 33.49 ops/sec ±7.69% (38 runs sampled) 1
symmetricDifferenceGenerator 50% x 18.52 ops/sec ±32.37% (41 runs sampled) 22126
symmetricDifference.iterable 50% x 22.31 ops/sec ±2.07% (40 runs sampled) 22126
symmetricDifferenceGenerator x 11.53 ops/sec ±2.55% (33 runs sampled) 44251
symmetricDifference.iterable x 11.08 ops/sec ±2.49% (32 runs sampled) 44251
```

## Union

```
union x 59.75 ops/sec ±2.38% (60 runs sampled) 94308
unionGenerator first x 4,163,765 ops/sec ±0.73% (84 runs sampled) 1 // suspect!
union.iterable first x 76,947 ops/sec ±1.69% (83 runs sampled) 1
unionGenerator 50% x 39.24 ops/sec ±8.40% (54 runs sampled) 1
union.iterable 50% x 70.85 ops/sec ±0.79% (68 runs sampled) 1
unionGenerator x 42.54 ops/sec ±1.81% (55 runs sampled) 94308
union.iterable x 71.16 ops/sec ±0.93% (69 runs sampled) 68185
```

# FAQ

Why not use generators instead of custom iterator interally? By sharing the code base we save size and ensure that idential algoritms are used.

# Change History (Reverse Chronological Order)

2023-02-25 v0.4.7 Minor optimization to union. Activated unit test on `.cartesianProduct`.

2023-02-24 v0.4.6 Added more performance tests. Minor optimizations to `union`.

2023-02-23 v0.4.5 Abstracted out `createIterable` to reduce size of code base. Added generator versions of set operations to performance testing.

2023-02-22 v0.4.4 Corrected speed summary close to top of README.

2023-02-22 v0.4.3 More unit tests. Optimized `difference` and `symmetricDifference`.

2023-02-21 v0.4.2 More unit tests. Fixed issue with scoping of iterable looping functions on `CartesianProduct`.

2023-02-20 v0.4.1 More unit tests. Fixed issue with `.map` indexing.

2023-02-20 v0.4.0 More performance and unit tests. More documentation. Iterable versions of `filter`, `map`, `slice`.

2023-02-19 v0.3.0 More unit tests. Performance tests. Simplified patching of Array and Class. Fixed algorithmic issues with `difference`.

2023-02-18 v0.2.0 More documentation, more unit tests, almost complete and standardized API.

2023-02-18 v0.1.0 First public release