<template>
  <div class="radar-echart" ref="myDiv"></div>
</template>

<script>
import * as Echarts from "echarts";
import radarData from "./radarData";
export default {
  name: "RadarEchart",
  mounted() {
    this.echarts = Echarts.init(this.$refs.myDiv);
    this.echarts.setOption(radarData);
  },
  methods: {
    initData() {
      setTimeout(() => {
        this.resData = [{}];
      });
    },
  },
};
</script>

<style lang="scss">
.radar-echart {
  width: 600px;
  height: 400px;
}
</style>
