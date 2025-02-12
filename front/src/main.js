import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { fr } from "@/locales/fr-primevue.json"


// PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    locale: fr,
    ripple: true
});
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.use(createPinia()).use(router)

app.mount('#app')


