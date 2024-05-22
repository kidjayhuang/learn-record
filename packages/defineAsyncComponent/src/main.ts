import { createApp, isVNode, ref, Ref } from 'vue'
import * as Vue from 'vue'
import App from './App.vue'
// 1. 引入你需要的组件
import Vant from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

import vconsole from 'vconsole'
// @ts-ignore
import router from './router'

new vconsole()

// @ts-ignore
window.Vue = Vue

createApp(App).use(router).use(Vant).mount('#app');
