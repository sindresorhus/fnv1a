import test from 'ava';
import fnv1a from './index.js';

test('default', t => {
	// Test 32-bit for various strings
	t.is(fnv1a(''), 2_166_136_261n);
	t.is(fnv1a('h'), 3_977_000_791n);
	t.is(fnv1a('he'), 1_547_363_254n);
	t.is(fnv1a('hel'), 179_613_742n);
	t.is(fnv1a('hell'), 477_198_310n);
	t.is(fnv1a('hello'), 1_335_831_723n);
	t.is(fnv1a('hello '), 3_801_292_497n);
	t.is(fnv1a('hello w'), 1_402_552_146n);
	t.is(fnv1a('hello wo'), 3_611_200_775n);
	t.is(fnv1a('hello wor'), 1_282_977_583n);
	t.is(fnv1a('hello worl'), 2_767_971_961n);
	t.is(fnv1a('hello world'), 3_582_672_807n);

	// Bigger test
	t.is(fnv1a('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.'), 2_964_896_417n);
});

test('unicode handling', t => {
	// Verify Unicode handling against values from https://www.tools4noobs.com/online_tools/hash/
	t.is(fnv1a('🦄🌈'), 0xAA_F5_FE_E7n);
	t.is(fnv1a('\u{0000}\u{0080}\u{0100}\u{0180}\u{0250}\u{02B0}\u{0300}\u{0370}\u{0400}\u{0500}\u{0530}\u{0590}\u{0600}\u{0700}\u{0780}\u{0900}\u{0980}\u{0A00}\u{0A80}\u{0B00}\u{0B80}\u{0C00}\u{0C80}\u{0D00}\u{0D80}\u{0E00}\u{0E80}\u{0F00}\u{1000}\u{10A0}\u{1100}\u{1200}\u{13A0}\u{1400}\u{1680}\u{16A0}\u{1700}\u{1720}\u{1740}\u{1760}\u{1780}\u{1800}\u{1900}\u{1950}\u{19E0}\u{1D00}\u{1E00}\u{1F00}\u{2000}\u{2070}\u{20A0}\u{20D0}\u{2100}\u{2150}\u{2190}\u{2200}\u{2300}\u{2400}\u{2440}\u{2460}\u{2500}\u{2580}\u{25A0}\u{2600}\u{2700}\u{27C0}\u{27F0}\u{2800}\u{2900}\u{2980}\u{2A00}\u{2B00}\u{2E80}\u{2F00}\u{2FF0}\u{3000}\u{3040}\u{30A0}\u{3100}\u{3130}\u{3190}\u{31A0}\u{31F0}\u{3200}\u{3300}\u{3400}\u{4DC0}\u{4E00}\u{A000}\u{A490}\u{AC00}\u{D800}\u{DC00}\u{E000}\u{F900}\u{FB00}\u{FB50}\u{FE00}\u{FE20}\u{FE30}\u{FE50}\u{FE70}\u{FF00}\u{FFF0}\u{10000}\u{10080}\u{10100}\u{10300}\u{10330}\u{10380}\u{10400}\u{10450}\u{10480}\u{10800}\u{1D000}\u{1D100}\u{1D300}\u{1D400}\u{20000}\u{2F800}\u{E0000}\u{E0100}'), 0x98_3F_DF_05n);
});

test('bigInt()', t => {
	// Sanity check larger hashes against values from
	// https://fnvhash.github.io/fnv-calculator-online/

	t.is(fnv1a('hello world', {size: 32}), BigInt('0xd58b3fa7'));
	t.is(fnv1a('hello world', {size: 64}), BigInt('0x779a65e7023cd2e7'));
	t.is(fnv1a('hello world', {size: 128}), BigInt('0x6c155799fdc8eec4b91523808e7726b7'));
	t.is(fnv1a('hello world', {size: 256}), BigInt('0xecc3cf2e0edfccd3d87f21ec0883aad4db43eead66ce09eb4a97e04e1a184527'));
	t.is(fnv1a('hello world', {size: 512}), BigInt('0x2b9c19ec56ccf98da0f227cc82bfaacbd8350928bd2ceacae7bc8aa13e747f5c43ca4e2e98fc25e94e4e805675545ee95a3b968c0acfaecb90aea2fdbcd4de0f'));
	t.is(fnv1a('hello world', {size: 1024}), BigInt('0x3fa9d253e52ae80105b382c80a01e27a53d7bc1d201efb47b38f4d6e465489829d7d272127d20e1076129c00000000000000000000000000000000000000000000000000000000000000000000000000000253eb20f42a7228af9022d9f35ece5bb71e40fcd8717b80d164ab921709996e5c43aae801418e878cddf968d4616f'));
});

test('bigInt() - 32-bit', t => {
	t.is(fnv1a('', {size: 32}), 2_166_136_261n);
	t.is(fnv1a('hello', {size: 32}), 1_335_831_723n);
});

test('bigInt() - 64-bit', t => {
	t.is(fnv1a(''), 2_166_136_261n);
	t.is(fnv1a('', {size: 64}), 14_695_981_039_346_656_037n);
	t.is(fnv1a('hello'), 1_335_831_723n);
	t.is(fnv1a('hello', {size: 64}), 11_831_194_018_420_276_491n);
	t.is(fnv1a('🦄🌈'), 2_868_248_295n);
});

test('bigInt() - 128-bit', t => {
	t.is(fnv1a('', {size: 128}), 144_066_263_297_769_815_596_495_629_667_062_367_629n);
	t.is(fnv1a('hello', {size: 128}), 302_907_886_228_425_533_802_623_465_673_358_913_971n);
});

test('bigInt() - 256-bit', t => {
	t.is(fnv1a('', {size: 256}), 100_029_257_958_052_580_907_070_968_620_625_704_837_092_796_014_241_193_945_225_284_501_741_471_925_557n);
	t.is(fnv1a('hello', {size: 256}), 24_621_739_307_028_566_391_642_840_221_992_687_346_817_534_817_626_804_975_463_790_541_119_213_691_899n);
});

test('bigInt() - 512-bit', t => {
	t.is(fnv1a('', {size: 512}), 9_659_303_129_496_669_498_009_435_400_716_310_466_090_418_745_672_637_896_108_374_329_434_462_657_994_582_932_197_716_438_449_813_051_892_206_539_805_784_495_328_239_340_083_876_191_928_701_583_869_517_785n);
	t.is(fnv1a('hello', {size: 512}), 7_892_563_648_106_928_388_641_744_747_901_962_995_816_211_260_805_030_760_135_011_933_811_709_338_702_442_123_338_016_979_459_597_105_834_714_497_783_048_560_046_644_182_143_206_509_375_819_400_532_849_111n);
});

test('bigInt() - 1024-bit', t => {
	t.is(fnv1a('', {size: 1024}), 14_197_795_064_947_621_068_722_070_641_403_218_320_880_622_795_441_933_960_878_474_914_617_582_723_252_296_732_303_717_722_150_864_096_521_202_355_549_365_628_174_669_108_571_814_760_471_015_076_148_029_755_969_804_077_320_157_692_458_563_003_215_304_957_150_157_403_644_460_363_550_505_412_711_285_966_361_610_267_868_082_893_823_963_790_439_336_411_086_884_584_107_735_010_676_915n);
	t.is(fnv1a('hello', {size: 1024}), 162_599_568_807_828_018_278_740_454_090_851_618_076_261_791_243_547_429_330_845_926_617_440_124_701_815_376_483_262_958_546_407_611_470_083_720_486_420_160_817_850_263_303_428_987_405_974_668_389_046_941_240_548_898_833_919_126_704_680_456_253_506_816_487_407_186_600_714_845_619_389_901_326_326_498_663_678_676_823_405_702_541_932_736_634_507_371_229_190_999_806_123_793_839_783_784_715_844_873_833n);
});
