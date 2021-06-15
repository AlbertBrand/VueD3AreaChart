<template>
  <svg :width="width" :height="height">
    <g>
      <path class="area" :d="areaPath" />
      <path class="line" :d="linePath" />
    </g>
  </svg>
</template>

<script lang="ts">
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { area, line } from 'd3-shape';
import { computed, defineComponent, PropType } from 'vue';

const MARGIN = 25;

export default defineComponent({
  props: {
    chartData: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const scaleX = computed(() => {
      return scaleLinear()
        .domain([0, props.chartData.length - 1])
        .range([MARGIN, props.width - MARGIN]);
    });

    const scaleY = computed(() => {
      return scaleLinear()
        .domain([0, max(props.chartData) ?? 0])
        .range([props.height - MARGIN, MARGIN]);
    });

    const areaPathGenerator = computed(() => {
      return area<number>()
        .x((d, i) => scaleX.value(i))
        .y0(scaleY.value(0))
        .y1((d) => scaleY.value(d));
    });

    const linePathGenerator = computed(() => {
      return line<number>()
        .x((d, i) => scaleX.value(i))
        .y((d) => scaleY.value(d));
    });

    const areaPath = computed(() => areaPathGenerator.value(props.chartData) ?? '');
    const linePath = computed(() => linePathGenerator.value(props.chartData) ?? '');

    return {
      areaPath,
      linePath,
      scaleX,
      scaleY,
    };
  },
});
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
