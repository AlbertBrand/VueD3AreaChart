<template>
  <div>
    <h1>Example Area Chart</h1>
    <area-chart :chart-data="data" :width="300" :height="300" />
    <div class="content">
      <div>
        <label for="itemCount">Record Count: </label>
        <input id="itemCount" v-model.number="itemCount" />
      </div>
      <div>
        <label for="min">Min Value: </label>
        <input id="min" v-model.number="min" />
      </div>
      <div>
        <label for="max">Max Value: </label>
        <input id="max" v-model.number="max" />
      </div>
    </div>
  </div>
</template>

<script>
import { interval, now } from "d3-timer";
import AreaChart from "./AreaChart";

const REFRESH_RATE = 2000;

function generateData(size, min, max) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

export default {
  name: "Demo",
  data() {
    return {
      data: [],
      itemCount: 25,
      min: 10,
      max: 100
    };
  },
  components: {
    AreaChart
  },
  mounted() {
    interval(
      () => {
        this.data = generateData(this.itemCount, this.min, this.max);
      },
      REFRESH_RATE,
      now() - REFRESH_RATE
    );
  }
};
</script>

<style scoped>
label {
  display: inline-block;
  width: 150px;
}
</style>
