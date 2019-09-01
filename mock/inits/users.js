const prefix = 'home'

// 支持 module.exports
export default [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
