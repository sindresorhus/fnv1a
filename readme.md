# fnv1a [![Build Status](https://travis-ci.org/sindresorhus/fnv1a.svg?branch=master)](https://travis-ci.org/sindresorhus/fnv1a)

> [FNV-1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) non-cryptographic hash function

[FNV-1a has outstanding distribution and collisions are rare.](https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed/145633#145633)

FNV hashes are designed to be fast while maintaining a low collision rate. The FNV speed allows one to quickly hash lots of data while maintaining a reasonable collision rate. The high dispersion of the FNV hashes makes them well suited for hashing nearly identical strings such as URLs, hostnames, filenames, text, IP addresses, etc.


## Install

```
$ npm install @sindresorhus/fnv1a
```

## Usage

### fnv1a(string)

```js
const fnv1a = require('@sindresorhus/fnv1a');

fnv1a('🦄🌈'); // => 2868248295
```

It returns the hash as a 32-bit positive Number.

### fnv1a.bigInt(string, [{size}])

On systems that support BigInt, this method may be called to generate larger
hashes.  This method throws if BigInt is not available, however.

```
fnv1a.bigInt('hello world', {size: 128}); // => 143667438548887148232425432707801491127n
```

It returns the hash as a `size`-bit positive BigInt.

## Related

- [djb2a](https://github.com/sindresorhus/djb2a) - DJB2a non-cryptographic hash function
- [sdbm](https://github.com/sindresorhus/sdbm) - SDBM non-cryptographic hash function


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
