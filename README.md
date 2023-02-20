# array-set-ops

Extremely fast set `difference`, `intersection`, `symmetricDifference`, `union` operations on `Sets` and `Arrays`.

All the standard map/reduce/find operations for `Sets`.

`CartesianProduct` as a first class object like `Set` and `Array`. And, `cartesianProduct` asa method on both.

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

However, if there is a desire to sample or split the product for additional processing bottlenecks will occur because generator access must be sequential. With `CartsianProduct` you can do something like this:

```javascript
const cp = CartesianProduct(array1,array2,array3);
cons start = cp.size * .1, end = cp.size * .9
for(let i=start;i<end;i++) {
    doSoemthing(cp.at(i));
}
```

Even easier, `CartesianProduct` supports `slice` as an iterable!

```javascript
const cp = CartesianProduct(array1,array2,array3);
cons start = cp.size * .1, end = cp.size * .9
for(const item of cp.slice(start,end)) {
    doSomething(item);
}
```

Additionally, the generic nature of generators makes them slightly slower than custom iterables and `CartesianProduct` is a custom iterable.

See the [#benchmarks](Benchmarks) below.

### Set Operations

The four functions below return an Array or Set depending on class of the first argument

- `difference(base,...iterables)` returns items in base but not in the rest of the iterables
- `intersection(...iterables)`
- `symmetricDifference(...iterables)` returns all items that exist in at most one of the iterables, i.
- `union(...iterables)`

Each of the above also has a form:

`<operation>.iterable(...iterables)` where `operation` is one of `difference`, `intersection`, `symmetricDifference`, `union`.

These iterable versions can prevent the blocking of a data processing pipeline by returning values on demand rather than all at once. The gains in performance depend on the nature of the data processed but are typically as follows:

- difference, 3 to 4 orders of magnitude
- intersection, 2x
- symmetricDifference, 2x
- union, 3 to 4 orders of magnitude

The below function return true if the named predicate is true of the base for all the iterables passed in.

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

## Loop Functions For Sets

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
- `filter(function f)`
- `findIndex(any value)`
- `filter(function f)`
- `forEach(function f)`
- `map(function f)`
- `reduce(function f)`
- `reduceRight(function f)`
- `some(function f)`

For example:

```javascript
const value = new Set([1,2,2,3]).reduce((sum,value) => sum + value); // 6
```

## Aggregate Functions For Arrays and Sets

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
-------------------------|---------|----------|---------|---------|---------------------------------------------------------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                   
-------------------------|---------|----------|---------|---------|---------------------------------------------------------------------
All files                |   81.04 |    88.81 |   62.74 |   81.04 |                                                                    
 aggregate-functions.js  |   45.45 |      100 |       0 |   45.45 | 4-8,11,14-19                                                       
 cartesian-product.js    |      92 |       90 |   85.71 |      92 | 53-54,70-73                                                        
 difference.js           |     100 |    85.71 |     100 |     100 | 33,42,57                                                           
 index.js                |   98.03 |       90 |      70 |   98.03 | 18                                                                 
 intersection.js         |   97.77 |    96.15 |     100 |   97.77 | 54-55                                                              
 is-disjoint-from.js     |     100 |    85.71 |     100 |     100 | 26                                                                 
 is-subset-of.js         |   83.72 |    66.66 |     100 |   83.72 | 28-32,36-37                                                        
 is-superset-of.js       |   94.44 |    57.14 |     100 |   94.44 | 30-31                                                              
 loop-functions.js       |   39.53 |    84.61 |   35.29 |   39.53 | 3-12,15-19,22-30,33-36,39-42,69,72-90,93-98,106-117,126-136,145-167
 symmetric-difference.js |   80.53 |    90.47 |      50 |   80.53 | 76-78,89-107                                                       
 union.js                |     100 |      100 |     100 |     100 |                                                                    
-------------------------|---------|----------|---------|---------|---------------------------------------------------------------------
```

# Benchmarks

## Cartesian Product

Lengths: 45384 67680 51225 14797 15537
CartesianProduct first x 106,862 ops/sec ±3.16% (78 runs sampled) 3071589120
bigCartesian first x 101,357 ops/sec ±1.95% (86 runs sampled) 3071589120
generatorCartesian first x 94,015 ops/sec ±3.78% (78 runs sampled) 3071589120
CartesianProduct item at 10% point 307158912 x 122,619 ops/sec ±1.41% (86 runs sampled) 3071589120
bigCartesian item at 10% point 307158912 x 0.02 ops/sec ±11.21% (5 runs sampled) 3071589120
generatorCartesian item at 10% point 307158912 x 0.02 ops/sec ±9.71% (5 runs sampled) 3071589120

## Difference

Lengths: 82270 77754 34862 52969 50536
difference x 0.11 ops/sec ±14.36% (5 runs sampled) 3801
difference.iterable first x 4,672 ops/sec ±1.65% (81 runs sampled) 3801
difference.iterable x 0.12 ops/sec ±4.58% (5 runs sampled) 3845

## Intersection

Lengths: 62742 39776 15199 36605 64797
intersection x 67.06 ops/sec ±4.99% (59 runs sampled) 15096
intersection.iterable first x 111 ops/sec ±1.01% (77 runs sampled) 15096
intersect.iterable x 73.15 ops/sec ±2.88% (61 runs sampled) 15096
fast_array_intersect x 73.80 ops/sec ±0.94% (72 runs sampled) 15096

## Symmetric Difference

symmetricDifference x 10.29 ops/sec ±7.50% (30 runs sampled) 6770
symmetricDifference.iterable first x 19.96 ops/sec ±3.17% (36 runs sampled) 6770
symmetricDifference.iterable x 10.46 ops/sec ±7.97% (30 runs sampled) 6770

## Union

union x 45.19 ops/sec ±6.39% (58 runs sampled) 90590
union.iterable first x 66,899 ops/sec ±5.42% (75 runs sampled) 90590
union.iterable x 38.88 ops/sec ±3.23% (50 runs sampled) 90590

# Change History (Reverse Chronological Order)

2023-02-20 v0.4.0 More performance and unit tests. More documentation. Iterable versions of `filter`, `map`, `slice`.

2023-02-19 v0.3.0 More unit tests. Performance tests. Simplified patching of Array and Class. Fixed algorithmic issues with `difference`.

2023-02-18 v0.2.0 More documentation, more unit tests, almost complete and standardized API.

2023-02-18 v0.1.0 First public release