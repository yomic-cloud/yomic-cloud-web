import { Controller, RequestMapping } from '@pat-fet/mock-server'

export default class depts extends Controller {
  @RequestMapping({ url: '/depts', method: 'get' })
  login (req, res, context) {
    let query = req.query
    console.log(query)
    return this.collection.find(query)
  }
}
