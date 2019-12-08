<template>
  <div>
    <h1>Example Area Chart</h1>
    <area-chart :data="data" :width="300" :height="300" />
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
      data: []
    };
  },
  components: {
    AreaChart
  },
  mounted() {
    interval(
      () => {
        this.data = generateData(5, 0, 10);
      },
      REFRESH_RATE,
      now() - REFRESH_RATE
    );
  }
};
</script>

<style scoped></style>
