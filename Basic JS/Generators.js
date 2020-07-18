/**
 * GENERATORS and GENERATOR FUNCTIONS
 * 
 * function* defines the generator syntax and it returns a generator object. Generator object conforms both to iterable and iterator protocol.
 * 
 * Calling a generator function does execute its body immediately; instead its invocation returns a generator object which can be iterated over.
 * The next() method on the generator returns an object of form {value: any, done: boolean} where value indicates the value associated with current invocation
 * and done indicates whether the generator has completed. Generator functions does not execute their body immediately, instead their exeuction can be paused and
 * their state is preserved. When next() method is called without an argument, the body of generator function is executed until the next yeild statement (or the 
 * yeild* statement in which case the exeuction is delegated to another generator). When next() is called with an argument, the next yeild statement is replaced 
 * with the argument received in next() method. The return statement inside a generator function simply completes the generator function and the subsequent 
 * statements in the body are not executed. An exception in the generator function, unless caught within the body, causes the invocation to throw error and finish
 * the execution. When generator is finished, subsequent calls to next() method does not cause the body of generator function to execute.
 */

 (function runner() {
    // demoSyntax();
    // simpleExample();
    // exampleWithDelegation();
    // yieldWithArguments();
    generatorAsComputedProperty();
 })();

 function generatorAsComputedProperty() {
     const anObj = {
         *[Symbol.iterator]() { // now the object is iterable
            debugger;
            for(let i in this) {
                yield this[i];
            }
         },

         a: 10, 
         b: 20,
         c: 30
     }

     for (let val of anObj) console.log(val);

     class IterableObj {
         a;
         b;
         c;

         constructor(a, b, c) {
             this.a = a;
             this.b = b;
             this.c = c;
         }

         *[Symbol.iterator]() { // now the object is iterable
             for(let item in this) {
                 yield this[item];
             }
         }
     }

     let obj = new IterableObj(100, 200, 300);
     let arr = [...obj];
     console.log(arr);
 }

 function yieldWithArguments() {
     debugger;
     function* generator1() {
         console.log(1, yield);
         console.log(2, yield);
         console.log(3, yield);
     }

     let gen1 = generator1();
     gen1.next('one');
     gen1.next('two');
     gen1.next('three');

     let gen2 = generator1();
     gen2.next();
     gen2.next('one');
     gen2.next('two');
     gen2.next('three');
 }

 function exampleWithDelegation() {
     function* generator1() {
         yield 10;
         yield 20;
         yield 30;
         yield 40;
     }

     function* generator2() {
         yield 1;
         yield 2;
         yield* generator1();
         yield 3;
         yield 4;
     }

     let generator = generator2();
     let next = generator.next();
     do {
         console.log(next);
     } while(!(next = generator.next()).done)
 }

 function simpleExample() {
     function* idMaker() {
         let index = 0;
         while (true) {
             yield ++index;
         }
     }

     let idGenerator = idMaker();
     console.log(idGenerator.next());
     console.log(idGenerator.next());
     console.log(idGenerator.next());
     console.log(idGenerator.next());
     console.log(idGenerator.next());
     console.log(idGenerator.next());
     // will never end
 }

 function demoSyntax() {
     function* generator(i) {
         yield i;
         yield i + 1;
     }

     let gen1 = generator(10);
     console.log(gen1);
     console.log(typeof(gen1));
     console.log(gen1.next());
     console.log(gen1.next());
     console.log(gen1.next());
 }