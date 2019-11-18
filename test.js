import test from 'ava';
import fnv1a from '.';

test('default', t => {
	// Test 32-bit for various strings
	t.is(fnv1a(''), 2166136261);
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

	// Bigger test
	t.is(fnv1a('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.'), 2964896417);
});

test('unicode handling', t => {
	// Verify Unicode handling against values from https://www.tools4noobs.com/online_tools/hash/
	t.is(fnv1a('🦄🌈'), 0xAAF5FEE7);
	t.is(fnv1a('\u{0000}\u{0080}\u{0100}\u{0180}\u{0250}\u{02b0}\u{0300}\u{0370}\u{0400}\u{0500}\u{0530}\u{0590}\u{0600}\u{0700}\u{0780}\u{0900}\u{0980}\u{0a00}\u{0a80}\u{0b00}\u{0b80}\u{0c00}\u{0c80}\u{0d00}\u{0d80}\u{0e00}\u{0e80}\u{0f00}\u{1000}\u{10a0}\u{1100}\u{1200}\u{13a0}\u{1400}\u{1680}\u{16a0}\u{1700}\u{1720}\u{1740}\u{1760}\u{1780}\u{1800}\u{1900}\u{1950}\u{19e0}\u{1d00}\u{1e00}\u{1f00}\u{2000}\u{2070}\u{20a0}\u{20d0}\u{2100}\u{2150}\u{2190}\u{2200}\u{2300}\u{2400}\u{2440}\u{2460}\u{2500}\u{2580}\u{25a0}\u{2600}\u{2700}\u{27c0}\u{27f0}\u{2800}\u{2900}\u{2980}\u{2a00}\u{2b00}\u{2e80}\u{2f00}\u{2ff0}\u{3000}\u{3040}\u{30a0}\u{3100}\u{3130}\u{3190}\u{31a0}\u{31f0}\u{3200}\u{3300}\u{3400}\u{4dc0}\u{4e00}\u{a000}\u{a490}\u{ac00}\u{d800}\u{dc00}\u{e000}\u{f900}\u{fb00}\u{fb50}\u{fe00}\u{fe20}\u{fe30}\u{fe50}\u{fe70}\u{ff00}\u{fff0}\u{10000}\u{10080}\u{10100}\u{10300}\u{10330}\u{10380}\u{10400}\u{10450}\u{10480}\u{10800}\u{1d000}\u{1d100}\u{1d300}\u{1d400}\u{20000}\u{2f800}\u{e0000}\u{e0100}'), 0x983FDF05);
});

test('bigInt()', t => {
	// Sanity check larger hashes against values from
	// https://fnvhash.github.io/fnv-calculator-online/

	t.is(fnv1a.bigInt('hello world', {size: 32}), BigInt('0xd58b3fa7'));
	t.is(fnv1a.bigInt('hello world', {size: 64}), BigInt('0x779a65e7023cd2e7'));
	t.is(fnv1a.bigInt('hello world', {size: 128}), BigInt('0x6c155799fdc8eec4b91523808e7726b7'));
	t.is(fnv1a.bigInt('hello world', {size: 256}), BigInt('0xecc3cf2e0edfccd3d87f21ec0883aad4db43eead66ce09eb4a97e04e1a184527'));
	t.is(fnv1a.bigInt('hello world', {size: 512}), BigInt('0x2b9c19ec56ccf98da0f227cc82bfaacbd8350928bd2ceacae7bc8aa13e747f5c43ca4e2e98fc25e94e4e805675545ee95a3b968c0acfaecb90aea2fdbcd4de0f'));
	t.is(fnv1a.bigInt('hello world', {size: 1024}), BigInt('0x3fa9d253e52ae80105b382c80a01e27a53d7bc1d201efb47b38f4d6e465489829d7d272127d20e1076129c00000000000000000000000000000000000000000000000000000000000000000000000000000253eb20f42a7228af9022d9f35ece5bb71e40fcd8717b80d164ab921709996e5c43aae801418e878cddf968d4616f'));
});

test('bigInt() - 32-bit', t => {
	t.is(fnv1a.bigInt('', {size: 32}), 2166136261n);
	t.is(fnv1a.bigInt('hello', {size: 32}), 1335831723n);
});

test('bigInt() - 64-bit', t => {
	t.is(fnv1a.bigInt(''), 2166136261n);
	t.is(fnv1a.bigInt('', {size: 64}), 14695981039346656037n);
	t.is(fnv1a.bigInt('hello'), 1335831723n);
	t.is(fnv1a.bigInt('hello', {size: 64}), 11831194018420276491n);
	t.is(fnv1a.bigInt('🦄🌈'), 2868248295n);
});

test('bigInt() - 128-bit', t => {
	t.is(fnv1a.bigInt('', {size: 128}), 144066263297769815596495629667062367629n);
	t.is(fnv1a.bigInt('hello', {size: 128}), 302907886228425533802623465673358913971n);
});

test('bigInt() - 256-bit', t => {
	t.is(fnv1a.bigInt('', {size: 256}), 100029257958052580907070968620625704837092796014241193945225284501741471925557n);
	t.is(fnv1a.bigInt('hello', {size: 256}), 24621739307028566391642840221992687346817534817626804975463790541119213691899n);
});

test('bigInt() - 512-bit', t => {
	t.is(fnv1a.bigInt('', {size: 512}), 9659303129496669498009435400716310466090418745672637896108374329434462657994582932197716438449813051892206539805784495328239340083876191928701583869517785n);
	t.is(fnv1a.bigInt('hello', {size: 512}), 7892563648106928388641744747901962995816211260805030760135011933811709338702442123338016979459597105834714497783048560046644182143206509375819400532849111n);
});

test('bigInt() - 1024-bit', t => {
	t.is(fnv1a.bigInt('', {size: 1024}), 14197795064947621068722070641403218320880622795441933960878474914617582723252296732303717722150864096521202355549365628174669108571814760471015076148029755969804077320157692458563003215304957150157403644460363550505412711285966361610267868082893823963790439336411086884584107735010676915n);
	t.is(fnv1a.bigInt('hello', {size: 1024}), 162599568807828018278740454090851618076261791243547429330845926617440124701815376483262958546407611470083720486420160817850263303428987405974668389046941240548898833919126704680456253506816487407186600714845619389901326326498663678676823405702541932736634507371229190999806123793839783784715844873833n);
});
