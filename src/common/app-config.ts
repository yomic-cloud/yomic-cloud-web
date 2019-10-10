import Vue from 'vue'

const storageKey = 'appConfig'

function loadStore (): AppConfig {
  let data = JSON.parse(window.localStorage.getItem(storageKey) || '{}')
  return Object.assign(new AppConfig(), data)
}

function saveStore (store: AppConfig) {
  window.localStorage.setItem(storageKey, JSON.stringify(store))
}

export class SiderConfig {
    dark: boolean = false
}

export class HeaderConfig {
    dark: boolean = false
}

export class AppConfig {
    dark: boolean = false

    primary: string = '#1890ff'

    sider: SiderConfig = new SiderConfig()

    header: HeaderConfig = new HeaderConfig()
}

const store = new Vue({
  data: {
    appConfig: loadStore()
  },
  watch: {
    appConfig: {
      handler: function () {
        saveStore(this.appConfig)
      },
      deep: true
    }
  }
})

export default store.appConfig as AppConfig
