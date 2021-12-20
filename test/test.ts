import { SoftPromise } from './../index';
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