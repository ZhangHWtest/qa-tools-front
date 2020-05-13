import { reques } from '../axios'

/*
 *
 */
// 获取所有项目列表
export const getProjectList = data => {
  return reques({
    url: '/project/list',
    method: 'post',
    data
  })
}

// 获取项目详情
export const getProjectInfo = data => {
  return reques({
    url: '/project/info',
    method: 'post',
    data
  })
}

// 创建项目
export const addProject = data => {
  return reques({
    url: '/project/add',
    method: 'post',
    data
  })
}

// 修改项目
export const editProject = data => {
  return reques({
    url: '/project/edit',
    method: 'post',
    data
  })
}

// 删除项目
export const projectDel = data => {
  return reques({
    url: '/project/del',
    method: 'post',
    data
  })
}

// 获取所有模块
export const getModelList = data => {
  return reques({
    url: '/model/list',
    method: 'post',
    data
  })
}

// 添加模块
export const addModel = data => {
  return reques({
    url: '/model/add',
    method: 'post',
    data
  })
}

// 修改模块
export const editModel = data => {
  return reques({
    url: '/model/edit',
    method: 'post',
    data
  })
}

// 删除模块
export const delModel = data => {
  return reques({
    url: '/model/del',
    method: 'post',
    data
  })
}
