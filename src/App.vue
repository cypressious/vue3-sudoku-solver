<template>
    <div class="container">
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
