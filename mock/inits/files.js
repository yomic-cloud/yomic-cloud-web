import Mock from 'mockjs'

// copy from client
const map = {
  // image
  'gif': 'gif',
  'ico': 'ico',
  'jpg': 'jpg',
  'jpeg': 'jpg',
  'png': 'png',

  // office
  'doc': 'word',
  'docx': 'word',
  'xls': 'excel',
  'xlsx': 'excel',
  'ppt': 'ppt',
  'pptx': 'ppt',

  // pdf
  'pdf': 'pdf'

  // audio

}

function randomContentType () {
  let keys = Object.keys(map)
  let index = Math.floor(Math.random() * keys.length)
  return keys[index] || '/image/x-000'
}

function template (children, id = 1) {
  let data = {
    'id|+1': id,
    'dir|2-10': false,
    name: '@cword(2,16)',
    contentType: '@word(2,4)',
    'size|1000-100000': 1,
    'uuid': '@guid',
    creationBy: '@name',
    creationTime: '@datetime(yyyy/MM/dd HH:mm:ss)',
    lastChangeBy: '@name',
    lastChangeTime: '@datetime(yyyy/MM/dd HH:mm:ss)',
    'status|1-10': false,
    'limitSize|1000-100000': 1,
    limitSuffix: '@word(2,4)',
    'personal|4-10': true
  }

  if (children) {
    Object.assign(data, { 'children|5-10': children })
  }

  return [data]
}
const data = Mock.mock({
  'list|10-20': template(template(template(template(null, 1000000), 100000), 10000))
}).list

function toArray (tree, parent) {
  let ret = []
  tree.forEach(v => {
    if (parent && !parent.dir) return
    if (Array.isArray(v.children)) {
      ret.push(...toArray(v.children, v))
    }
    delete v.children
    v.parentId = (parent && parent.id) || null
    if (parent && parent.personal) v.personal = true
    if (!v.dir) v.contentType = randomContentType()
    ret.push(v)
  })
  return ret
}

export default toArray(data)
