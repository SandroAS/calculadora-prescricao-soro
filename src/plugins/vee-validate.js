import Vue from 'vue'
import { required, double, numeric, min } from 'vee-validate/dist/rules'
import { ValidationObserver, ValidationProvider, extend, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

// Add a rule.
extend('required', {
  ...required,
  message: '{_field_} é obrigatório.'
})

extend('double', {
  ...double,
  message: '{_field_} precisa ser um valor numérico interio ou decimal.'
})

extend('numeric', {
  ...numeric,
  message: '{_field_} precisa ser um valor numérico inteiro.'
})

extend('min', {
  ...min,
  params: ['length'],
  message: '{_field_} precisa ser no mínimo {length} °C.'
})

// Register it globally
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
