<template>
  <div id="container">
    <div>
      <h1>异步组件示例</h1>
      <van-button @click="toggle">toggle</van-button>
      <br />
      <Suspense v-if="showAsyncComponent">
        <AsyncComponent />
        <template #fallback>
          <LoadingComponent />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted, onErrorCaptured } from "vue";
import ErrorComponent from "@/components/error-component.vue";
import LoadingComponent from "@/components/loading-component.vue";
import { loadAsyncComponent } from "@/utils";


// export const loadAsyncComponent = async (componentName: string) => {
//   if (import.meta.env.VITE_ENV === "local") {
//     return import(`@/async-components/${componentName}.vue`);
//   }

//   const remoteUrl = `http://127.0.0.1:3001/${componentName}.js`;
//   const response = await fetch(remoteUrl);
//   const scriptText = await response.text();
//   let Component: any = "";
//   try {
//     const scriptStr = scriptText.replace("export default", "");
//     Component = new Function("return " + scriptStr)();
//     console.log(Component);
//   } catch (e) {
//     console.error(e);
//   }
//   return Component;
// };

const AsyncComponent = defineAsyncComponent(() => {
  return loadAsyncComponent("../async-components/index.vue");
});

onErrorCaptured((err, instance, source) => {});
onMounted(() => {});

const showAsyncComponent = ref(false);
const toggle = () => {
  showAsyncComponent.value = !showAsyncComponent.value;
};
</script>

<style scoped></style>
