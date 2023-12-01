<template>
  <div class="wrapper" ref="wrapper" @scroll="onScroll">
    <div class="background" :style="{ height: `${listHeightTotal}px` }">
      <div class="list" ref="listContainer">
        <div
          class="item"
          :data-index="item.index"
          v-for="(item, index) in listShow"
          :key="index"
        >
          <div class="item-l">
            <div>{{ item.name }}</div>
            <div>{{ item.pinyin }}</div>
          </div>
          <div class="item-r">
            {{ item.code }}
          </div>
        </div>
      </div>
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
  methods: {
    //主要用于计算视口高度和视口可容纳的item数量
    init() {
      // 1、获取视口高度
      const containerHeight = parseInt(
        getComputedStyle(this.$refs.wrapper).height
      );
      // 2、获取一个视口能显示的最大数量
      this.maxNum = Math.ceil(containerHeight / this.itemHeight);
    },

    //用于处理原始数据，并且计算出来总高度，这样的话滚动条不会抖。
    getData() {
      // 1、循环遍历全部数据，获取列表总高度
      let heightTotal = 0;
      let list = cityList.map((item, index) => {
        let obj = {
          index, // 这个存下来,选择遍历时需要使用
          ...item,
          top: heightTotal,
        };
        heightTotal += this.itemHeight;
        return obj;
      });
      // 2、全部数据
      this.list = list;
      // 3、列表总高度
      this.listHeightTotal = heightTotal;
    },

    //获取展示列表的数据
    getDataShow(distance = null) {
      // 1、获取滚动的总距离
      const scrollTop = distance
        ? distance
        : this.$refs.listContainer.scrollTop;
      // 2、如果还在区间内，则不计算
      if (this.scollRange) {
        if (scrollTop > this.scollRange[0] && scrollTop < this.scollRange[1]) {
          return;
        }
      }
      // 3、获取起始索引 getStartIndex()
      let startIndex = this.getStartIndex(scrollTop);

      //   4、获取上个屏幕的元素起始索引
      let lastStartIndex = startIndex - this.maxNum * this.preloadPage;
      lastStartIndex = lastStartIndex >= 0 ? lastStartIndex : 0;

      // 5、获取上、当前、下列表
      let lastList = this.list.slice(lastStartIndex, startIndex);
      let currList = this.list.slice(startIndex, startIndex + this.maxNum);
      let nextList = this.list.slice(
        startIndex,
        startIndex + this.maxNum * this.preloadPage
      );

      //   6、调整滚动距离
      this.$refs.listContainer.style.transform = `translateY(${this.list[lastStartIndex].top}px)`;

      // 7、设置滚动加载阈值
      this.scollRange = [
        this.list[Math.floor(lastStartIndex + this.maxNum / 2)]?.top,
        this.list[Math.ceil(startIndex + this.maxNum / 2)]?.top,
      ];

      this.listShow = [...lastList, ...currList, ...nextList];
    },

    // 获取起始的index下标
    getStartIndex(scrollTop) {
      // 1、先定义start为0，end为列表长度
      let start = 0,
        end = this.list.length - 1;
      // 2、遍历
      while (start < end) {
        // 3、取中间值
        let median = Math.floor((start + end) / 2);
        let top = this.list[median].top;
        // 4、如果滚动高度大于等于列表距离顶部高度，就把起始位设为这个中间值
        if (scrollTop >= top && scrollTop < top + this.itemHeight) {
          start = median;
          break;
        } else if (scrollTop >= top + this.itemHeight) {
          start = median + 1;
        } else if (scrollTop < top) {
          end = median - 1;
        }
      }
      return start;
    },

    // 视图滚动函数
    onScroll(e) {
      // 1、需要先写节流
      if (this.underway) {
        return;
      }
      this.underway = true;
      // 2、用requestAnimationFrame让页面重绘后执行
      requestAnimationFrame(() => {
        this.underway = false;
      });
      // 3、获取距离顶部高度
      let distance = e.target.scrollTop;
      this.distance = distance;
      // 4、获取显示data
      this.getDataShow(distance);
    },
  },
};
</script>

<style scoped lang="less">
.wrapper {
  position: relative;
  top: 0;
  left: 0;
  overflow-y: scroll;
  height: 800px;
  width: 400px;
  border: 1px solid #aeaeae;
  .list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .item {
      box-sizing: border-box;
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid orange;
      .item-l {
        display: flex;
      }
    }
  }
}
</style>
