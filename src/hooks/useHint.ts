import { GridModel, Hint } from '../model/SudokuModel'
import { ref } from 'vue'
import { findHint } from '../logic/strategies'
import { eliminateCandidates, fillCandidates } from '../logic/sudokuLogic'

export function useHint(grid: GridModel) {
    let currentHint = ref<Hint | null>(null)

    function findNextHint() {
        currentHint.value = findHint(grid)
    }

    function applyHint() {
        currentHint.value?.apply()
        eliminateCandidates(grid)
        findNextHint()
    }

    return {
        currentHint,
        findNextHint,
        applyHint,
        solve() {
            fillCandidates(grid)
            eliminateCandidates(grid)

            do {
                applyHint()
            } while (currentHint.value != null)
        }
    }
}