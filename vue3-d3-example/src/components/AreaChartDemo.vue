<template>
  <h1>Example Area Chart</h1>
  <area-chart :chart-data="data" :width="300" :height="300" />
</template>

<script lang="ts">
import { interval, now } from 'd3-timer';
import { randomInt } from 'd3-random';
import { defineComponent, onMounted, ref } from 'vue';
import AreaChart from './AreaChart.vue';

const REFRESH_RATE = 2000;

export default defineComponent({
  components: {
    AreaChart,
  },
  setup() {
    const data = ref<number[]>([]);

    onMounted(() => {
      interval(
        () => {
          data.value = Array.from({ length: 10 }, randomInt(0, 11));
        },
        REFRESH_RATE,
        now() - REFRESH_RATE
      );
    });

    return { data };
  },
});
</script>

<style scoped></style>
