import { ref, watch, WatchSource } from "vue";

export function useLazyRender(show: WatchSource<boolean | undefined>) {
  const inited = ref(false);

  watch(
    show,
    (value) => {
      debugger
      if (value) {
        inited.value = value;
      }
    },
    { immediate: true }
  );

  return () => inited.value;
}
