import Vue from 'vue'
import { required, double, numeric } from 'vee-validate/dist/rules'
import { ValidationObserver, ValidationProvider, extend, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

// Add a rule.
extend('required', {
  ...required,
  message: '{_field_} é obrigatório.'
})

extend('double', {
  ...double,
  message: '{_field_} precisa ser um valor numérico.'
})

extend('numeric', {
  ...numeric,
  message: '{_field_} precisa ser um valor numérico.'
})

// Register it globally
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
