/*
 * @Author: huangjh334 黄杰鸿 huangjh334@midea.com
 * @Date: 2023-08-04 14:04:55
 * @LastEditors: huangjh334 黄杰鸿 huangjh334@midea.com
 * @LastEditTime: 2023-08-04 16:23:23
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// import "./worker.ts";
import "./sw.ts";

createApp(App).mount("#app");

