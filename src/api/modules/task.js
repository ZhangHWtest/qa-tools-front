import { reques } from '../axios'

// 获取所有项目列表
export const getTaskList = data => {
  return reques({
    url: '/task/list',
    method: 'post',
    data
  })
}

export const getTaskInfo = data => {
  return reques({
    url: '/task/info',
    method: 'post',
    data
  })
}

export const addTask = data => {
  return reques({
    url: '/task/add',
    method: 'post',
    data
  })
}

export const editTask = data => {
  return reques({
    url: '/task/edit',
    method: 'post',
    data
  })
}

export const delTask = data => {
  return reques({
    url: '/task/del',
    method: 'post',
    data
  })
}
