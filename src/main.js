import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/compat/app'

const firebaseConfig = {
    apiKey: "AIzaSyCSWBhIkvK2OCwd8H7LSxm8PZc9ipH-gDU",
    authDomain: "project-7249399887085162318.firebaseapp.com",
    databaseURL: "https://project-7249399887085162318-default-rtdb.firebaseio.com",
    projectId: "project-7249399887085162318",
    storageBucket: "project-7249399887085162318.appspot.com",
    messagingSenderId: "833108464562",
    appId: "1:833108464562:web:b57069e72560955ed34aab",
    measurementId: "G-TMQXEXF0XL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
window.firebase = firebase;

createApp(App).use(store).use(router).mount('#app')
