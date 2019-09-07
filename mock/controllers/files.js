import { Controller, RequestMapping } from '@pat-fet/mock-server'
import { normalize } from '../helpers/request'

let index = 100000000

export default class files extends Controller {
  @RequestMapping({ url: '/files', method: 'get' })
  query (req, res, context) {
    let model = normalize(req.query)
    if (model.parentId) model.parentId = +model.parentId
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
    let file = this.collection.find({ id })[0]
    let temp = file
    while (temp) {
      let parent = this.collection.find({ id: temp.parentId })[0]
      temp.parent = parent
      temp = parent
    }
    return file
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
