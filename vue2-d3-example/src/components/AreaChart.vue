<template>
  <svg :width="width" :height="height">
    <g>
      <path class="area" :d="areaPath(this.data)" />
      <path class="line" :d="linePath(this.data)" />
    </g>
    <g>
      <g ref="axisLeft" :transform="'translate(' + scaleX(0) + ', 0)'"></g>
      <g ref="axisBottom" :transform="'translate(0, ' + scaleY(0) + ')'"></g>
    </g>
  </svg>
</template>

<script>
import { axisBottom, axisLeft } from "d3-axis";
import { easeCubic } from "d3-ease";
import { interpolate } from "d3-interpolate";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { area, line } from "d3-shape";
import { timer } from "d3-timer";

const MARGIN = 25;
const ANIMATION_MS = 1000;

export default {
  name: "AreaChart",
  props: {
    chartData: {
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
  },
  data() {
    return {
      data: this.chartData.slice()
    };
  },
  watch: {
    chartData(newData, oldData) {
      const interpolator = interpolate(oldData, newData);
      const t = timer(elapsed => {
        this.data = interpolator(easeCubic(elapsed / ANIMATION_MS)).slice();

        if (elapsed > ANIMATION_MS) {
          t.stop();
        }
      });
    },
    scaleX() {
      select(this.$refs.axisBottom).call(axisBottom().scale(this.scaleX));
    },
    scaleY() {
      select(this.$refs.axisLeft).call(axisLeft().scale(this.scaleY));
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
