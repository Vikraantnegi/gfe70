// Debouncing is a technique used to control how many times we allow a function to be executed over time.
// When a JavaScript function is debounced with a wait time of X milliseconds, it must wait until after X milliseconds have elapsed since the debounced function was last called.
// Implement a debounce function which accepts a callback function and a wait duration.
// Calling debounce() returns a function which has debounced invocations of the callback function following the behavior described above.

function debounce(func, wait) {
  let timer;

  return function (...args) {
    let context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(context, ...args);
    }, wait);
  };
}

// Debounce with a cancel() method to cancel delayed invocations and a flush() method to immediately invoke them.
// Cancel should clear any timers, and flush should cancel and invoke

function debounce(func, wait) {
  let timer;
  let context;
  let lastArgs;

  function debounced(this, ...args) {
    context = this;
    lastArgs = args;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(context, ...args);
      timer = null;
      context = null;
      lastArgs = null;
    }, wait);
  }

  debounced.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    context = null;
    lastArgs = null;
  };

  debounced.flush = function () {
    if (lastArgs && context) {
      debounced.cancel();
      func.call(context, ...lastArgs);
    }
  };

  return debounced;
}
