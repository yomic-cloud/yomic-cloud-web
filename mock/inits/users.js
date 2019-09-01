const prefix = 'home'

// 支持 module.exports
export default [
  {
    username: 'user',
    cname: '普通用户',
    status: true,
    ip: '',
    deptId: null,
    deptName: '',
    roles: [
      {
        code: 'USER'
      }
    ]
  },
  {
    username: 'admin',
    cname: '文件夹管理员',
    status: true,
    ip: '',
    deptId: null,
    deptName: '',
    roles: [
      {
        code: 'ADMIN'
      }
    ]
  },
  {
    username: 'root',
    cname: '超级管理员',
    status: true,
    ip: '',
    deptId: null,
    deptName: '',
    roles: [
      {
        code: 'SUPER'
      }
    ]
  }
]
