import {createApp} from 'vue'
import App from './App.vue'
import store from '@/store'

import 'bootstrap/dist/css/bootstrap.css';
import '@/style.css';


const app = createApp(App);
app.use(store).mount('#app');
