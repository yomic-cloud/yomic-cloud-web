export function toCascade (list: any[] = [], key: string = 'id', parentKey: string = 'parentId'): any[] {
  const map: any = toMap(list)
  let tree = {}
  list.forEach((v: any) => {
    putInTree(v)
  })
  return treeToCascade(tree)

  function treeToCascade (tree: any) {
    let ret: any[] = []
    Object.keys(tree).forEach((v: any) => {
      let item = map[v]
      if (!item) return
      let copy = clone(item)
      let childrenKeys = Object.keys(tree[v] || {})
      if (childrenKeys.length > 0) {
        let children = treeToCascade(tree[v])
        if (children.length > 0) copy.children = children
      }
      ret.push(copy)
    })
    return ret

    function clone (obj: any) {
      return Object.assign({}, obj)
    }
  }

  function putInTree (obj: any) {
    if (!obj) return
    let keyChain: any[] = []
    let temp = obj
    while (temp) {
      let keyValue = getKeyValue(temp)
      if (!keyValue) return
      keyChain.splice(0, 0, keyValue)
      temp = map[temp[parentKey]]
    }
    let context: any = tree
    keyChain.forEach((v: any) => {
      if (!context[v]) context[v] = {}
      context = context[v]
    })
  }

  function toMap (list: any) {
    let map: any = {}
    list.forEach((v: any) => {
      let keyValue = getKeyValue(v)
      if (!keyValue) return
      map[keyValue] = v
    })
    return map
  }

  function getKeyValue (obj: any) {
    if (!obj) return null
    return obj[key]
  }
}
