import test from 'ava';
import fnv1a from '.';

test('main', t => {
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

	t.is(fnv1a('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.'), 2964896417);
});
