import { ref } from "vue";
const list = ref<number[]>([]);

setTimeout(() => {
  list.value.push(1);
}, 1000);
export function useTest() {
  return { list };
}
