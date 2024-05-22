<template>
  <div>
    <van-button type="success" @click="jumpToFoo"> 跳转foo </van-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const jumpToFoo = () => {
  router.push("/foo");
};
</script>

<style scoped></style>
