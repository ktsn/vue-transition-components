import Vue from 'vue'
import { TransitionAccordion } from '../../src/index'

const vm = new Vue({
  el: '#app',

  data: {
    open: true,
    duration: 400,
    easing: 'ease-out'
  },

  components: {
    TransitionAccordion
  }
})
