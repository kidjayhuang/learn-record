<template>
  <div class="async-component">
    I'm AsyncComponentI'm AsyncComponentI'm AsyncComponentI'm AsyncComponent
   
    
  </div>
</template>

<script setup lang="ts">
const sleep = (time: number) => {
  return new Promise((reslove, _reject) => {
    setTimeout(() => {
      reslove(1);
    }, time);
  });
};

 sleep(3000)
</script>

<style scoped>
.async-component {
  height: 200px;
}
</style>
