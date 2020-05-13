import { reques } from '../axios'

// 获取所有项目列表
export const getInterfaceList = data => {
  return reques({
    url: '/interface/list',
    method: 'post',
    data
  })
}
// 创建接口参数
export const createInterfaceParamMethod = data => {
  return reques({
    url: '/interface/param/add',
    method: 'post',
    data
  })
}
// 修改接口参数
export const editInterfaceParamMethod = data => {
  return reques({
    url: '/interface/param/edit',
    method: 'post',
    data
  })
}
// 删除接口参数
export const removeInterfaceParamMethod = data => {
  return reques({
    url: '/interface/param/del',
    method: 'post',
    data
  })
}

// 创建请求头参数
export const createInterfaceHeaderMethod = data => {
  return reques({
    url: '/interface/header/edit',
    method: 'post',
    data
  })
}

// 创建返回信息参数
export const createInterfaceResponseMethod = data => {
  return reques({
    url: '/interface/response/edit',
    method: 'post',
    data
  })
}

// 创建接口
export const createInterfaceMethod = data => {
  return reques({
    url: '/interface/add',
    method: 'post',
    data
  })
}
// 修改接口
export const editInterfaceMethod = data => {
  return reques({
    url: '/interface/edit',
    method: 'post',
    data
  })
}

// 删除接口
export const delInterfaceMethod = data => {
  return reques({
    url: '/interface/del',
    method: 'post',
    data
  })
}

// 获取所有接口
export const getInterfaceInfoMethod = data => {
  return reques({
    url: '/interface/info',
    method: 'post',
    data
  })
}
