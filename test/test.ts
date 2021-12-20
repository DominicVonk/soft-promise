import { SoftPromise, softenPromise, softenPromiseWithTimeout } from './../index';
const promise = new SoftPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello");
    }, 1000);
});

const realPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello");
    }, 1000);
});

const softPromise = softenPromise(realPromise, {
    timeout: 500
});

setTimeout(() => {
    promise.escape("Reason to escape");
});


const realPromise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello");
    }, 1000);
});

const softenPromiseTimeout = softenPromiseWithTimeout(realPromise2, 1500);

(async () => {
    try {
        const result = await promise;
        console.log(result);
    } catch (error) {
        console.log(error);
    }
})();

(async () => {
    try {
        const result = await softPromise;
        console.log(result);
    } catch (error) {
        console.log(error);
    }
})();

(async () => {
    try {
        const result = await softenPromiseTimeout;
        console.log(result);
    } catch (error) {
        console.log(error);
    }
})();