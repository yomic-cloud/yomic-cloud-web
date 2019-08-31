import Vue from 'vue'
import umask from './umask'

const filters: any = {
  umask
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
