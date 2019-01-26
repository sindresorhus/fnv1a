'use strict';

/**
 * Offset basis reference: http://www.isthe.com/chongo/tech/comp/fnv/index.html#FNV-param
 */

const OFFSET_BASIS = {
	32: 2166136261,
	64: 14695981039346656037,
	128: getBigInt('144066263297769815596495629667062367629'),
	256: getBigInt('100029257958052580907070968620625704837092796014241193945225284501741471925557'),
	512: getBigInt('9659303129496669498009435400716310466090418745672637896108374329434462657994582932197716438449813051892206539805784495328239340083876191928701583869517785'),
	1024: getBigInt('14197795064947621068722070641403218320880622795441933960878474914617582723252296732303717722150864096521202355549365628174669108571814760471015076148029755969804077320157692458563003215304957150157403644460363550505412711285966361610267868082893823963790439336411086884584107735010676915')
};

function getBigInt(int) {
	if (typeof (int) === Number) {
		return BigInt(int);
	}

	return BigInt(int.toString());
}

module.exports = (string, offsetBasis) => {
	let hash = OFFSET_BASIS[offsetBasis];

	/**
	 * No need to do BigInt calculations.
	 */

	if (offsetBasis === 32 || offsetBasis === 64) {
		for (let i = 0; i < string.length; i++) {
			hash ^= string.charCodeAt(i);
			// Using bitshift for accuracy and performance. Numbers in JS suck.
			hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
		}

		return hash >>> 0;
	}

	/**
	 * BigInt calculations for offsetBasis greater than 64.
	 *
	 */
	for (let i = 0; i < string.length; i++) {
		hash ^= getBigInt(string.charCodeAt(i).toString());
		hash += (hash << getBigInt('1')) + (hash << getBigInt('4')) + (hash << getBigInt('7')) + (hash << getBigInt('8')) + (hash << getBigInt('24'));
	}

	return hash >> getBigInt('0');
};
