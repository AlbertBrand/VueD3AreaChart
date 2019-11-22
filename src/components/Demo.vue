<template>
  <div class="area-chart">
    <h1>Example Area Chart</h1>
    <area-chart :data="data" :width="300" :height="300" />
    <div class="content">
      <div>
        <label>Record Count: </label>
        <input v-model.number="itemCount" />
      </div>
      <div>
        <label>Min Value: </label>
        <input v-model.number="min" />
      </div>
      <div>
        <label>Max Value: </label>
        <input v-model.number="max" />
      </div>
    </div>
  </div>
</template>

<script>
import AreaChart from "./AreaChart";
import generateData from "./randomData";

export default {
  name: "demo",
  data() {
    return {
      data: [],
      itemCount: 25,
      min: 10,
      max: 100
    };
  },
  mounted() {
    const setData = () => {
      this.data = generateData(this.itemCount, this.min, this.max);
    };
    setData();
    setInterval(setData, 2000);
  },
  components: {
    AreaChart
  }
};
</script>

<style>
h1,
.content {
  margin-left: 20px;
}

label {
  display: inline-block;
  width: 150px;
}
</style>
