import {test} from 'node:test';
import assert from 'node:assert/strict';
import fnv1a from './index.js';

test('default', () => {
	// Test 32-bit for various strings
	assert.equal(fnv1a(''), 2_166_136_261n);
	assert.equal(fnv1a('h'), 3_977_000_791n);
	assert.equal(fnv1a('he'), 1_547_363_254n);
	assert.equal(fnv1a('hel'), 179_613_742n);
	assert.equal(fnv1a('hell'), 477_198_310n);
	assert.equal(fnv1a('hello'), 1_335_831_723n);
	assert.equal(fnv1a('hello '), 3_801_292_497n);
	assert.equal(fnv1a('hello w'), 1_402_552_146n);
	assert.equal(fnv1a('hello wo'), 3_611_200_775n);
	assert.equal(fnv1a('hello wor'), 1_282_977_583n);
	assert.equal(fnv1a('hello worl'), 2_767_971_961n);
	assert.equal(fnv1a('hello world'), 3_582_672_807n);

	// Bigger test
	assert.equal(fnv1a('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.'), 2_964_896_417n);
});

test('unicode handling', () => {
	// Verify Unicode handling against values from https://www.tools4noobs.com/online_tools/hash/
	assert.equal(fnv1a('🦄🌈'), 0xAA_F5_FE_E7n);
	assert.equal(fnv1a('\u{0000}\u{0080}\u{0100}\u{0180}\u{0250}\u{02B0}\u{0300}\u{0370}\u{0400}\u{0500}\u{0530}\u{0590}\u{0600}\u{0700}\u{0780}\u{0900}\u{0980}\u{0A00}\u{0A80}\u{0B00}\u{0B80}\u{0C00}\u{0C80}\u{0D00}\u{0D80}\u{0E00}\u{0E80}\u{0F00}\u{1000}\u{10A0}\u{1100}\u{1200}\u{13A0}\u{1400}\u{1680}\u{16A0}\u{1700}\u{1720}\u{1740}\u{1760}\u{1780}\u{1800}\u{1900}\u{1950}\u{19E0}\u{1D00}\u{1E00}\u{1F00}\u{2000}\u{2070}\u{20A0}\u{20D0}\u{2100}\u{2150}\u{2190}\u{2200}\u{2300}\u{2400}\u{2440}\u{2460}\u{2500}\u{2580}\u{25A0}\u{2600}\u{2700}\u{27C0}\u{27F0}\u{2800}\u{2900}\u{2980}\u{2A00}\u{2B00}\u{2E80}\u{2F00}\u{2FF0}\u{3000}\u{3040}\u{30A0}\u{3100}\u{3130}\u{3190}\u{31A0}\u{31F0}\u{3200}\u{3300}\u{3400}\u{4DC0}\u{4E00}\u{A000}\u{A490}\u{AC00}\u{D800}\u{DC00}\u{E000}\u{F900}\u{FB00}\u{FB50}\u{FE00}\u{FE20}\u{FE30}\u{FE50}\u{FE70}\u{FF00}\u{FFF0}\u{10000}\u{10080}\u{10100}\u{10300}\u{10330}\u{10380}\u{10400}\u{10450}\u{10480}\u{10800}\u{1D000}\u{1D100}\u{1D300}\u{1D400}\u{20000}\u{2F800}\u{E0000}\u{E0100}'), 0x98_3F_DF_05n);
});

test('bigInt()', () => {
	// Sanity check larger hashes against values from
	// https://fnvhash.github.io/fnv-calculator-online/

	assert.equal(fnv1a('hello world', {size: 32}), 0xD5_8B_3F_A7n);
	assert.equal(fnv1a('hello world', {size: 64}), 0x77_9A_65_E7_02_3C_D2_E7n);
	assert.equal(fnv1a('hello world', {size: 128}), 0x6C_15_57_99_FD_C8_EE_C4_B9_15_23_80_8E_77_26_B7n);
	assert.equal(fnv1a('hello world', {size: 256}), 0xEC_C3_CF_2E_0E_DF_CC_D3_D8_7F_21_EC_08_83_AA_D4_DB_43_EE_AD_66_CE_09_EB_4A_97_E0_4E_1A_18_45_27n);
	assert.equal(fnv1a('hello world', {size: 512}), 0x2B_9C_19_EC_56_CC_F9_8D_A0_F2_27_CC_82_BF_AA_CB_D8_35_09_28_BD_2C_EA_CA_E7_BC_8A_A1_3E_74_7F_5C_43_CA_4E_2E_98_FC_25_E9_4E_4E_80_56_75_54_5E_E9_5A_3B_96_8C_0A_CF_AE_CB_90_AE_A2_FD_BC_D4_DE_0Fn);
	assert.equal(fnv1a('hello world', {size: 1024}), 0x3F_A9_D2_53_E5_2A_E8_01_05_B3_82_C8_0A_01_E2_7A_53_D7_BC_1D_20_1E_FB_47_B3_8F_4D_6E_46_54_89_82_9D_7D_27_21_27_D2_0E_10_76_12_9C_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_00_02_53_EB_20_F4_2A_72_28_AF_90_22_D9_F3_5E_CE_5B_B7_1E_40_FC_D8_71_7B_80_D1_64_AB_92_17_09_99_6E_5C_43_AA_E8_01_41_8E_87_8C_DD_F9_68_D4_61_6Fn);
});

test('bigInt() - 32-bit', () => {
	assert.equal(fnv1a('', {size: 32}), 2_166_136_261n);
	assert.equal(fnv1a('hello', {size: 32}), 1_335_831_723n);

	// A 32-bit hash whose top bit is set must still be returned unsigned.
	assert.equal(fnv1a('h', {size: 32}), 3_977_000_791n);
	assert.ok(fnv1a('h', {size: 32}) >= 2n ** 31n);
	assert.ok(fnv1a('🦄🌈', {size: 32}) >= 0n);
});

test('bigInt() - 64-bit', () => {
	assert.equal(fnv1a(''), 2_166_136_261n);
	assert.equal(fnv1a('', {size: 64}), 14_695_981_039_346_656_037n);
	assert.equal(fnv1a('hello'), 1_335_831_723n);
	assert.equal(fnv1a('hello', {size: 64}), 11_831_194_018_420_276_491n);
	assert.equal(fnv1a('🦄🌈'), 2_868_248_295n);
});

test('bigInt() - 128-bit', () => {
	assert.equal(fnv1a('', {size: 128}), 144_066_263_297_769_815_596_495_629_667_062_367_629n);
	assert.equal(fnv1a('hello', {size: 128}), 302_907_886_228_425_533_802_623_465_673_358_913_971n);
});

test('bigInt() - 256-bit', () => {
	assert.equal(fnv1a('', {size: 256}), 100_029_257_958_052_580_907_070_968_620_625_704_837_092_796_014_241_193_945_225_284_501_741_471_925_557n);
	assert.equal(fnv1a('hello', {size: 256}), 24_621_739_307_028_566_391_642_840_221_992_687_346_817_534_817_626_804_975_463_790_541_119_213_691_899n);
});

test('bigInt() - 512-bit', () => {
	assert.equal(fnv1a('', {size: 512}), 9_659_303_129_496_669_498_009_435_400_716_310_466_090_418_745_672_637_896_108_374_329_434_462_657_994_582_932_197_716_438_449_813_051_892_206_539_805_784_495_328_239_340_083_876_191_928_701_583_869_517_785n);
	assert.equal(fnv1a('hello', {size: 512}), 7_892_563_648_106_928_388_641_744_747_901_962_995_816_211_260_805_030_760_135_011_933_811_709_338_702_442_123_338_016_979_459_597_105_834_714_497_783_048_560_046_644_182_143_206_509_375_819_400_532_849_111n);
});

test('bigInt() - 1024-bit', () => {
	assert.equal(fnv1a('', {size: 1024}), 14_197_795_064_947_621_068_722_070_641_403_218_320_880_622_795_441_933_960_878_474_914_617_582_723_252_296_732_303_717_722_150_864_096_521_202_355_549_365_628_174_669_108_571_814_760_471_015_076_148_029_755_969_804_077_320_157_692_458_563_003_215_304_957_150_157_403_644_460_363_550_505_412_711_285_966_361_610_267_868_082_893_823_963_790_439_336_411_086_884_584_107_735_010_676_915n);
	assert.equal(fnv1a('hello', {size: 1024}), 162_599_568_807_828_018_278_740_454_090_851_618_076_261_791_243_547_429_330_845_926_617_440_124_701_815_376_483_262_958_546_407_611_470_083_720_486_420_160_817_850_263_303_428_987_405_974_668_389_046_941_240_548_898_833_919_126_704_680_456_253_506_816_487_407_186_600_714_845_619_389_901_326_326_498_663_678_676_823_405_702_541_932_736_634_507_371_229_190_999_806_123_793_839_783_784_715_844_873_833n);
});

test('reusing an Uint8Array for the string encoding', () => {
	const utf8Buffer = new Uint8Array(64);

	assert.equal(fnv1a('', {utf8Buffer}), 2_166_136_261n);
	assert.equal(fnv1a('hello world', {utf8Buffer}), 3_582_672_807n);
	assert.equal(fnv1a('hello', {size: 64, utf8Buffer}), 11_831_194_018_420_276_491n);
	assert.equal(fnv1a('🦄🌈', {utf8Buffer}), 2_868_248_295n);
	// Test that the string is read correctly even though it is too large to fit in utf8Buffer.
	assert.equal(fnv1a('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.', {utf8Buffer}), 2_964_896_417n);
});

test('hashing an Uint8Array', () => {
	const bytes = new TextEncoder().encode('hello');

	assert.equal(fnv1a(bytes, {size: 32}), 1_335_831_723n);
	assert.equal(fnv1a(bytes, {size: 64}), 11_831_194_018_420_276_491n);
	assert.equal(fnv1a(bytes, {size: 128}), 302_907_886_228_425_533_802_623_465_673_358_913_971n);
	assert.equal(fnv1a(bytes, {size: 256}), 24_621_739_307_028_566_391_642_840_221_992_687_346_817_534_817_626_804_975_463_790_541_119_213_691_899n);
	assert.equal(fnv1a(bytes, {size: 512}), 7_892_563_648_106_928_388_641_744_747_901_962_995_816_211_260_805_030_760_135_011_933_811_709_338_702_442_123_338_016_979_459_597_105_834_714_497_783_048_560_046_644_182_143_206_509_375_819_400_532_849_111n);
	assert.equal(fnv1a(bytes, {size: 1024}), 162_599_568_807_828_018_278_740_454_090_851_618_076_261_791_243_547_429_330_845_926_617_440_124_701_815_376_483_262_958_546_407_611_470_083_720_486_420_160_817_850_263_303_428_987_405_974_668_389_046_941_240_548_898_833_919_126_704_680_456_253_506_816_487_407_186_600_714_845_619_389_901_326_326_498_663_678_676_823_405_702_541_932_736_634_507_371_229_190_999_806_123_793_839_783_784_715_844_873_833n);
});

test('hashing an empty Uint8Array', () => {
	const bytes = new Uint8Array(0);

	assert.equal(fnv1a(bytes, {size: 32}), 2_166_136_261n);
	assert.equal(fnv1a(bytes, {size: 64}), 14_695_981_039_346_656_037n);
	assert.equal(fnv1a(bytes, {size: 128}), 144_066_263_297_769_815_596_495_629_667_062_367_629n);
	assert.equal(fnv1a(bytes, {size: 256}), 100_029_257_958_052_580_907_070_968_620_625_704_837_092_796_014_241_193_945_225_284_501_741_471_925_557n);
	assert.equal(fnv1a(bytes, {size: 512}), 9_659_303_129_496_669_498_009_435_400_716_310_466_090_418_745_672_637_896_108_374_329_434_462_657_994_582_932_197_716_438_449_813_051_892_206_539_805_784_495_328_239_340_083_876_191_928_701_583_869_517_785n);
	assert.equal(fnv1a(bytes, {size: 1024}), 14_197_795_064_947_621_068_722_070_641_403_218_320_880_622_795_441_933_960_878_474_914_617_582_723_252_296_732_303_717_722_150_864_096_521_202_355_549_365_628_174_669_108_571_814_760_471_015_076_148_029_755_969_804_077_320_157_692_458_563_003_215_304_957_150_157_403_644_460_363_550_505_412_711_285_966_361_610_267_868_082_893_823_963_790_439_336_411_086_884_584_107_735_010_676_915n);
});

test('hashing a Uint8Array matches hashing the equivalent string', () => {
	// A string is hashed through its UTF-8 bytes, so both input types must agree.
	assert.equal(fnv1a(new TextEncoder().encode('')), fnv1a(''));
	assert.equal(fnv1a(new TextEncoder().encode('hello world')), fnv1a('hello world'));
	assert.equal(fnv1a(new TextEncoder().encode('🦄🌈')), fnv1a('🦄🌈'));
	assert.equal(fnv1a(new TextEncoder().encode('Lorem ipsum dolor sit amet')), fnv1a('Lorem ipsum dolor sit amet'));
});

test('throws for an unsupported hash size', () => {
	assert.throws(() => fnv1a('hello', {size: 16}), {message: 'The `size` option must be one of 32, 64, 128, 256, 512, or 1024'});
	assert.throws(() => fnv1a('hello', {size: 0}), {message: 'The `size` option must be one of 32, 64, 128, 256, 512, or 1024'});
	assert.throws(() => fnv1a('hello', {size: 33}), {message: 'The `size` option must be one of 32, 64, 128, 256, 512, or 1024'});
});

test('utf8Buffer too small for one code point', () => {
	// `encodeInto` will not write a partial code point, so it reads nothing and the
	// loop never advanced. The readme says the buffer need not hold the whole string.
	// The size is checked up front, so the error does not depend on the string.
	const error = {name: 'RangeError', message: 'The `utf8Buffer` option must have a length of at least 4'};
	assert.throws(() => fnv1a('hello', {utf8Buffer: new Uint8Array(0)}), error);
	assert.throws(() => fnv1a('🦄', {utf8Buffer: new Uint8Array(1)}), error);
	assert.throws(() => fnv1a('hello', {utf8Buffer: new Uint8Array(2)}), error);
	assert.throws(() => fnv1a('', {utf8Buffer: new Uint8Array(3)}), error);

	// A buffer that can hold one code point is enough, even for a long string.
	const string = 'aé€🦄\u{D800}b hello world';
	assert.equal(fnv1a(string, {utf8Buffer: new Uint8Array(4)}), fnv1a(string));
	assert.equal(fnv1a(string, {utf8Buffer: new Uint8Array(5)}), fnv1a(string));
	assert.equal(fnv1a(string, {utf8Buffer: new Uint8Array(4), size: 64}), fnv1a(string, {size: 64}));
});
