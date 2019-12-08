<template>
  <div>
    <h1>Example Area Chart</h1>
    <area-chart :data="data" :width="300" :height="300" />
  </div>
</template>

<script>
import AreaChart from "./AreaChart";

export default {
  name: "Demo",
  data() {
    return {
      data: [1, 5, 3, 10, 8]
    };
  },
  components: {
    AreaChart
  }
};
</script>

<style scoped></style>
