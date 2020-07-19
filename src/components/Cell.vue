<style scoped>
td.cell {
    border: black solid 1px;
    height: 64px;
    width: 64px;
    cursor: pointer;
    padding: 0;
    vertical-align: middle;
}

/*noinspection CssUnusedSymbol*/
td.cell.highlighted {
    background-color: #9cffce !important;
}
/*noinspection CssUnusedSymbol*/
td.cell.affected {
    background-color: #f76fff !important;
}

/*noinspection CssUnusedSymbol*/
td.cell.active {
    background-color: #eee5ae !important;
}

.value, .candidates {
    display: flex;
    justify-content: center;
}

.value {
    font-size: 30px;
}

.candidates {
    font-size: 14px;
    word-break: break-all;
    text-align: center;
}
</style>


<template>
    <td class="cell" :class="{ active, highlighted, affected }" @click="onClick">
        <div v-if="cell.value != null" class="value">
            {{ cell.value }}
        </div>
        <div v-else class="candidates" :class="{ 'has-text-success': cell.candidates.size === 1 }">
            {{ [...cell.candidates].sort().join('') }}
        </div>
    </td>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CellModel } from '@/model/SudokuModel'

export default defineComponent({
    name: 'Cell',
    props: {
        cell: {
            type: Object as PropType<CellModel>,
            required: true
        },
        active: Boolean,
        highlighted: Boolean,
        affected: Boolean,
    },
    setup(props, ctx) {
        return {
            onClick() {
                ctx.emit('select')
            }
        }
    }
})
</script>
