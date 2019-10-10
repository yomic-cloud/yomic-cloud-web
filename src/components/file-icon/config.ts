const map: any = {
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

export function getIcon (contentType: string) {
  let ret = Object.keys(map).find(key => (contentType || '').startsWith(key))
  return ret ? map[ret] : 'file'
}
