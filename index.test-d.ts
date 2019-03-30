import {expectType} from 'tsd';
import fnv1a = require('.');

expectType<number>(fnv1a('🦄🌈'));
