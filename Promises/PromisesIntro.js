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
    Promises are executed later just like callbacks do. However, unlike callbacks, promises are executed as soon as possible.
    If a promise is resolved before the current call stack finishes, it will be executed rightaway (even though some jobs might be waiting on the event queue.).
    This mechanism is achieved by introducing a 'Job Queue' alongwith the famous 'Event Loop'. The next event in the event loop cannot be processed unless the
    job queue is empty. Hence job queue takes priority over the event loop.

  Some characteristics of promises:
    - A promise is fulfilled exactly once.
    - Callbacks added to a promise are guaranteed to run even if the promise has already been fulfilled before attaching the callbacks.
    - Promises do not execute the callbacks on their own. Instead, they inform the client when the promise is fulfilled.


  References:
    https://www.taniarascia.com/how-to-promisify-an-ajax-call/
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
*/

(function run() {
  // promiseIntro();
  // promisifyingExistingCallback();
  chainingPromise();
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

function promisifyingExistingCallback() {
  // existing callbacks can be promisified.

  // The funtion given below does AJAX traditionally:
  // The request accepts some network parmeters; and callbacks to execute when a response is received:
  (function doAjaxTradationally() {
    // defined callbacks:
    var successCallback = data => console.log('Success callback is executing (tradionally) with data', data);
    var failureCallback = err => console.log('Failure callback is executing (tradionally) with error', err);

    // send an AJAX request (note that this requires passing the callbacks to the request)
    // Here AJAX decides what to do when the response is received:
    $.ajax({
      url: 'https://reqres.in/api/users/2',
      type: 'GET',
      success: successCallback,
      error: failureCallback
    });
  })();

  // The function given below does the same task as the function given above; but this one uses promises:
  (function doAjaxWithPromises() {
    // defined callbacks:
    var successCallback = data => console.log('Success callback is executing (promise) with data', data);
    var failureCallback = err => console.log('Failure callback is executing (tradionally) with error', err);

    // write a function to get promise based ajax request:
    var ajaxPromiseGetter = () => new Promise((resolve, reject) => $.ajax({
      url: 'https://reqres.in/api/users/2',
      type: 'GET',
      success: data => resolve(data),
      error: err => reject(err)
    }));

    // no call back is passed here! We, and not AJAX function, decides what to do when the response is received
    var ajax = ajaxPromiseGetter();
    ajax
    .then(data => successCallback(data))
    .catch(err => failureCallback(err));
  })();
}

function chainingPromise() {
  // The then function returns a new promise different from the one on which then was called.
  // Hence promises can be chained.

  var cb = data => {
    console.log('I have data', data);
    return data * 2;
  }

  const promise1 = getPromise(true, 10);
  const promise2 = promise1.then(cb, cb); // then returns a promise
  const promise3 = promise2.then(cb, cb);
  const promise4 = promise3.then(cb, cb); // it can go on as long as we want

  // the above chain can be written as:
  getPromise(true, 10)
    .then(cb, cb)
    .then(cb, cb)
    .then(cb, cb);

  // promise chain is continued beyond catch even if one of the promise in the chain throws error
  new Promise((res, rej) => {
    console.log('Main promise');
    res();
  }).then(() => {
    console.log('First callback');
  }).then (() => {
    console.log('Second callback');
    throw new Error('error thrown');
    console.log('Error has already been thrown');
  }).then(() => {
    console.log('Callback next to errored');
  }).catch(err => {
    console.log('Error caught', err);
  }).then(() => {
    console.log('Callback after catch');
  });

  function getPromise(shouldFullfil, data) {
    return new Promise((resolve, reject) => shouldFullfil ? resolve(data) : reject(data));
  }

  /* expected output for the above chain:
    Main promise
    First callback
    Second callback
    Error caught ** error object **
    Callback after catch
  */
}
