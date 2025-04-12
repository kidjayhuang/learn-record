import { defineAsyncComponent, ref, ComponentPublicInstance, DefineComponent } from "vue";
import { fetchRemoteModules, type RemoteModule } from "@/apis";
import { RemoteModuleTypeEnum, type RemoteModuleTypeUnion } from "./types";

const remoteModules = ref<RemoteModule[]>([]);

export async function useRemoteModule() {
  if (!remoteModules.value.length) {
    remoteModules.value = await fetchRemoteModules();
  }

  return remoteModules;
}

