declare namespace fnv1a {
	interface Options {
		/**
		The bit size of the hash.

		@default 32
		*/
		size?: 32 | 64 | 128 | 256 | 512 | 1024;
	}
}

declare const fnv1a: {
	/**
	[FNV-1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) non-cryptographic hash function.

	@returns The hash as a positive integer.

	@example
	```
	import fnv1a = require('@sindresorhus/fnv1a');

	fnv1a('🦄🌈');
	//=> 2868248295
	```
	*/
	(string: string): number;

	/**
	[FNV-1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) non-cryptographic hash function.

	Generate a larger hash using `BigInt`.

	@returns The hash as a positive BigInt.

	@example
	```
	import fnv1a = require('@sindresorhus/fnv1a');

	fnv1a.bigInt('🦄🌈', {size: 128});
	//=> 13487074350300261116944693128525960095n
	```
	*/
	bigInt(string: string, options?: fnv1a.Options): bigint;
};

export = fnv1a;
