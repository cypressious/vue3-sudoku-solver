import { GridModel, Hint } from '../model/SudokuModel'
import { ref, Ref } from 'vue'
import { findHint } from '../logic/strategies'
import { eliminateCandidates } from '../logic/sudokuLogic'

export function useHint(grid: GridModel): { currentHint: Ref<Hint | null>, findNextHint(): void, applyHint(): void } {
    let currentHint = ref<Hint | null>(null)

    function findNextHint() {
        currentHint.value = findHint(grid)
    }

    return {
        currentHint,
        findNextHint,
        applyHint() {
            currentHint.value?.apply()
            eliminateCandidates(grid)
            findNextHint()
        }
    }
}