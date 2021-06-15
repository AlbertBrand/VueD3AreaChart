<template>
  <div>
    Scale X: {{ scaleX(0) }}<br />
    Scale Y: {{ scaleY(0) }}
  </div>
</template>

<script lang="ts">
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
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

    return {
      scaleX,
      scaleY,
    };
  },
});
</script>

<style scoped></style>
