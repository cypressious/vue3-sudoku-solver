import { GridModel, Hint } from '../model/SudokuModel'
import { ref, Ref } from 'vue'
import { findTupleElimination } from '../logic/strategies/tuples'

export function useHint(grid: GridModel): { currentHint: Ref<Hint | null>, findHint(): void } {
    let currentHint = ref<Hint | null>(null)

    return {
        currentHint,
        findHint() {
            currentHint.value = findTupleElimination(grid) ?? null
        }
    }
}