import { createApp, reactive } from 'vue'
import './style.css'
import App from './App.vue'
import { MainLogic } from './logic/mainlogic'
import { i18n, loadLocale } from './i18n'

export const mainLogic = reactive(MainLogic.getInstance());

mainLogic.init();
mainLogic.prepare();

await loadLocale(i18n, "zh_cn");

const app = createApp(App)
app.use(i18n)

app.mount('#app')
