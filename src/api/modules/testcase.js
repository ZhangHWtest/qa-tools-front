import { reques } from '../axios'

// 获取所有项目列表
export const getCaseList = data => {
  return reques({
    url: '/case/list',
    method: 'post',
    data
  })
}

// 获取所有项目列表
export const addCase = data => {
  return reques({
    url: '/case/add',
    method: 'post',
    data
  })
}

export const editCase = data => {
  return reques({
    url: '/case/edit',
    method: 'post',
    data
  })
}

export const removeCase = data => {
  return reques({
    url: '/case/del',
    method: 'post',
    data
  })
}

export const runCase = data => {
  return reques({
    url: '/case/single',
    method: 'post',
    data
  })
}
export const runMultipleCase = data => {
  return reques({
    url: '/case/multiple',
    method: 'post',
    data
  })
}

export const getCaseInfo = data => {
  return reques({
    url: '/case/info',
    method: 'post',
    data
  })
}

export const getResultList = data => {
  return reques({
    url: '/case/result_list',
    method: 'post',
    data
  })
}

export const getResultInfo = data => {
  return reques({
    url: '/case/result_info',
    method: 'post',
    data
  })
}

export const duplicateCase = data => {
  return reques({
    url: '/case/duplicate',
    method: 'post',
    data
  })
}

export const getIndexNum = () => {
  return reques({
    url: '/index',
    method: 'get'
  })
}
