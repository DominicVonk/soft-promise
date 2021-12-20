interface Options {
    timeout?: number;
}
export class SoftPromise<T = any> {
    private _promise: Promise<T>;
    private _escape: (reason?: any) => void = (reason?: any) => { };
    private _done = false;
    constructor (promise: ((resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) | Promise<T> | SoftPromise<T>, options?: Options) {
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
    static wrap<T> (promise: Promise<T> | SoftPromise<T>, options?: Options) {
        return new SoftPromise(promise, options);
    }

    public unwrap () {
        return this._promise;
    }

    public escape (reason?: any) {
        this._escape(reason);
    }

    public then<TResult1 = T, TResult2 = never> (onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2> {
        return this._promise.then(onfulfilled, onrejected);
    }

    public catch<TResult = never> (onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult> {
        return this._promise.catch(onrejected);
    }

    public finally (onfinally?: (() => void) | undefined | null): Promise<T> {
        return this._promise.finally(onfinally);
    }

    public [Symbol.toStringTag] = 'SoftPromise';
}

export function softenPromise<T> (promise: Promise<T> | SoftPromise<T>, options?: Options) {
    return SoftPromise.wrap(promise, options);
}


export default SoftPromise;