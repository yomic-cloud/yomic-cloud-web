const map: any = {
  // image
  'image/gif': 'gif',
  'image/x-icon': 'ico',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/x-bmp': 'png',
  'image/': 'image',

  // office
  'application/msword': 'word',
  'application/vnd.ms-excel': 'excel',
  'application/vnd.ms-powerpoint': 'ppt',

  // pdf
  'application/pdf': 'pdf'

  // audio

}

export function getIcon (contentType: string) {
  let ret = Object.keys(map).find(key => (contentType || '').startsWith(key))
  return ret ? map[ret] : 'file'
}
