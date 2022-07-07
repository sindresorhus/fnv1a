# fnv1a

> [FNV-1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) non-cryptographic hash function

[FNV-1a has outstanding distribution and collisions are rare.](https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed/145633#145633)

FNV hashes are designed to be fast while maintaining a low collision rate. The FNV speed allows one to quickly hash lots of data while maintaining a reasonable collision rate. The high dispersion of the FNV hashes makes them well suited for hashing nearly identical strings such as URLs, hostnames, filenames, text, IP addresses, etc.

## Install

```sh
npm install @sindresorhus/fnv1a
```

## Usage

```js
import fnv1a from '@sindresorhus/fnv1a';

fnv1a('🦄🌈', {size: 32});
//=> 2868248295n

fnv1a('🦄🌈', {size: 128});
//=> 13487074350300261116944693128525960095n

Number(fnv1a('🦄🌈', {size: 32}));
//=> 2868248295
```

## API

### fnv1a(string, options?)

Returns the hash as a positive `BigInt`.

If you need it as a `number`, use `32` as `size` and wrap the return value in `Number(…)`.

#### options

Type: `object`

##### size

Type: `number`\
Values: `32 | 64 | 128 | 256 | 512 | 1024`\
Default: `32`

The bit size of the hash.

## Related

- [djb2a](https://github.com/sindresorhus/djb2a) - DJB2a non-cryptographic hash function
- [sdbm](https://github.com/sindresorhus/sdbm) - SDBM non-cryptographic hash function
