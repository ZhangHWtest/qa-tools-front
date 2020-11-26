import { reques } from '../axios'

// 获取所有系统列表
export const getSystemList = data => {
  return reques({
    url: '/uitest/syslist',
    method: 'post',
    data
  })
}

export const addSystem = data => {
  return reques({
    url: '/uitest/addsys',
    method: 'post',
    data
  })
}

export const editSystem = data => {
  return reques({
    url: '/uitest/editsys',
    method: 'post',
    data
  })
}

export const delSystem = data => {
  return reques({
    url: '/uitest/delsys',
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
