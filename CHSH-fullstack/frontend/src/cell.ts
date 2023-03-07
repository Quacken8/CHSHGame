import type { Subscriber, Unsubscriber, Updater, Writable } from 'svelte/store';

export interface Cell<T> extends Writable<T> {
	get value(): T;
	set value(v: T);
}

export function cell<T>(value: T): Cell<T> {
	const subscribers = new Set<Subscriber<T>>();
	const subscribe = (f: Subscriber<T>): Unsubscriber => {
		subscribers.add(f);
    f(value);
		return () => subscribers.delete(f);
	};
	const set = (v: T) => {
		value = v;
		for (const f of subscribers) {
			f(value);
		}
	};
	const update = (f: Updater<T>) => {
		set(f(value));
	};

	return {
		subscribe,
		set,
		update,
		get value() {
			return value;
		},
		set value(v: T) {
			set(v);
		}
	};
}
