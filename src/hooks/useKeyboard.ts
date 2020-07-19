import { GridModel } from '../model/SudokuModel'
import { onMounted, onUnmounted, Ref } from 'vue'
import { GRID_SIZE } from '../logic/sudokuLogic'

function modGrid(x: number) {
    return (x + GRID_SIZE) % GRID_SIZE
}

export function useKeyboard(grid: GridModel, selectedPosition: Ref<number[]>) {
    function onArrowPress({ code }: KeyboardEvent) {
        if (code == 'ArrowUp') {
            selectedPosition.value[1] = modGrid(selectedPosition.value[1] - 1)
        } else if (code == 'ArrowDown') {
            selectedPosition.value[1] = modGrid(selectedPosition.value[1] + 1)
        } else if (code == 'ArrowLeft') {
            selectedPosition.value[0] = modGrid(selectedPosition.value[0] - 1)
        } else if (code == 'ArrowRight') {
            selectedPosition.value[0] = modGrid(selectedPosition.value[0] + 1)
        }
    }

    function onNumberPress(e: KeyboardEvent) {
        const [x, y] = selectedPosition.value
        const cell = grid.rows[y][x]

        if (e.code === 'Delete' || e.code === 'Backspace') {
            e.preventDefault()
            cell.value = undefined
            cell.candidates.clear()
            return
        }

        const parsed = parseInt(e.key, 10)
        if (parsed > 0 && parsed <= 9) {
            e.preventDefault()

            if (e.getModifierState('Alt')) {
                if (cell.candidates.has(parsed)) {
                    cell.candidates.delete(parsed)
                } else {
                    cell.candidates.add(parsed)
                }
            } else {
                cell.value = cell.value === parsed ? undefined : parsed
            }
        }
    }

    onMounted(() => {
        document.addEventListener('keyup', onNumberPress, true)
        document.addEventListener('keydown', onArrowPress, true)
    })
    onUnmounted(() => {
        document.removeEventListener('keyup', onNumberPress)
        document.removeEventListener('keydown', onArrowPress)
    })
}