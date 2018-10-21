// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import Test from './pages/test/test';

import V from 'vconsole'
new V();

import FastClick from 'fastclick';
FastClick.attach(document.body);

// Vue.use(VueRouter);
// const router = new VueRouter({
//   mode: 'history',
//   routes: [
//     {
//       path: '/',
//       name: 'test',
//       component: Test
//     }
//   ]
// });
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>'
})
