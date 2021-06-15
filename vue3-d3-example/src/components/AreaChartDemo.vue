<template>
  <h1>Example Area Chart</h1>
  <area-chart :chart-data="data" :width="300" :height="300" />
  <div class="content">
    <div>
      <label for="itemCount">Record Count: </label>
      <input id="itemCount" v-model.number="itemCount" type="number" min="2" />
    </div>
    <div>
      <label for="min">Min Value: </label>
      <input id="min" v-model.number="min" type="number" min="0" />
    </div>
    <div>
      <label for="max">Max Value: </label>
      <input id="max" v-model.number="max" type="number" min="0" />
    </div>
  </div>
</template>

<script lang="ts">
import { interval, now } from 'd3-timer';
import { randomInt } from 'd3-random';
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import AreaChart from './AreaChart.vue';

const REFRESH_RATE = 2000;

type State = {
  data: number[];
  itemCount: number;
  min: number;
  max: number;
};

export default defineComponent({
  components: {
    AreaChart,
  },
  setup() {
    const state = reactive<State>({
      data: [],
      itemCount: 25,
      min: 10,
      max: 100,
    });

    onMounted(() => {
      interval(
        () => {
          state.data = Array.from({ length: state.itemCount }, randomInt(state.min, state.max + 1));
        },
        REFRESH_RATE,
        now() - REFRESH_RATE
      );
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
label {
  display: inline-block;
  width: 150px;
}
</style>
