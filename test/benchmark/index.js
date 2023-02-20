import vm from "node:vm"
import v8 from "v8";

v8.setFlagsFromString('--expose_gc');
const gc = vm.runInNewContext('gc');

const chai = await import("chai"),
    expect = chai.expect;

import Benchmark from "benchmark";

import {classPrototype} from "../../src/index.js";
import {loopFunctions} from "../../src/loop-functions.js";
import {aggregateFunctions} from "../../src/aggregate-functions.js";
import {cartesianProduct,CartesianProduct} from  "../../src/cartesian-product.js";
import fastCartesian from 'fast-cartesian';
import bigCartesian from 'big-cartesian';
import intersect from "fast_array_intersect";
import * as diff from "fast-array-diff";

classPrototype.patch(Set);
Object.assign(Set.prototype,loopFunctions);
Object.assign(Set.prototype,aggregateFunctions);
Set.prototype.cartesianProduct = cartesianProduct;
classPrototype.patch(Array);
Object.assign(Array.prototype,aggregateFunctions);
Array.prototype.cartesianProduct = cartesianProduct;

const args = [];
for(let i=0;i<100000;i++) {
    args.push(Math.round(i*Math.random()*10));
}
let l1 = args.length*Math.random(),
    l2 = args.length*Math.random(),
    l3 = args.length*Math.random(),
    l4 = args.length*Math.random(),
    l5 = args.length*Math.random(),
    arg1 = args.slice(l1),
    arg2 = args.slice(l2),
    arg3 = args.slice(l3),
    arg4 = args.slice(l4),
    arg5 = args.slice(l5);
console.log("Lengths:",arg1.length,arg2.length,arg3.length,arg4.length,arg5.length)
let size;

const csuite = new Benchmark.Suite;
//csuite.add("cartesianProduct",() => {
    //const result = arg1.cartesianProduct(arg2);
//})
const cp = CartesianProduct(arg1,arg2);
function* generatorCartesian([head, ...tail]) {
    const remainder = tail.length > 0 ? generatorCartesian(tail) : [[]];
    for (let r of remainder) for (let h of head) yield [h, ...r];
}

gc();

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
    /* .add("bigCartesian all",() => {
         const result = bigCartesian([arg1,arg2]);;
         let count = 0;
         for(const item of result) {
             count++;
         }
     })
    .add("CartesianProduct all",() => {
        const result = cp;
        let count = 0;
        for(const item of result) {
            count++;
        }
    })*/
    // can't handle large arrays
    /*.add("fastCartesian",() => {
        const result = fastCartesian([arg1,arg2]);
    })*/
    .on('cycle', function(event) {
        console.log(String(event.target),cplen);
        gc();
    })
    .on("complete",function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        l1 = args.length*Math.random(),
            l2 = args.length*Math.random(),
            l3 = args.length*Math.random(),
            l4 = args.length*Math.random(),
            l5 = args.length*Math.random(),
            arg1 = args.slice(l1),
            arg2 = args.slice(l2),
            arg3 = args.slice(l3),
            arg4 = args.slice(l4),
            arg5 = args.slice(l5),
            console.log("Lengths:",arg1.length,arg2.length,arg3.length,arg4.length,arg5.length)
        gc();
    })
    .run();

const dsuite = new Benchmark.Suite;
dsuite.add("difference",() => {
    const result = arg1.difference(arg2);
    size = result.length;
})
    .add("difference.iterable first",() => {
        for(const item of arg1.difference.iterable(arg2)) {
            break;
        }
    })
    .add("difference.iterable",() => {
        size = 0;
        for(const item of arg1.difference.iterable(arg2)) {
            size++;
        }
    })
    /*.add("difference short",() => {
        const arg1 =[1,2], arg2 = [1,2,3];
        const result = arg1.difference(arg2);
        size = result.length;
    })
    .add("diff.diff short",() => {
        const arg1 =[1,2], arg2 = [1,2,3];
        let result = diff.diff(arg1,arg2).added;
        size = result.length;
    })*/
    // so slow it will not complete or it crashes
    /*.add("diff.diff",() => {
        try {
            let result = diff.diff(arg1,arg2).added;
            size = result.length;
        } catch(e) {
            console.log(e);
            throw e;
        }
    })*/
    .on('cycle', function(event) {
        console.log(String(event.target),size);
        gc();
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        l1 = args.length*Math.random(),
            l2 = args.length*Math.random(),
            l3 = args.length*Math.random(),
            l4 = args.length*Math.random(),
            l5 = args.length*Math.random(),
            arg1 = args.slice(l1),
            arg2 = args.slice(l2),
            arg3 = args.slice(l3),
            arg4 = args.slice(l4),
            arg5 = args.slice(l5),
            console.log("Lengths:",arg1.length,arg2.length,arg3.length,arg4.length,arg5.length)
            gc();
    })
    .run();

const isuite = new Benchmark.Suite;
isuite.add("intersection",() => {
    const result = arg1.intersection(arg2,arg3,arg4,arg5);
    size = result.length;
})
    .add("intersection.iterable first",() => {
        for(const item of arg1.intersection.iterable(arg2,arg3,arg4,arg5)) {
            break;
        }
    })
    .add("intersect.iterable",() => {
        size = 0;
        for(const item of arg1.intersection.iterable(arg2,arg3,arg4,arg5)) {
           size++;
        }
    })
    .add("fast_array_intersect",() => {
        const result = intersect.default([arg1,arg2,arg3,arg4,arg5]);
        size = result.length;
    })
    // so slow it will not complete
    /*
    .add("diff.same",() => {
        const result = [arg2,arg3,arg4,arg5].reduce((array,arg) => {
            const result = diff.same(arg1,arg);
            return array = [...array,...result.value];
        },[])
        size = result.length;
    })
    */
    .on('cycle', function(event) {
        console.log(String(event.target),size);
        gc();
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        l1 = args.length*Math.random(),
            l2 = args.length*Math.random(),
            l3 = args.length*Math.random(),
            l4 = args.length*Math.random(),
            l5 = args.length*Math.random(),
            arg1 = args.slice(l1),
            arg2 = args.slice(l2),
            arg3 = args.slice(l3),
            arg4 = args.slice(l4),
            arg5 = args.slice(l5),
            gc();
    })
    .run();

const ssuite = new Benchmark.Suite;
ssuite.add("symmetricDifference",() => {
    const result = arg1.symmetricDifference(arg2,arg3,arg4,arg5);
    size = result.length;
})
    .add("symmetricDifference.iterable first",() => {
        for(const item of arg1.symmetricDifference.iterable(arg2,arg3,arg4,arg5)) {
            break;
        }
    })
    .add("symmetricDifference.iterable",() => {
        size = 0;
        for(const item of arg1.symmetricDifference.iterable(arg2,arg3,arg4,arg5)) {
            size++;
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target),size);
        gc();
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        l1 = args.length*Math.random(),
            l2 = args.length*Math.random(),
            l3 = args.length*Math.random(),
            l4 = args.length*Math.random(),
            l5 = args.length*Math.random(),
            arg1 = args.slice(l1),
            arg2 = args.slice(l2),
            arg3 = args.slice(l3),
            arg4 = args.slice(l4),
            arg5 = args.slice(l5),
            gc();
    })
    .run();

const usuite = new Benchmark.Suite;
usuite.add("union",() => {
    const result = arg1.union(arg2,arg3,arg4,arg5);
    size = result.length;
})
    .add("union.iterable first",() => {
        for(const item of arg1.union.iterable(arg2,arg3,arg4,arg5)) {
            break;
        }
    })
    .add("union.iterable",() => {
        size = 0;
        for(const item of arg1.union.iterable(arg2,arg3,arg4,arg5)) {
            size++;
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target),size);
        gc();
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        l1 = args.length*Math.random(),
            l2 = args.length*Math.random(),
            l3 = args.length*Math.random(),
            l4 = args.length*Math.random(),
            l5 = args.length*Math.random(),
            arg1 = args.slice(l1),
            arg2 = args.slice(l2),
            arg3 = args.slice(l3),
            arg4 = args.slice(l4),
            arg5 = args.slice(l5),
            gc();
    })
    .run();




