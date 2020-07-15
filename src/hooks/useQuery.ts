import { watch, onMounted } from 'vue'
import { GridModel } from '../model/SudokuModel'

export function useQuery(grid: GridModel) {
    watch(grid, () => {
        const url = new URL(location.toString())
        const params = new URLSearchParams(url.search)
        params.set('digits', grid.rows.map(x => x.map(cell => cell.value?.toString() ?? '_').join('')).join(' '))
        url.search = params.toString()

        history.replaceState({}, '', url.toString())
    })

    onMounted(() => {
        const digits = new URLSearchParams(location.search).get('digits')

        if (digits) {
            digits.split(' ').forEach((rowString, y) => {
                rowString.split('').forEach((digit, x) => {
                    grid.rows[y][x].value = digit !== '_' ? parseInt(digit) : undefined
                })
            })
        }
    })
}