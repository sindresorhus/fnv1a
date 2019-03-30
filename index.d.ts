declare const fnv1a: {
	/**
	[FNV-1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) non-cryptographic hash function.

	@returns The hash as a positive integer.

	@example
	```
	import fnv1a = require('@sindresorhus/fnv1a');

	fnv1a('🦄🌈');
	//=> 582881315
	```
	*/
	(string: string): number;

	// TODO: remove this in the next major version, refactor the whole definition to:
	// declare function fnv1a(string: string): number;
	// export = fnv1a;
	default: typeof fnv1a;
};

export = fnv1a;
