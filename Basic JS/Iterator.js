/*
  An iterator is a property on an object that makes an object iteratable. An iteratable object can be enumerated inside a for...of loop.
  Iterator object contains a single property (function) named next which returns an object containing two properties:
     - value: method that returns the current value of the object
     - done: value that indicates whether the iteration has been completed
   To make an object iteratable, define a function property named Symbol.iterator which should return the iterator object.
*/

(function demoIterators() {
  // demoFiniteIterator();
  demoInfiniteIterator();
})();

function demoInfiniteIterator() {
  var randomNumbers = {
    [Symbol.iterator]: function() {
      return {
        next: () => ({
          value: Math.random()
        })
      }
    }
  };

  var i = 0;
  for (let r of randomNumbers) {
    if (i++ == 10) break;
    console.log(r);
  }
}

function demoFiniteIterator() {
  var obj = {
    x: 10,
    y: 20,
    z: 30
  };

  // define an iterator on obj
  Object.defineProperty(obj, Symbol.iterator, { // to make an object iteratable, define a property by name Symbol.iterator
    writable: false,
    configurable: true,
    enumerable: false,
    value: function() { // a function
      var keys = Object.keys(this);
      var index = 0;
      return {
        next: () => {
          return {
            value: this[keys[index++]],
            done: index > keys.length
          }
        }
      };
    }
  });

  // now use the object in for...of loop
  for (let prop of obj) {
    console.log(`Value: ${prop}`);
  }

  // the loop works as follows
  var iterator = obj[Symbol.iterator]();
  {
      let currentObj = iterator.next();
      while(currentObj.done === false) {
        console.log(`Value: ${currentObj.value}`);
        currentObj = iterator.next();
      }
  }

}
