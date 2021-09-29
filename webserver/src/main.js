import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import App from './App.vue'
import router from './router'
  

//import "tailwindcss/tailwind.css"

import './css/tailwind.css'
import '@fortawesome/fontawesome-free/js/all.js';
import './css/main.css'
import './css/normalize.css'
 



Vue.config.productionTip = false

const settings = {
  TDropdown: {
    fixedClasses: {
      button: 'flex items-center text-white block px-4 py-2 transition duration-100 ease-in-out border border-transparent rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      wrapper: 'inline-flex flex-col',
      dropdownWrapper: 'relative z-10',
      dropdown: 'origin-top-left absolute left-0 w-56 rounded shadow mt-1',
      enterActiveClass: 'transition ease-out duration-100 transform opacity-0 scale-95',
      enterToClass: 'transform opacity-100 scale-100',
      leaveClass: 'transition ease-in transform opacity-100 scale-100',
      leaveToClass: 'transform opacity-0 scale-95 duration-75'
    },
    classes: {
      button: 'bg-blue-500 hover:bg-blue-600',
      dropdown: 'bg-white'
    },
    variants: {
      danger: {
        button: 'bg-red-500 hover:bg-red-600',
        dropdown: 'bg-red-50'
      }
    }
  }
}

Vue.use(VueTailwind, settings)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
