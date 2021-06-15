<template>
  <h1>Example Area Chart</h1>
  <area-chart :chart-data="data" :width="300" :height="300" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AreaChart from './AreaChart.vue';

export default defineComponent({
  components: {
    AreaChart,
  },
  setup() {
    const data = ref<number[]>([1, 5, 3, 10, 8]);

    return { data };
  },
});
</script>

<style scoped></style>
