import './assets/main.css';

import {createApp} from 'vue';
import {createPinia} from 'pinia';
// import * as echarts from 'echarts';
// import _ from 'lodash';
import dayjs from 'dayjs';
import App from './App.vue';
import router from './router';
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
const app = createApp(App);
// const a = _.add(3, 3);
// console.log(a);
console.log(dayjs);
// app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount('#app');
// const obj = {name: 'dawei', age: 18};
// const arr = [1, 2, 3, 4, 5];
