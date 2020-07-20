<template>
    <div class="container">
        <div>
            <Grid/>
        </div>

        <p>
            Use the mouse or arrow keys to move the selection. Use the number keys to enter a solution or Alt + number key to enter a candidate.
        </p>

        <p>
            Enter any Sudoku yourself or load one below:
        </p>

        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <a
                        href="/?digits=__5___6__+_4_6___2_+3___7___5+_2___6___+__1___3__+___4___6_+5___3___1+_9___2_4_+__8___5__">
                        Diagonals
                    </a>
                </div>
                <div class="level-item">
                    <a
                        href="/?digits=_6__5___3+____12_56+4_5_7621_+327584_6_+_4_267__5+856_3___2+_9__2_6__+__8_4____+_1__9_5__">5
                        Stars
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Grid from './components/Grid.vue'

export default defineComponent({
    name: 'App',
    components: {
        Grid
    },
    setup() {
        return {}
    }
})
</script>
