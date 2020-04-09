import { reques } from '../axios'

// 获取所有项目列表
export const getCaseList = data => {
  return reques({
    url: '/api/case/list',
    method: 'post',
    data
  })
}

// 获取所有项目列表
export const addCase = data => {
  return reques({
    url: '/api/case/add',
    method: 'post',
    data
  })
}

export const editCase = data => {
  return reques({
    url: '/api/case/edit',
    method: 'post',
    data
  })
}

export const removeCase = data => {
  return reques({
    url: '/api/case/del',
    method: 'post',
    data
  })
}

export const runCase = data => {
  return reques({
    url: '/api/case/single',
    method: 'post',
    data
  })
}

export const getCaseInfo = data => {
  return reques({
    url: '/api/case/info',
    method: 'post',
    data
  })
}
