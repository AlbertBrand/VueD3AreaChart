<template>
  <div>
    Scale X: {{ scaleX(0) }}<br />
    Scale Y: {{ scaleY(0) }}
  </div>
</template>

<script>
import { scaleLinear } from "d3-scale";

const MARGIN = 25;

export default {
  name: "AreaChart",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  computed: {
    scaleX() {
      return scaleLinear()
        .domain([0, this.data.length - 1])
        .range([MARGIN, this.width - MARGIN]);
    },
    scaleY() {
      return scaleLinear()
        .domain([0, this.data.length ? Math.max.apply(this, this.data) : 0])
        .range([this.height - MARGIN, MARGIN]);
    }
  }
};
</script>

<style scoped></style>
