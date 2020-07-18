<template>
    <div class="container">
        <h2 class="is-size-4">Variants</h2>

        <div clasS="mb-4">
            <a href="/?digits=__5___6__+_4_6___2_+3___7___5+_2___6___+__1___3__+___4___6_+5___3___1+_9___2_4_+__8___5__">Diagonals</a>
        </div>

        <h2 class="is-size-4">Grid</h2>

        <div>
            <Grid/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Grid from "./components/Grid.vue";

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
