import vm from "node:vm"
import v8 from "v8";

v8.setFlagsFromString('--expose_gc');
const gc = vm.runInNewContext('gc');

const chai = await import("chai"),
    expect = chai.expect;

import Benchmark from "benchmark";

import {classPrototype,difference,intersection,symmetricDifference,union,isDisjointFrom,isSubsetOf,isSupersetOf} from "../../src/index.js";
import {loopFunctions} from "../../src/loop-functions.js";
import {aggregateFunctions} from "../../src/aggregate-functions.js";
import {cartesianProduct,CartesianProduct} from  "../../src/cartesian-product.js";
import fastCartesian from 'fast-cartesian';
import bigCartesian from 'big-cartesian';
import intersect from "fast_array_intersect";

import {intersection as intersectionGenerator} from "./intersection-generator.js"
import {difference as differenceGenerator} from "./difference-generator.js";
import {union as unionGenerator} from "./union-generator.js";
import {symmetricDifference as symmetricDifferenceGenerator}  from "./symmetric-difference-generator.js"

classPrototype.patch(Set);
Object.assign(Set.prototype,loopFunctions);
Object.assign(Set.prototype,aggregateFunctions);
Set.prototype.cartesianProduct = cartesianProduct;
classPrototype.patch(Array);
Object.assign(Array.prototype,aggregateFunctions);
Array.prototype.cartesianProduct = cartesianProduct;

const args = [];
for(let i=0;i<100000;i++) {
    args.push(Math.round(i*Math.random()*10 * (Math.random()>.5 ? - 1 : 1)));
}
let l1 = args.length*Math.random(),
    l2 = args.length*Math.random(),
    l3 = args.length*Math.random(),
    l4 = args.length*Math.random(),
    l5 = args.length*Math.random(),
    arg1 = args.slice(l1).sort((a,b) => Math.random()>.5 ? 1 : - 1).map((item) => item * (Math.random()>.5 ? - 1 : 1)),
    arg2 = args.slice(l2).sort((a,b) => Math.random()>.5 ? 1 : - 1),
    arg3 = args.slice(l3).sort((a,b) => Math.random()>.5 ? 1 : - 1);
console.log("Lengths:",arg1.length,arg2.length,arg3.length)
let size;

const csuite = new Benchmark.Suite;
///csuite.add("cartesianProduct",() => {
    //const result = arg1.cartesianProduct(arg2);
//})
const cp = CartesianProduct(arg1,arg2);
function* generatorCartesian([head, ...tail]) {
    const remainder = tail.length > 0 ? generatorCartesian(tail) : [[]];
    for (let r of remainder) for (let h of head) yield [h, ...r];
}

gc();


const dsuite = new Benchmark.Suite;
dsuite.add("difference",() => {
        const result = arg1.difference(arg2,arg3);
        size = result.length;
    })
    .add("Array difference generator first",() => {
        size = 0;
        for(const item of differenceGenerator(arg1,arg2,arg3)) {
            size = 1;
            break;
        }
    })
    .add("Array difference.iterable first",() => {
        size = 0;
        for(const item of arg1.difference.iterable(arg2,arg3)) {
            size = 1;
            break;
        }
    })
    .add("Array difference generator",() => {
        size = 0;
        for(const item of differenceGenerator(arg1,arg2,arg3)) {
            size++;
        }
    })
    .add("Array difference.iterable",() => {
        size = 0;
        for(const item of arg1.difference.iterable(arg2,arg3)) {
            size++;
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target),size);
        gc();
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log("Lengths:",arg1.length,arg2.length,arg3.length)
        gc();
    })
    .run();

const isuite = new Benchmark.Suite;
    isuite.add("intersection",() => {
        const result = arg1.intersection(arg2,arg3);
        size = result.length;
    })
    .add("intersection generator first",() => {
        size = 0;
        for(const item of intersectionGenerator(arg1,arg2,arg3)) {
            size = 1;
            break;
        }
    })
    .add("intersection.iterable first",() => {
        size = 0;
        for(const item of arg1.intersection.iterable(arg2,arg3)) {
            size = 1;
            break;
        }
    })
    .add("intersection generator",() => {
        size = 0;
        for(const item of intersectionGenerator(arg1,arg2,arg3)) {
            size++;
        }
    })
    .add("intersection.iterable",() => {
        size = 0;
        for(const item of arg1.intersection.iterable(arg2,arg3)) {
           size++;
        }
    })
    .add("fast_array_intersect",() => {
        const result = intersect.default([arg1,arg2,arg3]);
        size = result.length;
    })
    .on('cycle', function(event) {
        console.log(String(event.target),size);
        gc();
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log("Lengths:",arg1.length,arg2.length,arg3.length)
        gc();
    })
    .run();

const ssuite = new Benchmark.Suite;
ssuite.add("symmetricDifference",() => {
    const result = arg1.symmetricDifference(arg2,arg3);
    size = result.length;
})
    .add("symmetricDifferenceGenerator first",() => {
        size = 0;
        for(const item of symmetricDifferenceGenerator(arg1,arg2,arg3)) {
            size = 1;
            break;
        }
    })
    .add("symmetricDifference.iterable first",() => {
        size = 0;
        for(const item of arg1.symmetricDifference.iterable(arg2,arg3)) {
            size = 1;
            break;
        }
    })
    .add("symmetricDifferenceGenerator",() => {
        size = 0;
        for(const item of symmetricDifferenceGenerator(arg1,arg2,arg3)) {
            size++;
        }
    })
    .add("symmetricDifference.iterable",() => {
        size = 0;
        for(const item of arg1.symmetricDifference.iterable(arg2,arg3)) {
            size++;
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target),size);
        gc();
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log("Lengths:",arg1.length,arg2.length,arg3.length)
        gc();
    })
    .run();

const usuite = new Benchmark.Suite;
usuite.add("union",() => {
    const result = arg1.union(arg2,arg3);
    size = result.length;
})
    .add("unionGenerator first",() => {
        size = 0;
        for(const item of unionGenerator(arg1,arg2,arg3)) {
            size = 1;
            break;
        }
    })
    .add("union.iterable first",() => {
        size = 0;
        for(const item of arg1.union.iterable(arg2,arg3)) {
            size = 1;
            break;
        }
    })
    .add("unionGenerator",() => {
        size = 0;
        for(const item of unionGenerator(arg1,arg2,arg3)) {
            size++;
        }
    })
    .add("union.iterable",() => {
        size = 0;
        for(const item of arg1.union.iterable(arg2,arg3)) {
            size++;
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target),size);
        gc();
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        gc();
    })
    .run();

const cplen = cp.size;
 csuite.add("CartesianProduct first",() => {
       const result = cp;
       let i = 0;
        for(const item of result) {
            i++;
            break;
        }
        expect(i).to.equal(1);
    })
     .add("bigCartesian first",() => {
         const result = bigCartesian([arg1,arg2]);
         let i = 0;
         for(const item of result) {
             i++;
             break;
         }
         expect(i).to.equal(1);
     })
     .add("generatorCartesian first",() => {
         const result = generatorCartesian([arg1,arg2]);
         let i = 0;
         for(const item of result) {
             i++;
             break;
         }
         expect(i).to.equal(1);
     })
    .add(`CartesianProduct item at 10% point ${Math.round(cplen/10)}`,() => {
        const item = cp.at(Math.round(cplen/10));
        expect(Array.isArray(item)).to.equal(true);
    })
    .add(`bigCartesian item at 10% point ${Math.round(cplen/10)}`,() => {
         const result = bigCartesian([arg1,arg2]);
         let i = 0;
         for(var item of result) {
             if(i==Math.round(cplen/10)) {
                 break;
             }
             i++;
         }
         expect(Array.isArray(item)).to.equal(true);
     })
     .add(`generatorCartesian item at 10% point ${Math.round(cplen/10)}`,() => {
         const result = generatorCartesian([arg1,arg2]);
         let i = 0;
         for(var item of result) {
             if(i==Math.round(cplen/10)) {
                 break;
             }
             i++;
         }
         expect(Array.isArray(item)).to.equal(true);
     })
    .on('cycle', function(event) {
        console.log(String(event.target),cplen);
        gc();
    })
    .on("complete",function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log("Lengths:",arg1.length,arg2.length,arg3.length);
        gc();
    })
    .run();





