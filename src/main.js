import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Admin from './layout/wrapper/Admin/layoutAdmin.vue'
import LeTan from './layout/wrapper/LeTan/index.vue';
import BacSi from './layout/wrapper/BacSi/layoutBacSi.vue';
import Blank from './layout/wrapper/blank.vue';
import Toaster from "@meforma/vue-toaster";

const app = createApp(App)

app.use(Toaster, {
    position: "top-right",
  });
app.use(router)
app.component("admin-layout", Admin);
app.component("bac-si-layout", BacSi);
app.component("letan-layout", LeTan);
app.component("blank-layout", Blank);
app.mount("#app")