'use strict';
const OFFSET_BASIS_32 = 2166136261;

const fnv1a = string => {
	let hash = OFFSET_BASIS_32;

	for (let i = 0; i < string.length; i++) {
		hash ^= string.charCodeAt(i);

		// 32-bit FNV prime: 2**24 + 2**8 + 0x93 = 16777619
		// Using bitshift for accuracy and performance. Numbers in JS suck.
		hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
	}

	return hash >>> 0;
};

module.exports = fnv1a;
// TODO: remove this in the next major version, refactor the whole definition to:
module.exports.default = fnv1a;
