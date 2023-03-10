import { describe, it, expect } from 'vitest';
import { FourVector } from './quantum';
import { test100 } from './test'

test100();

describe('four-vector', () => {
	it('can be instantiated', () => {
		const v = new FourVector(1, 0, 2, 3);
	});

	it('does inner product', () => {
		const a = new FourVector(1, 0, 2, 3);
		const b = new FourVector(2, 3, -0.5, 0);
		expect(a.dot(b)).equals(1);
	});
});
