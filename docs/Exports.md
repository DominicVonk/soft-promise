# soft-promise

## Table of contents

### References

- [default](../wiki/Exports#default)

### Classes

- [SoftPromise](../wiki/SoftPromise)

### Interfaces

- [Options](../wiki/Options)

### Type aliases

- [BoxedPromise](../wiki/Exports#boxedpromise)
- [PromiseArg](../wiki/Exports#promisearg)
- [PromiseParam](../wiki/Exports#promiseparam)

### Functions

- [boxPromise](../wiki/Exports#boxpromise)
- [softenPromise](../wiki/Exports#softenpromise)
- [softenPromiseWithTimeout](../wiki/Exports#softenpromisewithtimeout)

## References

### default

Renames and re-exports [SoftPromise](../wiki/SoftPromise)

## Type aliases

### BoxedPromise

Ƭ **BoxedPromise**<`T`\>: `Promise`<[`T` \| ``null``, `any`]\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:10](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L10)

___

### PromiseArg

Ƭ **PromiseArg**<`T`\>: (`resolve`: (`value`: `T` \| `PromiseLike`<`T`\>) => `void`, `reject`: (`reason?`: `any`) => `void`) => `void` \| [`PromiseParam`](../wiki/Exports#promiseparam)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:5](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L5)

___

### PromiseParam

Ƭ **PromiseParam**<`T`\>: `Promise`<`T`\> \| [`SoftPromise`](../wiki/SoftPromise)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:8](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L8)

## Functions

### boxPromise

▸ **boxPromise**<`T`\>(`promise`): [`BoxedPromise`](../wiki/Exports#boxedpromise)<`T`\>

Box results of a promise

**`example`**
```typescript
const promise = new Promise((resolve, reject) => {
 setTimeout(() => {
  resolve("Hello");
 }, 1000);
});
let [result,error] = boxPromise(promise);
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | [`PromiseParam`](../wiki/Exports#promiseparam)<`T`\> |

#### Returns

[`BoxedPromise`](../wiki/Exports#boxedpromise)<`T`\>

#### Defined in

[index.ts:231](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L231)

___

### softenPromise

▸ **softenPromise**<`T`\>(`promise`, `options?`): [`SoftPromise`](../wiki/SoftPromise)<`T`\>

Soften promise

**`example`**
```typescript
const promise = new Promise((resolve, reject) => {
 setTimeout(() => {
   resolve("Hello");
 }, 1000);
});

softenPromise(promise);
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | [`PromiseParam`](../wiki/Exports#promiseparam)<`T`\> |
| `options?` | [`Options`](../wiki/Options) |

#### Returns

[`SoftPromise`](../wiki/SoftPromise)<`T`\>

#### Defined in

[index.ts:186](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L186)

___

### softenPromiseWithTimeout

▸ **softenPromiseWithTimeout**<`T`\>(`promise`, `timeout`, `options?`): [`SoftPromise`](../wiki/SoftPromise)<`T`\>

Soften promise with timeout

**`example`**
```typescript
const promise = new Promise((resolve, reject) => {
 setTimeout(() => {
   resolve("Hello");
 }, 1000);
});
softenPromiseWithTimeout(promise, 500);
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | [`PromiseParam`](../wiki/Exports#promiseparam)<`T`\> |
| `timeout` | `number` |
| `options?` | [`Options`](../wiki/Options) |

#### Returns

[`SoftPromise`](../wiki/SoftPromise)<`T`\>

#### Defined in

[index.ts:208](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L208)
