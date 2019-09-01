import { Controller, RequestMapping } from '@pat-fet/mock-server'
import { normalize } from '../helpers/request'

export default class users extends Controller {
  @RequestMapping({ url: '/login', method: 'post' })
  login (req, res, context) {
    let username = req.body.username
    let user = this.collection.find({ username })[0]
    if (!user) throw new Error('未找到用户: ' + username)
    let token = context.authService.setAuth(req, user)
    return { token }
  }

  @RequestMapping({ url: '/logout', method: 'delete' })
  logout (req, res, context) {
    context.authService.clear(req)
  }

  @RequestMapping({ url: '/principle', method: 'get' })
  getPrinciple (req, res, context) {
    return context.authService.getAuth(req)
  }

  // for users

  @RequestMapping({ url: '/users', method: 'get' })
  query (req, res, context) {
    let model = normalize(req.query)
    return this.collection.find(model)
  }

  @RequestMapping({ url: '/users', method: 'post' })
  add (req, res, context) {
    let model = normalize(req.body)
    let id = index++
    if (model.deptId) {
      let dept = this.getCollection('depts').find({ id: deptId })[0]
      if (!dept) throw new Error(`not find dept [${deptId}]`)
      model.deptName = dept.name
    }
    Object.assign(model, { id, status: true })
    this.collection.insert(model)
    return id
  }

  @RequestMapping({ url: '/users/:id', method: 'get' })
  get (req, res, context) {
    let id = +req.params.id
    return this.collection.find({ id })[0]
  }

  @RequestMapping({ url: '/users/:id', method: 'patch' })
  patch (req, res, context) {
    let id = +req.params.id
    let model = normalize(req.body, true)
    let user = this.collection.find({ id })[0]
    if (!user) throw new Error(`not found user [${id}]`)
    if (model.deptId) {
      if (model.deptId < 0) {
        model.deptId = null
        model.deptName = null
      } else {
        let dept = this.getCollection('depts').find({ id: deptId })[0]
        if (!dept) throw new Error(`not find dept [${deptId}]`)
        model.deptName = dept.name
      }
    }
    Object.assign(user, model)
    this.collection.update(user)
  }

  @RequestMapping({ url: '/users/:id', method: 'delete' })
  delete (req, res, context) {
    let id = +req.params.id
    let user = this.collection.find({ id })[0]
    this.collection.remove(user)
  }
}
