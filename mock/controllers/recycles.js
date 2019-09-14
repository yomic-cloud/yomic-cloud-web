import { Controller, RequestMapping } from '@pat-fet/mock-server'
import { normalize } from '../helpers/request'
import { genId } from '../helpers/uuid'
import { formatDate } from '../helpers/date'

export default class recycles extends Controller {
  @RequestMapping({ url: '/recycles', method: 'get' })
  query (req, res, context) {
    let model = normalize(req.query)
    let ret = this.collection.find(model)
    ret.forEach(v => {
      if (v.fileId) {
        let file = this.getCollection('files').find({ id: v.fileId })[0]
        v.file = file
      }
    })
    return ret
  }

  @RequestMapping({ url: '/recycles', method: 'post' })
  add (req, res, context) {
    let model = normalize(req.body)
    let id = genId()
    let fileId = +model.fileId
    if (!fileId) throw new Error('no recycle file')
    let file = this.getCollection('files').find({ id: fileId })[0]
    if (!file) throw new Error(`recycle file [${fileId}] not found`)
    let creationBy = context.authService.getAuth(req).username
    let creationTime = formatDate(new Date())
    file.status = false
    this.getCollection('files').update(file)
    this.collection.insert({ id, fileId, creationBy, creationTime })
    return id
  }

  @RequestMapping({ url: '/recycles/:id', method: 'get' })
  get (req, res, context) {
    let id = +req.params.id
    let ret = this.collection.find({ id })[0]
    if (ret.fileId) {
      let file = this.getCollection('files').find({ id: ret.fileId })[0]
      ret.file = file
    }
    return ret
  }

  @RequestMapping({ url: '/recycles/:id', method: 'delete' })
  delete (req, res, context) {
    let id = +req.params.id
    let model = normalize(req.query)
    let recover = model.recover
    let recycle = this.collection.find({ id })[0]
    if (!recycle) throw new Error(`recycle [${id}] not found`)
    let fileId = recycle.fileId
    if (fileId) {
      let file = this.getCollection('files').find({ id: fileId })[0]
      if (recover) {
        // TODO 尚未实现层级恢复
        file.status = true
        this.getCollection('files').update(file)
      } else {
        // TODO 尚未实现层级删除
        this.getCollection('files').remove(file)
      }
    }
    this.collection.remove(recycle)
  }
}
