/* eslint-disable no-path-concat */
const MockServer = require('@pat-fet/mock-server')

// 导入初始化数据
MockServer.Controller.inits = MockServer.requireAll({ dirname: __dirname + '/inits' })

// 导入控制器
MockServer.requireAll({ dirname: __dirname + '/controllers' })

// 配置
const config = {
  port: 3000
}

const server = new MockServer(config)

server.run()
