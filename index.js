'use strict';

const OFFSET_BASIS_32 = 2166136261;

function fnv1a(str) {
	let _ = OFFSET_BASIS_32; // The running hash value

	for (const c of str) {
		const v = c.codePointAt(0);

		// Process each byte of unicode codepoints.  The code here would be smaller
		// if we used the `unescape(encodeURIComponent(str))` hack, but that's not
		// as efficient.  This also gzips well, so doesn't actually make the code
		// that much bigger.
		if (v < 0x80) {
			_ ^= v & 0x7F;
			_ += (_ << 1) + (_ << 4) + (_ << 7) + (_ << 8) + (_ << 24);
		} else if (v < 0x800) {
			_ ^= (v >> 6) | 0xC0;
			_ += (_ << 1) + (_ << 4) + (_ << 7) + (_ << 8) + (_ << 24);
			_ ^= (v & 0x3F) | 0x80;
			_ += (_ << 1) + (_ << 4) + (_ << 7) + (_ << 8) + (_ << 24);
		} else if (v < 0x10000) {
			_ ^= (v >> 12) | 0xE0;
			_ += (_ << 1) + (_ << 4) + (_ << 7) + (_ << 8) + (_ << 24);
			_ ^= ((v >> 6) & 0x3F) | 0x80;
			_ += (_ << 1) + (_ << 4) + (_ << 7) + (_ << 8) + (_ << 24);
			_ ^= (v & 0x3F) | 0x80;
			_ += (_ << 1) + (_ << 4) + (_ << 7) + (_ << 8) + (_ << 24);
		} else {
			_ ^= (v >> 18) | 0xF0;
			_ += (_ << 1) + (_ << 4) + (_ << 7) + (_ << 8) + (_ << 24);
			_ ^= ((v >> 12) & 0x3F) | 0x80;
			_ += (_ << 1) + (_ << 4) + (_ << 7) + (_ << 8) + (_ << 24);
			_ ^= ((v >> 6) & 0x3F) | 0x80;
			_ += (_ << 1) + (_ << 4) + (_ << 7) + (_ << 8) + (_ << 24);
			_ ^= (v & 0x3F) | 0x80;
			_ += (_ << 1) + (_ << 4) + (_ << 7) + (_ << 8) + (_ << 24);
		}
	}

	return _ >>> 0;
}

module.exports = fnv1a;
// TODO: remove this in the next major version, refactor the whole definition to:
module.exports.default = fnv1a;
