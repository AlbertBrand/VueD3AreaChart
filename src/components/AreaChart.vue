<template>
  <svg :width="width" :height="height">
    <g>
      <path class="area" :d="areaPath(this.data)" />
      <path class="line" :d="linePath(this.data)" />
    </g>
  </svg>
</template>

<script>
import { scaleLinear } from "d3-scale";
import { area, line } from "d3-shape";

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
    },
    areaPath() {
      return area()
        .x((d, i) => this.scaleX(i))
        .y0(this.scaleY(0))
        .y1(d => this.scaleY(d));
    },
    linePath() {
      return line()
        .x((d, i) => this.scaleX(i))
        .y(d => this.scaleY(d));
    }
  }
};
</script>

<style scoped>
.area {
  fill: #9d92b2;
}
.line {
  stroke: #6c1d5f;
  stroke-width: 3px;
  fill: none;
}
</style>
