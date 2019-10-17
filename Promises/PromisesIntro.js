/*
  A promise is an object representing an eventual completion or failure of an asynchronous operation.

  Problems with callbacks:
    Suppose we have an async operation (named opA) that relies on callbacks for comunicating the result. We pass a callback function (named cb) to opA.
    Following problems might occur with this approach:
    - opA might never call cb.
    - opA might call cb more than once.
    - opA requires the cb to be passed to it. cb might contains sensitive information.

    Besides, the above mentioned problems, another problem might occur when passing callbacks as event handlers to events. For example, an event might have occurred
    before we attach our callback to the event. In this case, the handler will never be fired.

  Mechanism of promises:
    A promise represents an eventual result of an operation that completes in future. A promise can be resolved (representing a success result), or it can be
    rejected (representing an error result). The paradigm of promises do not require the callback function to be passed. Instead, the promise informs whether
    the promise is fulfilled (rejected, or resolved). The callbacks can be attached to promise objects (and not passed as callbacks to some function) and when
    the promise is fulfilled, the code can act accordingly.

  Some characteristics of promises:
    - A promise is fulfilled exactly once.
    - Callbacks added to a promise are guaranteed to run even if the promise has already been fulfilled before attaching the callbacks.
    - Promises do not execute the callbacks on their own. Instead, they inform the client when the promise is fulfilled.

*/

(function run() {
  promiseIntro();
})();

function promiseIntro() {
  var promise = new Promise((resolve, reject) => { // a promise is created by using Promise constructor function.
    // the Promise ctor takes a callback having two parameters. The first parameter represents a callback to indicate the success; the other one for failure

    // Inside the function, we do some work and then decide whether to resolve or reject the promise.

    var randomNum = Math.round(Math.random() * 10);
    if (randomNum % 2 === 0) {
      console.log('Resolving promise');
      resolve(randomNum);
    } else {
      console.log('Rejecting promise');
      reject(randomNum);
    }
  });

  // in order to use the promise, attach the callbacks using the then method.
  // note that, no callback is passed to the promise!
  promise.then(function successCallback(data) {
    console.log('Promise was resolved with value', data);
  }, function errorCallback(err) {
    console.log('Promise was rejected with value', err);
  });
}

/* continue from here:
https://www.taniarascia.com/how-to-promisify-an-ajax-call/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
*/
