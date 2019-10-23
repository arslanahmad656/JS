/*
  The syntax of async functions is syntactic sugar for the syntax of promise. Instead of using promise chains, we can use async/await pattern.
  This pattern is often used to re-write promise chains using async functions.

  Reference:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
*/

function getPromiseResolvingAfterTime(millisecs) {
  return function() {
    console.log(`Starting ${millisecs} promise`);
    return new Promise(resolve => setTimeout(() => {
      resolve(`${millisecs} promise`);
      console.log(`${millisecs} promise is done`);
    }, millisecs));
  }
};

var resolveSlowly = getPromiseResolvingAfterTime(10000);
var resoloveQuickly = getPromiseResolvingAfterTime(3000);

var sequentialStart = async function() {
  console.log('Sequential start');

  var slow = await resolveSlowly(); // Pause this function execution here (because this call is 'awaited') until resolveSlowly is resolved
  console.log(slow);
  var fast = await resoloveQuickly(); // Pause this function execution here until resolveSlowly is resolved
  console.log(fast);

  /* Expected output:
      Sequential start
      Starting 10000 promise
      *** 10s wait ***
      10000 promise is done
      10000 promise
      Starting 3000 promise
      *** 3s wait ***
      3000 promise is done
      3000 promise
  */
};

var concurrentStart = async function() {
  console.log('Concurrent start');

  var slow = resolveSlowly(); // No pause here. var slow simply contains the promise returned by resloveSlowly
  var fast = resoloveQuickly(); // No pause here

  var slowResult = await slow;  // wait until slow resolves
  console.log(slowResult);
  var fastResult = await fast;  // fast has already been resolved because both slow and fast are executing concurrently
  console.log(fastResult);

  /* Expected output:
      ConcurrentStart
      Starting 10000 promise
      Starting 3000 promise
      *** 3s wait ***
      3000 promise is done
      *** 7s wait ***
      10000 promise is done
      10000 promise
      3000 promise
  */
};

var concurrentPromise = function() {  // note that this function is not async
  console.log('Concurrent promise');
  return Promise.all([resolveSlowly(), resoloveQuickly()]).then(msgs => {
    console.log(msgs[0]);
    console.log(msgs[1]);
  });

  // return Promise.all(... is necessary because without this, the errors (if any) would not have been propagated

  /* Expected output:
      Concurrent promise
      Starting 10000 promise
      Starting 3000 promise
      *** wait 3s ***
      3000 promise is done
      *** wait 7s ***
      10000 promise is done
      10000 promise
      3000 promise
  */

  // Note that since Promise.all is not awaited, the function will return and the output will occur at a later time.
};

var parallelStart = async function() {  // compare this function with concurrentStart
  console.log('Parallel start');
  // Pure paralellism
  await Promise.all([
    (async () => console.log(await resolveSlowly()))(),
    (async () => console.log(await resoloveQuickly()))()
  ]);

  /*
    Expected output:
      Paralell start
      Starting 10000 promise
      Starting 3000 promise
      *** wait 3s ***
      3000 promise is done
      3000 promise
      *** wait 7s ***
      10000 promise is done
      10000 promise
  */
};

var parallelPromise = function() {
  console.log('Parallel promise');
  resolveSlowly().then(msg => console.log(msg));
  resoloveQuickly().then(msg => console.log(msg));

  /*
    Expected output:
      Starting 10000 promise
      Starting 3000 promise
      *** wait 3s ***
      3000 promise is done
      3000 promise
      *** wait 7s ***
      10000 promise is done
      10000 promise
  */

  /* Note that since none of the promises above is awaited, the function will return and the output will occur at a later time.
  */
};

(function run() {
  // sequentialStart();
  // concurrentStart();
  // concurrentPromise();
  // parallelStart();
  parallelPromise();
})();


/*
    There is an important difference to make between concurrentStart and parallelStart:
      Promises in both functions run in parallel. However, the former function synchronizes the output of promises using await keyword;
      the promises in the later function are not synchronized in anyway and run in parallel.
*/
