const map: any = {
  // image
  image: {
    'gif': 'gif',
    'ico': 'ico',
    'jpg': 'jpg',
    'jpeg': 'jpg',
    'png': 'png'
  },
  // office
  office: {
    'doc': 'word',
    'docx': 'word',
    'xls': 'excel',
    'xlsx': 'excel',
    'ppt': 'ppt',
    'pptx': 'ppt'
  },
  audio: {

  },
  video: {

  }
}

export const iconMap = getIconMap()

export function getType (suffix: string) {
  return Object.keys(map).find((v: string) => {
    return !!(map[v] && map[v][suffix])
  }) || ''
}

function getIconMap () {
  let ret: any = {}
  Object.values(map).forEach(v => {
    Object.assign(ret, v)
  })
  return ret
}
