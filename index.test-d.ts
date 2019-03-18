import {expectType} from 'tsd-check';
import fnv1a from '.';

expectType<number>(fnv1a('🦄🌈'));
