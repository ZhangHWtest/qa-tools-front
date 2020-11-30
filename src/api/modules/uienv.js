import { reques } from '../axios'

export const addUiEnv = data => {
  return reques({
    url: '/uitest/addenv',
    method: 'post',
    data
  })
}

export const getPlatformList = () => {
  return reques({
    url: '/uitest/platforminfo',
    method: 'get'
  })
}
