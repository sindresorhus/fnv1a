export interface Options {
	/**
	The bit size of the hash.

	@default 32
	*/
	readonly size?: 32 | 64 | 128 | 256 | 512 | 1024;

	/**
	A Uint8Array used to encode the string into UTF-8 bytes.

	This array can be reused across calls to `fnv1a`. Doing so will improve performance because it avoids allocating a new Uint8Array when encoding the string.

	The size of the array does not have to be large enugh to hold the entire string, but performance will be improved if it is.

	This option is only used when `value` is a string.

	@example
	```
	import fnv1a from '@sindresorhus/fnv1a';

	const utf8Buffer = new Uint8Array(100);

	fnv1a('🦄🌈', {size: 32, utf8Buffer});
	//=> 2868248295n
	```
	*/
	readonly utf8Buffer?: Uint8Array;
}

/**
[FNV-1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) non-cryptographic hash function.

@param value - A string or UTF-8 bytes.
@returns The hash as a positive `BigInt`.

@example
```
import fnv1a from '@sindresorhus/fnv1a';

fnv1a('🦄🌈', {size: 32});
//=> 2868248295n

fnv1a('🦄🌈', {size: 128});
//=> 13487074350300261116944693128525960095n

Number(fnv1a('🦄🌈', {size: 32}));
//=> 2868248295

const bytes = new Uint8Array([240, 159, 166, 132, 240, 159, 140, 136]);
fnv1a(bytes, {size: 32});
//=> 2868248295n
```
*/
export default function fnv1a(value: string | Uint8Array, options?: Options): bigint;
