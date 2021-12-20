# Soft Promise

The escapeable promise

> Sometimes you don't want to be forced to wait for a promise to resolve.

With this library you can use a soft promise to escape the promise if it hasn't
resolved yet.

## Example

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
