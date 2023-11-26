import '@/styles/index.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const stores = createPinia();
stores.use(piniaPluginPersistedstate);

app.use(stores);
app.use(router);

app.mount('#app');
