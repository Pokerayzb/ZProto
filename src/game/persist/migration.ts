import type { SaveBlob } from './type';
import type { GameState } from '@game/state/types';

export function migrate(blob: unknown): GameState | null {
    if (!blob || typeof blob !== 'object')
        return null;

    let { version: v = 0, state } = blob as SaveBlob;

    for (const [index, migration] of migrations.entries()) {
        if (v > index)
            continue;

        try {
            state = migration(state as object) as GameState;
            console.log(`Migration ${index} applied`);
        } catch (e: unknown) {
            console.error(`Migration ${index} failed:`, e);
            return null;
        }

        v = index;
    }

    return state;
}

const migrations = [
    function (_state: object) { return _state },

];

export const version = migrations.length;
