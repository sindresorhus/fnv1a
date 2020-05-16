import {expectType} from 'tsd';
import fnv1a = require('.');

expectType<number>(fnv1a('🦄🌈'));
expectType<bigint>(fnv1a.bigInt('🦄🌈', {size: 128}));
