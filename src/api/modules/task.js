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

export const updateTaskCase = data => {
  return reques({
    url: '/task/update_case',
    method: 'post',
    data
  })
}

export const startTask = data => {
  return reques({
    url: '/task/start',
    method: 'post',
    data
  })
}

export const stopTask = data => {
  return reques({
    url: '/task/stop',
    method: 'post',
    data
  })
}

export const resultListTask = data => {
  return reques({
    url: '/task/result_list',
    method: 'post',
    data
  })
}

export const resultInfoTask = data => {
  return reques({
    url: '/task/result_info',
    method: 'post',
    data
  })
}
