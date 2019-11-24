<template>
  <svg :width="width" :height="height">
    <g>
      <path class="area" :d="areaPath" />
      <path class="line" :d="linePath" />
    </g>
    <g class="axis"></g>
  </svg>
</template>

<script>
import * as d3 from "d3";

const MARGIN = 20;

export default {
  name: "area-chart",
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
      return d3
        .scaleLinear()
        .domain([0, this.data.length - 1])
        .range([MARGIN, this.width - MARGIN]);
    },
    scaleY() {
      return d3
        .scaleLinear()
        .domain([0, d3.max(this.data)])
        .range([this.height - MARGIN, MARGIN]);
    },
    points() {
      return this.data.map((d, i) => ({
        x: this.scaleX(i),
        y: this.scaleY(d)
      }));
    },
    areaPathFunc() {
      return d3
        .area()
        .x(d => d.x)
        .y0(this.scaleY(0))
        .y1(d => d.y);
    },
    areaPath() {
      return this.areaPathFunc(this.points);
    },
    linePathFunc() {
      return d3
        .line()
        .x(d => d.x)
        .y(d => d.y);
    },
    linePath() {
      return this.linePathFunc(this.points);
    }
  },
  watch: {
    scaleX: {
      handler() {
        const axis = d3.axisBottom().scale(this.scaleX);
        d3.select(".axisBottom").remove();
        d3.select(".axis")
          .append("g")
          .attr("class", "axisBottom")
          .attr("transform", `translate(0,${this.scaleY(0)})`)
          .call(axis);
      },
      immediate: true
    },
    scaleY: {
      handler() {
        const axis = d3.axisLeft().scale(this.scaleY);
        d3.select(".axisLeft").remove();
        d3.select(".axis")
          .append("g")
          .attr("class", "axisLeft")
          .attr("transform", `translate(${this.scaleX(0)},0)`)
          .call(axis);
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
