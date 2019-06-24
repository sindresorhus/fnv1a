import test from 'ava';
import fnv1a from '.';

test('32-bit', t => {
	t.is(fnv1a(''), 2166136261);
	t.is(fnv1a('🦄🌈'), 582881315);

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
});


test('BigInt 32-bit', t => {
	t.is(fnv1a.bigInt('', {bits: 32}), BigInt('2166136261'));
	t.is(fnv1a.bigInt('hello', {bits: 32}), BigInt('1335831723'));
});

test('BigInt 64-bit', t => {
	t.is(fnv1a.bigInt(''), BigInt('14695981039346656037'));
	t.is(fnv1a.bigInt('', {bits: 64}), BigInt('14695981039346656037'));
	t.is(fnv1a.bigInt('hello'), BigInt('11831194018420276491'));
	t.is(fnv1a.bigInt('hello', {bits: 64}), BigInt('11831194018420276491'));
	t.is(fnv1a.bigInt('🦄🌈'), BigInt('13699318705488764547'));
});

test('BigInt 128-bit', t => {
	t.is(fnv1a.bigInt('', {bits: 128}), BigInt('144066263297769815596495629667062367629'));
	t.is(fnv1a.bigInt('hello', {bits: 128}), BigInt('302907886228425533802623465673358913971'));
});

test('BigInt 256-bit', t => {
	t.is(fnv1a.bigInt('', {bits: 256}), BigInt('100029257958052580907070968620625704837092796014241193945225284501741471925557'));
	t.is(fnv1a.bigInt('hello', {bits: 256}), BigInt('24621739307028566391642840221992687346817534817626804975463790541119213691899'));
});

test('BigInt 512-bit', t => {
	t.is(fnv1a.bigInt('', {bits: 512}), BigInt('9659303129496669498009435400716310466090418745672637896108374329434462657994582932197716438449813051892206539805784495328239340083876191928701583869517785'));
	t.is(fnv1a.bigInt('hello', {bits: 512}), BigInt('7892563648106928388641744747901962995816211260805030760135011933811709338702442123338016979459597105834714497783048560046644182143206509375819400532849111'));
});

test('BigInt 1024-bit', t => {
	t.is(fnv1a.bigInt('', {bits: 1024}), BigInt('14197795064947621068722070641403218320880622795441933960878474914617582723252296732303717722150864096521202355549365628174669108571814760471015076148029755969804077320157692458563003215304957150157403644460363550505412711285966361610267868082893823963790439336411086884584107735010676915'));
	t.is(fnv1a.bigInt('hello', {bits: 1024}), BigInt('162599568807828018278740454090851618076261791243547429330845926617440124701815376483262958546407611470083720486420160817850263303428987405974668389046941240548898833919126704680456253506816487407186600714845619389901326326498663678676823405702541932736634507371229190999806123793839783784715844873833'));
});
