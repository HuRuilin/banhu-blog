import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from '@/store/index.js'
import VueCropper from 'vue-cropper'
import 'vditor/dist/index.css';
import 'element-plus/dist/index.css';
import 'dayjs/locale/zh-cn'
import "normalize.css"
import Highlight from './plugins/highlight.js'
import registerElemComponents from '@/utils/elemCompRegister.js'
import dayjs from 'dayjs'


const app = createApp(App)
dayjs.locale('zh-cn')
registerElemComponents(app)
app.use(router)
app.use(store)
app.use(VueCropper)
app.use(Highlight)
app.mount('#app')
