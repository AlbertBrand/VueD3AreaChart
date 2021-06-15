import { createCustomElement } from './createCustomElement';
import AreaChart from './components/AreaChart.vue';

const AreaChartElement = createCustomElement(AreaChart);
window.customElements.define('area-chart', AreaChartElement);
