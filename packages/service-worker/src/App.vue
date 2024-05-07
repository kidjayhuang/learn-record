<template>
  <div id="container">
    <van-row>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
      {{ innerList }}
    </van-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, createVNode } from "vue";
import { useTest } from "./test";
const { list } = useTest();

console.log(111, list.value);
const innerList = computed(() => {
  const arr = [];
  list.value.forEach((e) => {
    arr.push(e);
  });
  return arr;
});
</script>

<style scoped>
@import "./reset.less";
#container {
}
</style>
