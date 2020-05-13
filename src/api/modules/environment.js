import { reques } from '../axios'

// 获取所有项目列表
export const getEnvironmentList = data => {
  return reques({
    url: '/environment/list',
    method: 'post',
    data
  })
}

export const removeEnv = data => {
  return reques({
    url: '/environment/del',
    method: 'post',
    data
  })
}

export const addEnv = data => {
  return reques({
    url: '/environment/add',
    method: 'post',
    data
  })
}

export const editEnv = data => {
  return reques({
    url: '/environment/edit',
    method: 'post',
    data
  })
}

export const infoEnv = data => {
  return reques({
    url: '/environment/info',
    method: 'post',
    data
  })
}
