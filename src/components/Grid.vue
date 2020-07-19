<style scoped>
table {
    border-collapse: collapse;
}

tr:first-child > td {
    border-top-width: 2px;
}

tr > td:first-child {
    border-left-width: 2px;
}

tr:nth-child(3n) > td {
    border-bottom-width: 2px !important;
}

tr > td:nth-child(3n) {
    border-right-width: 2px;
}
</style>

<template>
    <div class="py-4">
        <div class="buttons mb-4">
            <span class="button is-static" :class="{ 'has-text-success': isValid, 'has-text-danger': !isValid }">
                {{ isValid ? 'Valid' : 'Invalid' }}
            </span>

            <button class="button" @click="fillCandidates(grid)">Fill and Eliminate Candidates</button>
            <button v-if="!currentHint" class="button" @click="findNextHint">Next Hint</button>
            <button v-if="currentHint" class="button" @click="applyHint">Apply Hint and Next</button>
            <button class="button" @click="solve">Solve</button>
        </div>

        <table class="table is-bordered">
            <tbody>
            <tr v-for="(row, y) in grid.rows" :key="'row' + y">
                <Cell v-for="(cell, x) in row" :key="'cell' + x"
                      :cell="cell"
                      :active="selectedPosition[0] === x && selectedPosition[1] === y"
                      :highlighted="currentHint && currentHint.cells.has(cell.id)"
                      :affected="currentHint && currentHint.affectedCells.has(cell.id)"
                      @select="selectedPosition = [x, y]"/>
            </tr>
            </tbody>
        </table>

        <p v-if="currentHint">{{ currentHint.description }}</p>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import Cell from './Cell.vue'
import { checkGrid, fillCandidates, newGrid } from '../logic/sudokuLogic'
import { useKeyboard } from '../hooks/useKeyboard'
import { useHint } from '../hooks/useHint'
import { useQuery } from '../hooks/useQuery'

export default defineComponent({
    name: 'Grid',
    components: {
        Cell
    },
    setup() {
        const grid = reactive(newGrid())
        const selectedPosition = ref([0, 0])

        useKeyboard(grid, selectedPosition)
        useQuery(grid)

        return {
            grid,
            selectedPosition,
            isValid: computed(() => checkGrid(grid)),
            fillCandidates,
            ...useHint(grid),
        }
    }
})
</script>
