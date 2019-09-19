import { Controller, RequestMapping } from '@pat-fet/mock-server'
import { normalize } from '../helpers/request'
import { genId, genUuid } from '../helpers/uuid'
import { formatDate } from '../helpers/date'

export default class links extends Controller {
  @RequestMapping({ url: '/links', method: 'get' })
  query (req, res, context) {
    let model = normalize(req.query)
    let ret = this.collection.find(model)
    ret = ret.map(v => {
      let item = Object.assign({}, v)
      item.files = (item.files || []).map(w => {
        return this.getCollection('files').find({ id: w })[0]
      }).filter(w => !!w)
      return item
    })
    return ret
  }

  @RequestMapping({ url: '/links', method: 'post' })
  add (req, res, context) {
    let model = normalize(req.body)
    let id = genId()
    let creationBy = context.authService.getAuth(req).username
    let creationTime = formatDate(new Date())
    let code = genUuid()
    Object.assign(model, { id, creationBy, creationTime, code })
    this.collection.insert(model)
    return id
  }

  @RequestMapping({ url: '/links/:id', method: 'get' })
  get (req, res, context) {
    let id = +req.params.id
    let ret = this.collection.find({ id })[0]
    if (!ret) return ret
    ret = Object.assign({}, ret)
    ret.files = (ret.files || []).map(v => {
      return this.getCollection('files').find({ id: v })[0]
    }).filter(v => !!v)
    return ret
  }

  // @RequestMapping({ url: '/depts/:id', method: 'patch' })
  // patch (req, res, context) {
  //   let id = +req.params.id
  //   let model = req.body || {}
  //   if (model.parentId < 0) model.parentId = null
  //   let dept = this.collection.find({ id })[0]
  //   if (!dept) throw new Error(`not found dept [${id}]`)
  //   Object.assign(dept, model)
  //   this.collection.update(dept)
  // }

  @RequestMapping({ url: '/links/:id', method: 'delete' })
  delete (req, res, context) {
    let id = +req.params.id
    let link = this.collection.find({ id })[0]
    this.collection.remove(link)
  }
}
