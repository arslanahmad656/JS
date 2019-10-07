/*

  Arrow functions are different from functions in syntax and in this binding.
  Normal functions get their this binding depending on the call site. Howerver, the arrow functions have lexical this binding.

*/

/*
  Learning source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
*/

(function driver () {

  // introToArrow();
  // lexicalThis();
  // impactOfStrictMode();
  // invokeThroughExplicitBinding();
  // bindingWithArgments();
  properties();

})();

function properties() {
  // arrow functions do not have prototype property:
  var f = () => console.log('hello');
  console.log('Prototype of f:', f.prototype);

  // arrow functions cannot be used as constructors:
  try {
    var obj = new f();
    console.log('Was arrow function used as a constructor function?');
  } catch (ex) {
    console.log('Error: ', ex);
  }
}

function bindingWithArgments() {
  /*
    Arrow functions do not have their own arguments object. Hence, when arguments is referenced inside an arrow function,
    it will use the arguments function of the enclosing scope. However, the arrow function will not capture the arguments object.
    Arrow functions capture only this.
  */

  var arguments = [10, 20, 30, 40];
  var f1 = (x, y) => arguments[0] + arguments[1]; // this will use above arguments object

  var f2 = function (x, y) {
    var f = (a, b) => arguments[0] + arguments[1];  // this will use arguments object of f2
    return f(x + 1, y + 1);
  }

  console.log(f1(5, 6)); // 30 (not 11)!
  console.log(f2(5, 6)); // 11 (not 13)!
}

function invokeThroughExplicitBinding() {
  /*
    The this of arrow functions cannot be explicitly bound as it can be done with normal functions using apply and call.
    That is because the arrow functions do not have their own this. They capture this. So, the this value from call or apply
    is ignored in case of arrow functions.
  */

  var adder = {
    base: 1,

    add: function(val) {
      var f = v => v + this.base;
      return f(val);
    },

    addThroughExplicitBinding: function(val) {
      var f = v => v + this.base;
      var obj = {
        base: 2
      };

      return f.call(obj, val);
    }
  };

  console.log(adder.add(2)); // output: 3
  console.log(adder.addThroughExplicitBinding(2)); // output is still 3 (not 4)!
}

function impactOfStrictMode() {
  /*
    Normal functions may get their this bound to the global object depending on whether they are executing in strict or non-strict mode.
    However, the arrow functions capture their this from the sorrounding scope, hence the strict mode has no impact on the way the this is captured.
  */

  // In the following snippet, the executing functions apply strict rules. As a result,
  // the normal function call returns null (since the default binding with null in strict mode is undefined).
  // However, the arrow function call still returns the global object because the strict mode does not affect the capturing of this.
  // The arrow function captures the this value from the enclosing scope, which in this case is demoStrict1 that have this bound to (by default) the
  // global object.
  (function demoStrict1() {
    var normalFunc = function() {
      "use strict";
      return this;
    };

    var thisVal = normalFunc();
    console.log('In normal function in strict mode, this and window are same:', thisVal === window);

    var arrowFunc = () => {
      "use strict";
      return this;
    };

    thisVal = arrowFunc();
    console.log('In arrow function in strict mode, this and window are same:', thisVal === window, thisVal);
  })();


  // In the following snippet, the executing functions apply strict rules. As a result,
  // the normal function call returns null (since the default binding with null in strict mode is undefined).
  // The call to arrow function also returns null.That is because, the arrow function captures its this value from the enclosing scope which in this case
  // is demoStrict2 function which has its this bound to undefined (because it is executing in strict mode).
  (function demoStrict2() {
    "use strict";

    var normalFunc = function() {
      return this;
    };

    var thisVal = normalFunc();
    console.log('In normal function in strict mode 2, this and window are same:', thisVal === window);

    var arrowFunc = () => {
      return this;
    };

    thisVal = arrowFunc();
    console.log('In arrow function in strict mode 2, this and window are same:', thisVal === window, thisVal);
  })();
}


function lexicalThis() {
  /*
    Arrow functions do not have their own this value. Instead, they capture this lexically from the enclosing scope.
  */

  // The setInterval in the following function will increment the elapsedSeconds property of the object from call-site.
  function StopwatchNoLexical() {
    this.elapsedSeconds = 0;
    this.start = function() {
      setInterval(function() {
        this.elapsedSeconds++;
      }, 1000);
    };
  }

  var watch = new StopwatchNoLexical();
  watch.start();
  setTimeout(function() {
    // Checking the value of the property of watch after 5s:
    console.log('After 5s, value of watch:', watch.elapsedSeconds); // output: 0
    console.log('Property of window:', window.elapsedSeconds);  // it added to elapsedSeconds property of the global object!
  }, 5000);

  // The setInterval in the following function will ever increment the property of the same object as used during new operation!
  function StopwatchLexical() {
    this.elapasedTime = 0;
    this.start = () => setInterval(() => this.elapasedTime++, 1000);
  }

  setTimeout(function() {
    // Checking the value of the property of new watch after 5s:
    console.log('After 5s, value of new watch:', watchNew.elapasedTime); // output: 4
    console.log('Property of window:', window.elapasedTime);  // it did not add to the global object!
  }, 5000);

  var watchNew = new StopwatchLexical();
  watchNew.start();

  (function() {
    var f = () => console.log('Inside arrow function', this);
    var g = function() {
      console.log('Inside normal function', this);
    }

    f();
    g();
  })();

}

function introToArrow() {
  var normalFunc = function(e) {
    return e * e;
  };

  var arrowFunc = e => e * e;

  var arr = [1, 2, 3, 4, 5];

  // using normal functions
  arr.map(normalFunc).forEach(function(e) {
    console.log(e);
  })

  // using arrow functions
  arr.map(arrowFunc).forEach(e => console.log(e));
}
