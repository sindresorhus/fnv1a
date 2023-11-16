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

const bytes = new Uint8Array([240, 159, 166, 132, 240, 159, 140, 136]);
fnv1a(bytes, {size: 32});
//=> 2868248295n
```

## API

### fnv1a(value, options?)

Returns the hash as a positive `BigInt`.

If you need it as a `number`, use `32` as `size` and wrap the return value in `Number(…)`.

#### value

Type: `string | Uint8Array`

A string or UTF-8 bytes.

#### options

Type: `object`

##### size

Type: `number`\
Values: `32 | 64 | 128 | 256 | 512 | 1024`\
Default: `32`

The bit size of the hash.

##### utf8Buffer

Type: `Uint8Array`

A Uint8Array used to encode the string into UTF-8 bytes.

This array can be reused across calls to `fnv1a`. Doing so will improve performance because it avoids allocating a new Uint8Array when encoding the string.

The size of the array does not have to be large enugh to hold the entire string, but performance will be improved if it is.

This option is only used when `value` is a string.

```js
import fnv1a from '@sindresorhus/fnv1a';

const utf8Buffer = new Uint8Array(100);

fnv1a('🦄🌈', {size: 32, utf8Buffer});
//=> 2868248295n
```

## Related

- [djb2a](https://github.com/sindresorhus/djb2a) - DJB2a non-cryptographic hash function
- [sdbm](https://github.com/sindresorhus/sdbm) - SDBM non-cryptographic hash function
