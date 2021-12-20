# Class: SoftPromise<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Table of contents

### Constructors

- [constructor](../wiki/SoftPromise#constructor)

### Properties

- [[toStringTag]](../wiki/SoftPromise#%5Btostringtag%5D)
- [\_done](../wiki/SoftPromise#_done)
- [\_escape](../wiki/SoftPromise#_escape)
- [\_promise](../wiki/SoftPromise#_promise)

### Methods

- [box](../wiki/SoftPromise#box)
- [catch](../wiki/SoftPromise#catch)
- [escape](../wiki/SoftPromise#escape)
- [finally](../wiki/SoftPromise#finally)
- [then](../wiki/SoftPromise#then)
- [unwrap](../wiki/SoftPromise#unwrap)
- [wrap](../wiki/SoftPromise#wrap)
- [wrapWithTimeout](../wiki/SoftPromise#wrapwithtimeout)

## Constructors

### constructor

• **new SoftPromise**<`T`\>(`promise`, `options?`)

**`example`**
```typescript
const promise = new SoftPromise((resolve, reject) => {
   setTimeout(() => {
      resolve("Hello");
  }, 1000);
});
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | [`PromiseArg`](../wiki/Exports#promisearg)<`T`\> |
| `options?` | [`Options`](../wiki/Options) |

#### Defined in

[index.ts:29](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L29)

## Properties

### [toStringTag]

• **[toStringTag]**: `string` = `'SoftPromise'`

#### Defined in

[index.ts:165](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L165)

___

### \_done

• `Private` **\_done**: `boolean` = `false`

#### Defined in

[index.ts:14](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L14)

___

### \_escape

• `Private` **\_escape**: (`reason?`: `any`) => `void`

#### Type declaration

▸ (`reason?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `reason?` | `any` |

##### Returns

`void`

#### Defined in

[index.ts:13](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L13)

___

### \_promise

• `Private` **\_promise**: `Promise`<`T`\>

#### Defined in

[index.ts:12](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L12)

## Methods

### box

▸ **box**(): `Promise`<[``null`` \| `T`, `any`]\>

Returns a boxed promise (exceptions caught in second value of array)

#### Returns

`Promise`<[``null`` \| `T`, `any`]\>

#### Defined in

[index.ts:134](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L134)

___

### catch

▸ **catch**<`TResult`\>(`onrejected?`): `Promise`<`T` \| `TResult`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `onrejected?` | ``null`` \| (`reason`: `any`) => `TResult` \| `PromiseLike`<`TResult`\> |

#### Returns

`Promise`<`T` \| `TResult`\>

#### Defined in

[index.ts:157](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L157)

___

### escape

▸ **escape**(`reason?`): `void`

Escape promise

**`example`**
```typescript
promise.escape("Reason to escape");
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `reason?` | `any` |

#### Returns

`void`

#### Defined in

[index.ts:149](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L149)

___

### finally

▸ **finally**(`onfinally?`): `Promise`<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `onfinally?` | ``null`` \| () => `void` |

#### Returns

`Promise`<`T`\>

#### Defined in

[index.ts:161](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L161)

___

### then

▸ **then**<`TResult1`, `TResult2`\>(`onfulfilled?`, `onrejected?`): `Promise`<`TResult1` \| `TResult2`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult1` | `T` |
| `TResult2` | `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `onfulfilled?` | ``null`` \| (`value`: `T`) => `TResult1` \| `PromiseLike`<`TResult1`\> |
| `onrejected?` | ``null`` \| (`reason`: `any`) => `TResult2` \| `PromiseLike`<`TResult2`\> |

#### Returns

`Promise`<`TResult1` \| `TResult2`\>

#### Defined in

[index.ts:153](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L153)

___

### unwrap

▸ **unwrap**(): `Promise`<`T`\>

Unwrap promise

#### Returns

`Promise`<`T`\>

Promise<T>

#### Defined in

[index.ts:125](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L125)

___

### wrap

▸ `Static` **wrap**<`T`\>(`promise`, `options?`): [`SoftPromise`](../wiki/SoftPromise)<`T`\>

Wrap a promise in a SoftPromise

**`example`**
```typescript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
   resolve("Hello");
 }, 1000);
});

SoftPromise.wrap(promise);
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | `Promise`<`T`\> \| [`SoftPromise`](../wiki/SoftPromise)<`T`\> |
| `options?` | [`Options`](../wiki/Options) |

#### Returns

[`SoftPromise`](../wiki/SoftPromise)<`T`\>

#### Defined in

[index.ts:92](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L92)

___

### wrapWithTimeout

▸ `Static` **wrapWithTimeout**<`T`\>(`promise`, `timeout`): [`SoftPromise`](../wiki/SoftPromise)<`T`\>

Wrap promise with timeout

**`example`**
```typescript
const promise = new Promise((resolve, reject) => {
 setTimeout(() => {
  resolve("Hello");
 }, 1000);
});

SoftPromise.wrapWithTimeout(promise, 500);
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | `Promise`<`T`\> \| [`SoftPromise`](../wiki/SoftPromise)<`T`\> |
| `timeout` | `number` |

#### Returns

[`SoftPromise`](../wiki/SoftPromise)<`T`\>

#### Defined in

[index.ts:114](https://github.com/DominicVonk/soft-promise/blob/0a41c1e/index.ts#L114)
