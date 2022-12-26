import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// firebaseをimport
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB5KXh-dmnLq2Gab4abbPF5Hb9tu2bQ90k",
    authDomain: "task-app2-f07e1.firebaseapp.com",
    projectId: "task-app2-f07e1",
    storageBucket: "task-app2-f07e1.appspot.com",
    messagingSenderId: "872286743586",
    appId: "1:872286743586:web:f2eccb18bcd5a8ad9dee7b",
    measurementId: "G-0G3BNBWLQN"
};

// firebaseの初期化
initializeApp(firebaseConfig);

library.add(fas,far)

createApp(App).use(store).use(router).component('fa', FontAwesomeIcon ).mount('#app')
