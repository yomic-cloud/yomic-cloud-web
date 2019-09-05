import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Mock from 'mockjs'
import { normalize } from '../helpers/request'

let index = 10000

export default class authorities extends Controller {
  @RequestMapping({ url: '/authorities', method: 'get' })
  query (req, res, context) {
    let model = normalize(req.query)
    if (model.principleId) model.principleId = +model.principleId
    if (model.fileId) model.fileId = +model.fileId
    return this.collection.find(model)
  }

  @RequestMapping({ url: '/authorities', method: 'post' })
  add (req, res, context) {
    let model = normalize(req.body)
    let id = index++
    let mockExt = Mock.mock({ fileName: '@cword(2, 8)', principleName: '@cname', isDir: '@boolean' })
    Object.assign(model, { id }, mockExt)
    return this.collection.insert(model)
  }

  @RequestMapping({ url: '/authorities/:id', method: 'get' })
  get (req, res, context) {
    let id = +req.params.id
    let isUser = !!req.query.isUser
    return this.collection.find({ id, isUser })[0]
  }

  @RequestMapping({ url: '/authorities/:id', method: 'patch' })
  patch (req, res, context) {
    let id = +req.params.id
    let model = normalize(req.body)
    let isUser = model.isUser
    let authority = this.collection.find({ id, isUser })[0]
    if (!authority) throw new Error(`not found authority [${id}]`)
    Object.assign(authority, model)
    this.collection.update(authority)
  }

  @RequestMapping({ url: '/authorities/:id', method: 'delete' })
  delete (req, res, context) {
    let id = +req.params.id
    let isUser = !!req.query.isUser
    let authority = this.collection.find({ id })[0]
    this.collection.remove(authority)
  }
}
