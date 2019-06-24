declare const fnv1a: {
	/**
	[FNV-1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) non-cryptographic hash function.

	@returns The hash as a positive integer.

	@example
	```
	const fnv1a = require('@sindresorhus/fnv1a');

	fnv1a('🦄🌈');
	//=> 582881315
	```
	*/
	(string: string): number;

  /**
	[FNV-1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) non-cryptographic hash function.

	@returns The hash as a positive BigInt.

	@example
	```
	const fnv1a = require('@sindresorhus/fnv1a');

	fnv1a.bigInt('🦄🌈');
	//=> 13699318705488764547n
	```
	*/
  bigInt: undefined | ((string: string, options?: {bits: 32 | 64 | 128 | 256 | 512 | 1024}) => BigInt);

	// TODO: remove this in the next major version, refactor the whole definition to:
	// declare function fnv1a(string: string): number;
	// export = fnv1a;
	default: typeof fnv1a;
};

export = fnv1a;
