'use strict';

// FNV_PRIMES and FNV_OFFSETS from
// http://www.isthe.com/chongo/tech/comp/fnv/index.html#FNV-param

const FNV_PRIMES = {
	32: 16777619n,
	64: 1099511628211n,
	128: 309485009821345068724781371n,
	256: 374144419156711147060143317175368453031918731002211n,
	512: 35835915874844867368919076489095108449946327955754392558399825615420669938882575126094039892345713852759n,
	1024: 5016456510113118655434598811035278955030765345404790744303017523831112055108147451509157692220295382716162651878526895249385292291816524375083746691371804094271873160484737966720260389217684476157468082573n
};

const FNV_OFFSETS = {
	32: 2166136261n,
	64: 14695981039346656037n,
	128: 144066263297769815596495629667062367629n,
	256: 100029257958052580907070968620625704837092796014241193945225284501741471925557n,
	512: 9659303129496669498009435400716310466090418745672637896108374329434462657994582932197716438449813051892206539805784495328239340083876191928701583869517785n,
	1024: 14197795064947621068722070641403218320880622795441933960878474914617582723252296732303717722150864096521202355549365628174669108571814760471015076148029755969804077320157692458563003215304957150157403644460363550505412711285966361610267868082893823963790439336411086884584107735010676915n
};

// Legacy implementation for 32-bit + number types
function fnv1a(string) {
	// Handle Unicode code points > 0x7f
	let hash = Number(FNV_OFFSETS[32]);
	let isUnicoded = false;

	for (let i = 0; i < string.length; i++) {
		let characterCode = string.charCodeAt(i);

		// Non-ASCII characters trigger the Unicode escape logic
		if (characterCode > 0x7F && !isUnicoded) {
			string = unescape(encodeURIComponent(string));
			characterCode = string.charCodeAt(i);
			isUnicoded = true;
		}

		hash ^= characterCode;
		hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
	}

	return hash >>> 0;
}

function bigInt(string, {size = 32} = {}) {
	if (!FNV_PRIMES[size]) {
		throw new Error('The `size` option must be one of 32, 64, 128, 256, 512, or 1024');
	}

	let hash = FNV_OFFSETS[size];
	const fnvPrime = FNV_PRIMES[size];

	// Handle Unicode code points > 0x7f
	let isUnicoded = false;

	for (let i = 0; i < string.length; i++) {
		let characterCode = string.charCodeAt(i);

		// Non-ASCII characters trigger the Unicode escape logic
		if (characterCode > 0x7F && !isUnicoded) {
			string = unescape(encodeURIComponent(string));
			characterCode = string.charCodeAt(i);
			isUnicoded = true;
		}

		hash ^= BigInt(characterCode);
		hash = BigInt.asUintN(size, hash * fnvPrime);
	}

	return hash;
}

module.exports = fnv1a;
module.exports.bigInt = bigInt;
