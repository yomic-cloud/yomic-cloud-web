import { Controller, RequestMapping } from '@pat-fet/mock-server'

let index = 100000000

export default class files extends Controller {
  @RequestMapping({ url: '/files', method: 'get' })
  query (req, res, context) {
    let model = req.query
    delete model._t
    let parentId = model.parentId
    if (parentId) model.parentId = parentId > 0 ? +parentId : null
    return this.collection.find(model)
  }

  @RequestMapping({ url: '/files', method: 'post' })
  add (req, res, context) {
    let model = req.body || {}
    let id = index++
    Object.assign(model, { id })
    this.collection.insert(model)
    return id
  }

  @RequestMapping({ url: '/files/:id', method: 'get' })
  get (req, res, context) {
    let id = +req.params.id
    return this.collection.find({ id })[0]
  }

  @RequestMapping({ url: '/files/:id', method: 'patch' })
  patch (req, res, context) {
    let id = +req.params.id
    let model = req.body || {}
    if (model.parentId && model.parentId < 0) model.parentId = null
    let file = this.collection.find({ id })[0]
    if (!file) throw new Error(`not found file [${id}]`)
    Object.assign(file, model)
    this.collection.update(file)
  }

  @RequestMapping({ url: '/files/:id', method: 'delete' })
  delete (req, res, context) {
    let id = +req.params.id
    let dept = this.collection.find({ id })[0]
    console.log(dept, id)
    this.collection.remove(dept)
  }
}
