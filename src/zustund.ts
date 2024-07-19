import { useCallback, useSyncExternalStore } from "react";

type MutateCreator<T, U> = (
	set: (partial: T | Partial<T> | ((prev: T) => T | Partial<T>)) => void,
) => U;

type Listener<T> = (state: T, prev: T) => void;

type Store<T> = {
	get: () => T;
	subscribe: (listener: Listener<T>) => () => void;
};

function createStore<T, U>(
	initialState: T,
	mutateCreator: MutateCreator<T, U>,
) {
	type State = T & U;
	const listeners = new Set<Listener<State>>();

	const get = () => state;
	const subscribe = (listener: Listener<State>) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};

	const set = (prev: T | Partial<T> | ((prev: T) => T | Partial<T>)) => {
		const nextState = typeof prev === "function"
			? (prev as (s: State) => State)(state)
			: prev;
		if (!Object.is(state, nextState)) {
			const prevState = state;
			state = typeof nextState !== "object" || nextState === null
				? nextState
				: { ...state, ...nextState };
			for (const listener of listeners) {
				listener(state, prevState);
			}
		}
	};

	let state = { ...initialState, ...mutateCreator(set) };

	return {
		get,
		subscribe,
	};
}

function useStore<T, U>(store: Store<T>, selector: (state: T) => U): U {
	return useSyncExternalStore(
		store.subscribe,
		useCallback(() => selector(store.get()), [selector, store]),
	);
}

export function create<T, U>(
	state: T,
	mutateCreator: MutateCreator<T, U>,
) {
	const store = createStore(state, mutateCreator);
	return <V>(selector: (state: T & U) => V) => useStore(store, selector);
}
