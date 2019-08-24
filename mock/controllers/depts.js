import { Controller, RequestMapping } from '@pat-fet/mock-server'

let index = 10000

export default class depts extends Controller {
  @RequestMapping({ url: '/depts', method: 'get' })
  query (req, res, context) {
    return this.collection.find()
  }

  @RequestMapping({ url: '/depts', method: 'post' })
  add (req, res, context) {
    let model = req.body || {}
    let id = index++
    Object.assign(model, { id })
    this.collection.insert(model)
    return id
  }

  @RequestMapping({ url: '/depts/:id', method: 'get' })
  get (req, res, context) {
    let id = +req.params.id
    return this.collection.find({ id })[0]
  }

  @RequestMapping({ url: '/depts/:id', method: 'patch' })
  patch (req, res, context) {
    let id = +req.params.id
    let model = req.body || {}
    if (model.parentId < 0) model.parentId = null
    let dept = this.collection.find({ id })[0]
    if (!dept) throw new Error(`not found dept [${id}]`)
    Object.assign(dept, model)
    this.collection.update(dept)
  }

  @RequestMapping({ url: '/depts/:id', method: 'delete' })
  delete (req, res, context) {
    let id = +req.params.id
    let dept = this.collection.find({ id })[0]
    console.log(dept, id)
    this.collection.remove(dept)
  }
}
