<template>
  <svg :width="width" :height="height">
    <g>
      <path class="area" :d="areaPath" />
      <path class="line" :d="linePath" />
    </g>
    <g ref="axis"></g>
  </svg>
</template>

<script>
import { interpolate } from "d3-interpolate";
import { easeCubic } from "d3-ease";
import { scaleLinear } from "d3-scale";
import { area, line } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { select } from "d3-selection";

const MARGIN = 25;
const ANIMATION_MS = 1000;

export default {
  name: "area-chart",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 0
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
  data() {
    return {
      dataLength: undefined,
      interpolatedData: this.data.slice()
    };
  },
  methods: {
    animate(newData, oldData) {
      const startMs = Date.now();
      const interpolator = interpolate(oldData, newData);
      const vm = this;
      function interpolateFrame() {
        const frameMs = Date.now();
        const delta = frameMs - startMs;
        if (delta < ANIMATION_MS) {
          // queue next interpolation
          requestAnimationFrame(interpolateFrame);
          // update animation state
          vm.interpolatedData = interpolator(
            easeCubic(delta / ANIMATION_MS)
          ).slice();
        } else {
          // done
          vm.interpolatedData = newData;
        }
      }
      interpolateFrame();
    }
  },
  computed: {
    scaleX() {
      return scaleLinear()
        .domain([0, this.dataLength])
        .range([MARGIN, this.width - MARGIN]);
    },
    scaleY() {
      return scaleLinear()
        .domain([0, this.max])
        .range([this.height - MARGIN, MARGIN]);
    },
    scales() {
      return [this.scaleX, this.scaleY];
    },
    points() {
      return this.interpolatedData.map((d, i) => ({
        x: this.scaleX(i),
        y: this.scaleY(d)
      }));
    },
    areaPathFunc() {
      return area()
        .x(d => d.x)
        .y0(this.scaleY(0))
        .y1(d => d.y);
    },
    areaPath() {
      return this.areaPathFunc(this.points);
    },
    linePathFunc() {
      return line()
        .x(d => d.x)
        .y(d => d.y);
    },
    linePath() {
      return this.linePathFunc(this.points);
    }
  },
  watch: {
    data(newData, oldData) {
      this.dataLength = newData.length - 1;
      this.animate(newData, oldData);
    },
    scales: {
      handler() {
        select(this.$refs.axis)
          .selectAll("g")
          .remove();

        select(this.$refs.axis)
          .append("g")
          .attr("transform", `translate(0,${this.scaleY(0)})`)
          .call(axisBottom().scale(this.scaleX));

        select(this.$refs.axis)
          .append("g")
          .attr("transform", `translate(${this.scaleX(0)},0)`)
          .call(axisLeft().scale(this.scaleY));
      },
      immediate: true
    }
  }
};
</script>

<style>
.area {
  fill: #76bf8a;
}
.line {
  stroke: #4f7f5c;
  stroke-width: 1px;
  fill: none;
}
</style>
