import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/index'

// import Vant from 'vant'
// import 'vant/lib/index.css'
// app.use(Vant)


const app = createApp(App)

app.use(router).use(store).mount('#app')
