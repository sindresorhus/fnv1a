import {expectType} from 'tsd';
import fnv1a from './index.js';

expectType<bigint>(fnv1a('🦄🌈'));
expectType<bigint>(fnv1a('🦄🌈', {size: 128}));
