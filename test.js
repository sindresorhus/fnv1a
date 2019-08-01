const {strictEqual} = require('assert');
const fnv1a = require('.');
const {bigInt} = require('.');

// NOTE: Note: Using native `assert` for testing here because ava and mocha both
// break when BigIntsPI are involved :-(

// Test 32-bit for various strings
strictEqual(fnv1a(''), 2166136261);
strictEqual(fnv1a('h'), 3977000791);
strictEqual(fnv1a('he'), 1547363254);
strictEqual(fnv1a('hel'), 179613742);
strictEqual(fnv1a('hell'), 477198310);
strictEqual(fnv1a('hello'), 1335831723);
strictEqual(fnv1a('hello '), 3801292497);
strictEqual(fnv1a('hello w'), 1402552146);
strictEqual(fnv1a('hello wo'), 3611200775);
strictEqual(fnv1a('hello wor'), 1282977583);
strictEqual(fnv1a('hello worl'), 2767971961);
strictEqual(fnv1a('hello world'), 3582672807);

// Bigger test
strictEqual(fnv1a('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.'), 2964896417);

// Verify unicode handling against values from https://www.tools4noobs.com/online_tools/hash/
strictEqual(fnv1a('🦄🌈'), 0xaaf5fee7);
strictEqual(fnv1a('\u{0000}\u{0080}\u{0100}\u{0180}\u{0250}\u{02b0}\u{0300}\u{0370}\u{0400}\u{0500}\u{0530}\u{0590}\u{0600}\u{0700}\u{0780}\u{0900}\u{0980}\u{0a00}\u{0a80}\u{0b00}\u{0b80}\u{0c00}\u{0c80}\u{0d00}\u{0d80}\u{0e00}\u{0e80}\u{0f00}\u{1000}\u{10a0}\u{1100}\u{1200}\u{13a0}\u{1400}\u{1680}\u{16a0}\u{1700}\u{1720}\u{1740}\u{1760}\u{1780}\u{1800}\u{1900}\u{1950}\u{19e0}\u{1d00}\u{1e00}\u{1f00}\u{2000}\u{2070}\u{20a0}\u{20d0}\u{2100}\u{2150}\u{2190}\u{2200}\u{2300}\u{2400}\u{2440}\u{2460}\u{2500}\u{2580}\u{25a0}\u{2600}\u{2700}\u{27c0}\u{27f0}\u{2800}\u{2900}\u{2980}\u{2a00}\u{2b00}\u{2e80}\u{2f00}\u{2ff0}\u{3000}\u{3040}\u{30a0}\u{3100}\u{3130}\u{3190}\u{31a0}\u{31f0}\u{3200}\u{3300}\u{3400}\u{4dc0}\u{4e00}\u{a000}\u{a490}\u{ac00}\u{d800}\u{dc00}\u{e000}\u{f900}\u{fb00}\u{fb50}\u{fe00}\u{fe20}\u{fe30}\u{fe50}\u{fe70}\u{ff00}\u{fff0}\u{10000}\u{10080}\u{10100}\u{10300}\u{10330}\u{10380}\u{10400}\u{10450}\u{10480}\u{10800}\u{1d000}\u{1d100}\u{1d300}\u{1d400}\u{20000}\u{2f800}\u{e0000}\u{e0100}'), 0x983fdf05);

// If BigInt support available ...
if (typeof(BigInt) != 'undefined') {
  // Sanity check larger hashes against values from
  // https://fnvhash.github.io/fnv-calculator-online/

  strictEqual(bigInt('hello world', {size: 32}), 0xd58b3fa7n);
  strictEqual(bigInt('hello world', {size: 64}), 0x779a65e7023cd2e7n);
  strictEqual(bigInt('hello world', {size: 128}), 0x6c155799fdc8eec4b91523808e7726b7n);
  strictEqual(bigInt('hello world', {size: 256}), 0xecc3cf2e0edfccd3d87f21ec0883aad4db43eead66ce09eb4a97e04e1a184527n);
  strictEqual(bigInt('hello world', {size: 512}), 0x2b9c19ec56ccf98da0f227cc82bfaacbd8350928bd2ceacae7bc8aa13e747f5c43ca4e2e98fc25e94e4e805675545ee95a3b968c0acfaecb90aea2fdbcd4de0fn);
  strictEqual(bigInt('hello world', {size: 1024}), 0x3fa9d253e52ae80105b382c80a01e27a53d7bc1d201efb47b38f4d6e465489829d7d272127d20e1076129c00000000000000000000000000000000000000000000000000000000000000000000000000000253eb20f42a7228af9022d9f35ece5bb71e40fcd8717b80d164ab921709996e5c43aae801418e878cddf968d4616fn);
}

console.log('All tests pass');
