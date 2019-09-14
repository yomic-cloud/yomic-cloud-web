import { UploadRequestParam } from 'vua'
import { upload } from '@/api/nas'
import axios, { AxiosRequestConfig } from 'axios'

export default function request (param: UploadRequestParam) {
  let formData = new FormData()
  formData.append('file', param.file)
  const source = axios.CancelToken.source()
  const config: AxiosRequestConfig = {
    // onUploadProgress: param.onProgress || (() => {}),
    onUploadProgress: (e) => {
      let percent = Math.floor(e.loaded / e.total * 100)
      if (param.onProgress) param.onProgress({ percent })
    },
    cancelToken: source.token
  }
  upload(formData, config).then(data => {
    if (param.onSuccess) param.onSuccess(data)
  }).catch(e => {
    if (param.onError) param.onError(e)
  })
  return {
    abort: () => {
      source.cancel('upload canceled')
    }
  }
}
