import { defineAsyncComponent, ref, ComponentPublicInstance } from "vue";
import { fetchRemoteModules, type RemoteModules } from "@/apis";
import { RemoteModuleTypeEnum, type RemoteModuleTypeUnion } from "./types";

const remoteModules = ref<RemoteModules>();

export const useRemoteModules = async ({ type = RemoteModuleTypeEnum.page }) => {
  if (!remoteModules.value?.pages.length) {
    remoteModules.value = await fetchRemoteModules();
  }

  if (type === RemoteModuleTypeEnum.page) {
    return {
      remotePages: remoteModules.value.pages,
    };
  } else {
    const HelloWorld = defineAsyncComponent(() => import("hello_exposes/HelloWorld.vue").finally());
    return {
      component: HelloWorld,
    };
  }
};
