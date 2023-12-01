<template>
  <div id="container">
    <!-- <VirtualScroll /> -->
    <test />
  </div>
</template>

<script lang="js">
import VirtualScroll from './components/virtual-scroll.vue'
import test from './components/test.vue'
export default {
  components: {
    VirtualScroll,
    test
  }
}
</script>

<style scoped>
@import "./reset.less";
#container {
}
</style>
