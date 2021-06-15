<template>
  <svg :width="width" :height="height">
    <g>
      <path class="area" :d="areaPath" />
      <path class="line" :d="linePath" />
    </g>
    <g>
      <g ref="axisLeftRef" :transform="axisLeftTransform" />
      <g ref="axisBottomRef" :transform="axisBottomTransform" />
    </g>
  </svg>
</template>

<script lang="ts">
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { area, line } from 'd3-shape';
import { computed, defineComponent, onMounted, PropType, Ref, ref, watchEffect } from 'vue';

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

    const axisBottomRef: Ref<SVGGElement | undefined> = ref();
    const axisLeftRef: Ref<SVGGElement | undefined> = ref();

    onMounted(() => {
      watchEffect(() => {
        if (!axisBottomRef.value) return;
        select(axisBottomRef.value).call(axisBottom(scaleX.value));
      });
      watchEffect(() => {
        if (!axisLeftRef.value) return;
        select(axisLeftRef.value).call(axisLeft(scaleY.value));
      });
    });

    const axisBottomTransform = computed(() => `translate(0, ${scaleY.value(0)})`);
    const axisLeftTransform = computed(() => `translate(${scaleX.value(0)}, 0)`);

    return {
      areaPath,
      linePath,
      scaleX,
      scaleY,
      axisBottomRef,
      axisLeftRef,
      axisBottomTransform,
      axisLeftTransform,
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
