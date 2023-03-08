import { readable, writable } from 'svelte/store';

export function deepEquals<T extends Record<string | number | symbol, any>>(a: T, b: T): boolean {
	const keys = new Set<keyof T>([...Object.keys(a), ...Object.keys(b)]);
	for (const key of keys) {
		const v = a[key];
		const w = b[key];
		if (typeof v !== typeof w) return false;
		if (typeof v === 'object') {
			if (!deepEquals(v, w)) return false;
		} else {
			if (v !== w) return false;
		}
	}
	return true;
}

export function omit<
	T extends Record<string | number | symbol, any>,
	K extends string | number | symbol
>(obj: T, ...remKeys: K[]): Omit<T, K> {
	const keys = new Set<keyof T>(Object.keys(obj));
	for (const r of remKeys) {
		keys.delete(r);
	}
	return Object.fromEntries([...keys].map((k) => [k, obj[k]])) as Omit<T, K>;
}

export const now = readable(Date.now(), (set) => {
	const interval = setInterval(() => set(Date.now()), 100);
	return () => clearInterval(interval);
});
