interface Options {
    timeout?: number;
}

type PromiseArg<T> =
    ((resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) | PromiseParam<T>;

type PromiseParam<T> = Promise<T> | SoftPromise<T>;

type BoxedPromise<T> = Promise<[T | null, any]>;
export class SoftPromise<T = any> {
    private _promise: Promise<T>;
    private _escape: (reason?: any) => void = (reason?: any) => { };
    private _done = false;

    /**
     * @param {PromiseArg<T>} promiseOrValue
     * @param {Options} options
     * @constructor
     *
     * @example
     * const promise = new SoftPromise((resolve, reject) => {
     *    setTimeout(() => {
     *       resolve("Hello");
     *   }, 1000);
     * });
     *
     */
    constructor (promise: PromiseArg<T>, options?: Options) {
        this._promise = new Promise<T>((r, j) => {
            this._escape = (reason?: any) => {
                if (!this._done) {
                    this._done = true;
                    j(reason);

                }
            }
            if (promise instanceof Promise || promise instanceof SoftPromise) {
                promise.then((value: T | PromiseLike<T>) => {
                    if (!this._done) {
                        this._done = true;
                        r(value);
                    }
                }, (reason?: any) => {
                    if (!this._done) {
                        this._done = true;
                        j(reason);
                    }
                });
            } else {
                promise((value: T | PromiseLike<T>) => {
                    if (!this._done) {
                        this._done = true;
                        r(value);
                    }
                }, (reason?: any) => {
                    if (!this._done) {
                        this._done = true;
                        j(reason);
                    }
                });
            }
        });

        if (options?.timeout && typeof options.timeout === 'number' && options.timeout > 0) {
            setTimeout(() => {
                this.escape('Timeout');
            }, options.timeout);
        }

    }

    /**
     *
     * Wrap a promise in a SoftPromise
     *
     * @static
     * @param {PromiseParam<T>} promise
     * @param {Options} options
     * @returns {SoftPromise<T>}
     *
     * @example
     * const promise = new Promise((resolve, reject) => {
     *   setTimeout(() => {
     *    resolve("Hello");
     *  }, 1000);
     * });
     *
     * SoftPromise.wrap(promise);
     */
    static wrap<T> (promise: Promise<T> | SoftPromise<T>, options?: Options) {
        return new SoftPromise<T>(promise, options);
    }

    /**
     * Wrap promise with timeout
     *
     * @static
     * @param {PromiseParam<T>} promise
     * @param {number} timeout
     * @returns {SoftPromise<T>}
     *
     * @example
     * const promise = new Promise((resolve, reject) => {
     *  setTimeout(() => {
     *   resolve("Hello");
     *  }, 1000);
     * });
     *
     * SoftPromise.wrapWithTimeout(promise, 500);
     */
    static wrapWithTimeout<T> (promise: Promise<T> | SoftPromise<T>, timeout: number) {
        return new SoftPromise<T>(promise, {
            timeout
        });
    }

    /**
     * Unwrap promise
     *
     * @method
     * @returns Promise<T>
     */
    public unwrap () {
        return this._promise;
    }

    /**
     * Returns a boxed promise (exceptions caught in second value of array)
     *
     * @method
     * @returns {BoxedPromise<T>}
     */
    public box (): Promise<[T | null, any]> {
        return boxPromise(this._promise)
    }

    /**
     * Escape promise
     *
     * @method
     * @param {any} reason
     * @returns {void}
     *
     * @example
     * promise.escape("Reason to escape");
     */
    public escape (reason?: any) {
        this._escape(reason);
    }

    /**
     * @method
     */
    public then<TResult1 = T, TResult2 = never> (onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2> {
        return this._promise.then(onfulfilled, onrejected);
    }

    /**
     * @method
     */
    public catch<TResult = never> (onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult> {
        return this._promise.catch(onrejected);
    }

    /**
     * @method
     */
    public finally (onfinally?: (() => void) | undefined | null): Promise<T> {
        return this._promise.finally(onfinally);
    }

    public [Symbol.toStringTag] = 'SoftPromise';
}

/**
 * Soften promise
 *
 * @param {PromiseParam<T>} promise
 * @param options
 * @returns {SoftPromise<T>}
 *
 * @example
 * const promise = new Promise((resolve, reject) => {
 *  setTimeout(() => {
 *    resolve("Hello");
 *  }, 1000);
 * });
 *
 * softenPromise(promise);
 */
export function softenPromise<T> (promise: PromiseParam<T>, options?: Options) {
    return SoftPromise.wrap(promise, options);
}

/**
 * Soften promise with timeout
 *
 * @param {PromiseParam<T>} promise
 * @param {number} timeout
 * @param {Options} options
 * @returns  {SoftPromise<T>}
 *
 * @example
 * const promise = new Promise((resolve, reject) => {
 *  setTimeout(() => {
 *    resolve("Hello");
 *  }, 1000);
 * });
 * softenPromiseWithTimeout(promise, 500);
 */
export function softenPromiseWithTimeout<T> (promise: PromiseParam<T>, timeout: number, options?: Options) {
    return softenPromise(promise, {
        ...options,
        timeout
    });
}

/**
 * Box results of a promise
 *
 * @param {PromiseParam<T>} promise
 * @returns {BoxedPromise<T>}
 *
 * @example
 * const promise = new Promise((resolve, reject) => {
 *  setTimeout(() => {
 *   resolve("Hello");
 *  }, 1000);
 * });
 * let [result,error] = boxPromise(promise);
 *
 */
export async function boxPromise<T> (promise: PromiseParam<T>): BoxedPromise<T> {
    try {
        return [await promise, null];
    } catch (error) {
        return [null, error];
    }
}

export default SoftPromise;