# fnv1a [![Build Status](https://travis-ci.org/sindresorhus/fnv1a.svg?branch=master)](https://travis-ci.org/sindresorhus/fnv1a)

> [FNV-1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) non-cryptographic hash function

[FNV-1a has outstanding distribution and collisions are rare.](https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed/145633#145633)

FNV hashes are designed to be fast while maintaining a low collision rate. The FNV speed allows one to quickly hash lots of data while maintaining a reasonable collision rate. The high dispersion of the FNV hashes makes them well suited for hashing nearly identical strings such as URLs, hostnames, filenames, text, IP addresses, etc.

## Install

```
$ npm install @sindresorhus/fnv1a
```

## Usage

```js
const fnv1a = require('@sindresorhus/fnv1a');

fnv1a('🦄🌈');
//=> 2868248295

fnv1a.bigInt('🦄🌈', {size: 128});
//=> 13487074350300261116944693128525960095n
```

## API

### fnv1a(string)

Returns the hash as a 32-bit positive integer.

### fnv1a.bigInt(string, options?)

Generate a larger hash using `BigInt`.

Returns the hash as a positive `BigInt`.

#### options

Type: `object`

##### size

Type: `number`\
Values: `32 | 64 | 128 | 256 | 512 | 1024`

The bit size of the hash.

## Related

- [djb2a](https://github.com/sindresorhus/djb2a) - DJB2a non-cryptographic hash function
- [sdbm](https://github.com/sindresorhus/sdbm) - SDBM non-cryptographic hash function
