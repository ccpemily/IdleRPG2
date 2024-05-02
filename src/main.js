import { createApp, reactive } from 'vue'
import './style.css'
import App from './App.vue'
import { i18n, loadLocale } from './i18n.js'
import { MainLogic } from './logic/mainlogic'
import { Clock } from './clock/clock'

export const clock = reactive(new Clock(1000));
export const mainLogic = reactive(MainLogic.getInstance());

clock.addTickHandler(() => mainLogic.tick());

await loadLocale(i18n, "zh_cn");

const myApp = createApp(App);
myApp.use(i18n);
myApp.mount('#app');
