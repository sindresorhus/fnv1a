import test from 'ava';
import fnv1a from '.';

test('main', t => {
	// Hash values checked against
	// https://www.tools4noobs.com/online_tools/hash/
	// https://md5calc.com/hash/fnv1a32
	t.is(fnv1a(''), 2166136261);
	t.is(fnv1a('🦄🌈'), 0xAAF5FEE7);

	t.is(fnv1a('h'), 3977000791);
	t.is(fnv1a('he'), 1547363254);
	t.is(fnv1a('hel'), 179613742);
	t.is(fnv1a('hell'), 477198310);
	t.is(fnv1a('hello'), 1335831723);
	t.is(fnv1a('hello '), 3801292497);
	t.is(fnv1a('hello w'), 1402552146);
	t.is(fnv1a('hello wo'), 3611200775);
	t.is(fnv1a('hello wor'), 1282977583);
	t.is(fnv1a('hello worl'), 2767971961);
	t.is(fnv1a('hello world'), 3582672807);

	t.is(fnv1a('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.'), 2964896417);

	// Test with a string containing characters from most (all?) of the unicode
	// character ranges:
	//
	// https://gist.github.com/broofa/8d9f717f8b10db7f9fc854e4fd597e95
	t.is(fnv1a('\u{0000}\u{0080}\u{0100}\u{0180}\u{0250}\u{02b0}\u{0300}\u{0370}\u{0400}\u{0500}\u{0530}\u{0590}\u{0600}\u{0700}\u{0780}\u{0900}\u{0980}\u{0a00}\u{0a80}\u{0b00}\u{0b80}\u{0c00}\u{0c80}\u{0d00}\u{0d80}\u{0e00}\u{0e80}\u{0f00}\u{1000}\u{10a0}\u{1100}\u{1200}\u{13a0}\u{1400}\u{1680}\u{16a0}\u{1700}\u{1720}\u{1740}\u{1760}\u{1780}\u{1800}\u{1900}\u{1950}\u{19e0}\u{1d00}\u{1e00}\u{1f00}\u{2000}\u{2070}\u{20a0}\u{20d0}\u{2100}\u{2150}\u{2190}\u{2200}\u{2300}\u{2400}\u{2440}\u{2460}\u{2500}\u{2580}\u{25a0}\u{2600}\u{2700}\u{27c0}\u{27f0}\u{2800}\u{2900}\u{2980}\u{2a00}\u{2b00}\u{2e80}\u{2f00}\u{2ff0}\u{3000}\u{3040}\u{30a0}\u{3100}\u{3130}\u{3190}\u{31a0}\u{31f0}\u{3200}\u{3300}\u{3400}\u{4dc0}\u{4e00}\u{a000}\u{a490}\u{ac00}\u{d800}\u{dc00}\u{e000}\u{f900}\u{fb00}\u{fb50}\u{fe00}\u{fe20}\u{fe30}\u{fe50}\u{fe70}\u{ff00}\u{fff0}\u{10000}\u{10080}\u{10100}\u{10300}\u{10330}\u{10380}\u{10400}\u{10450}\u{10480}\u{10800}\u{1d000}\u{1d100}\u{1d300}\u{1d400}\u{20000}\u{2f800}\u{e0000}\u{e0100}'), 0x983FDF05);
});
