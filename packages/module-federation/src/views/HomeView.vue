<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <template v-for="name in arr">
      <component :is="name"></component>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from "vue";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

// const HelloWorld = defineAsyncComponent(() => import("hello_exposes/HelloWorld.vue"));

function loadFile(url: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    script.async = true;
    // script.defer = true
    script.onload = resolve;
    script.onerror = reject;
    (document.body || document.head).appendChild(script);
  });
}

function loadComponent(scope: any, module: any) {
  return async () => {
    // 初始化共享作用域（shared scope）用提供的已知此构建和所有远程的模块填充它
    await __webpack_init_sharing__("default");
    const container = window[scope]; // 或从其他地方获取容器
    // 初始化容器 它可能提供共享模块
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);
    // @ts-ignore
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

const components = {
  HelloWorld: defineAsyncComponent(
    () =>
      new Promise(async (resolve) => {
        await loadFile("http://10.74.44.5:8082/hello.js");

        const remote = await loadComponent("hello_exposes", "./HelloWorld")();

        resolve(remote);
      })
  ),
};

export default defineComponent({
  name: "HomeView",
  components,
  setup() {
    const arr = ["HelloWorld"];
    return {
      arr,
    };
  },
});
</script>
