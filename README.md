# Soft Promise

The escapeable promise

> Sometimes you don't want to be forced to wait for a promise to resolve.

With this library you can use a soft promise to escape the promise if it hasn't
resolved yet.

## Examples

### Example 1

```js
const { SoftPromise } = require("soft-promise");

const promise = new SoftPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello");
  }, 1000);
});

setTimeout(() => {
  promise.escape("Reason to escape");
});

(async () => {
  try {
    const result = await promise;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
})();
```

### Example 2

```js
const { softenPromise } = require("soft-promise");

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello");
  }, 1000);
});

const softPromise = softenPromise(promise); // SoftPromise.wrap(promise)

setTimeout(() => {
  softPromise.escape("Reason to escape");
});

(async () => {
  try {
    const result = await softPromise;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
})();
```

### Example 3

```js
const { softenPromiseWithTimeout } = require("soft-promise");

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello");
  }, 1000);
});

const softPromise = softenPromiseWithTimeout(promise, 500); // SoftPromise.wrapWithTimeout(promise, 500)
(async () => {
  const [result, error] = await softPromise.box();
  console.log({ result, error });
})();
```
