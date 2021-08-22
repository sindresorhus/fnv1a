export interface Options {
	/**
	The bit size of the hash.

	@default 32
	*/
	readonly size?: 32 | 64 | 128 | 256 | 512 | 1024;
}

/**
[FNV-1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) non-cryptographic hash function.

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
```
*/
export default function fnv1a(string: string, options?: Options): bigint;
