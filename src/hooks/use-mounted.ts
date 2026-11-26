import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/** false during SSR and hydration, true afterwards: for UI that depends on client-only state (e.g. the theme). */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
