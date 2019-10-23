export function download (data: Blob, name: string) {
  let url = window.URL.createObjectURL(new Blob([data]))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', name)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link) // 下载完成移除元素
  window.URL.revokeObjectURL(url) // 释放掉blob对象
}

export function preview (data: Blob, name: string, type: string = 'application/pdf') {
  const blob = new Blob([data], { type })
  var url = URL.createObjectURL(blob)
  const win = window.open() as any
  const html = `'<iframe name="${name}" src="${url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
  win.document.write(html)
  win.document.title = name
  window.URL.revokeObjectURL(url) // 释放掉blob对象
}
