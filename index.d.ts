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

	bigInt(string: string): BigInt;
};

export = fnv1a;
