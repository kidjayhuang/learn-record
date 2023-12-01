<template>
  <div class="wrapper" ref="wrapper">
    <div class="background">
      <div class="point"></div>
    </div>
  </div>
</template>

<script>
// from https://juejin.cn/post/7205016004925538341?from=search-suggest
import cityList from "./city_data.js";

export default {
  data() {
    return {
      list: [], // 原始数据
      listShow: [], // 展示列表
      itemHeight: 100, // item的高度
      maxNum: 0, // 一个视口可容纳的最大列表数儿
      listHeightTotal: 0, // 列表总高度
      scollRange: [], // 滚动视图的区间范围
      distance: 0, //已经滚动的距离
      preloadPage: 1, // 预加载多少页
    };
  },
  mounted() {
    this.init();
    this.getData();
  },
  methods: {},
};
</script>

<style scoped lang="less">
.wrapper {
  position: relative;
  top: 0;
  left: 0;
  overflow-y: scroll;
  height: 800px;
  width: 100vw;
  background: #e1e1e1;
  .background {
    height: 10000px;
    .point {
      position: absolute;
      width: 100px;
      height: 100px;
      background: red;
      top: 20px;
    }
  }
}
</style>
