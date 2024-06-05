<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { useRemoteModules, RemoteModuleTypeEnum } from '@/composables';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

const { component } = useRemoteModules({
  type: RemoteModuleTypeEnum.component
})
debugger
export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld: component,
  },
});
</script>
