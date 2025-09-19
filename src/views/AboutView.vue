<template>
    <div class="about">
        <h1>This is an about page</h1>
        <div ref="chartRef" style="width: 600px; height: 400px"></div>
        <el-button type="primary" style="margin-left: 16px"> open </el-button>
    </div>
</template>
<script setup lang="ts">
// import {onMounted, ref} from 'vue';
import echarts from '../plugins/echarts.ts';
const chartRef = ref<HTMLElement>();
onMounted(() => {
    const chart = echarts.init(chartRef.value!);
    chart.setOption({
        title: {text: 'ECharts 按需引入示例'},
        tooltip: {},
        xAxis: {
            data: ['A', 'B', 'C', 'D']
        },
        yAxis: {},
        series: [
            {
                type: 'bar',
                data: [5, 20, 36, 10]
            }
        ]
    });
});
</script>
<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
