import Vue from 'vue'
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)

// Local Directive
export default {
  directives: VueTheMask.mask
}

/**
 * Usage
 * '#': {pattern: /\d/},
 * 'X': {pattern: /[0-9a-zA-Z]/},
 * 'S': {pattern: /[a-zA-Z]/},
 * 'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
 * 'a': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()},
 * '!': {escape: true}
 */
