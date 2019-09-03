import Vue from 'vue'
import umask from './umask'
import transcode from './transcode'

const filters: any = {
  umask,
  transcode
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
