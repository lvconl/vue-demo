<template>
  <div ref="chart" class="chart-wrapper"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'chart',
  data () {
    return {

    }
  },
  mounted: function () {
    let myChart = echarts.init(this.$refs.chart)
    myChart.setOption({
      title: {
        text: 'chart'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    })
  },
  methods: {

  }
}
</script>
<style scoped>
  .chart-wrapper{
    width: 25rem;
    height: 25rem;
  }
</style>
