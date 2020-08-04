import { reques } from '../axios'

/*
 * 用户管理模块
 */

// 获取用户列表
export const getUserList = data => {
  return reques({
    url: '/user/list',
    method: 'post',
    data
  })
}

// 修改密码
export const updatepassword = data => {
  return reques({
    url: '/user/change_password',
    method: 'post',
    data
  })
}
// 新增用户
export const createUser = data => {
  return reques({
    url: '/user/add',
    method: 'post',
    data
  })
}

// 重置密码
export const resetPasswordApi = data => {
  return reques({
    url: '/user/reset_password',
    method: 'post',
    data
  })
}

// 修改用户状态
export const onOffUserApi = data => {
  return reques({
    url: '/user/on_off_user',
    method: 'post',
    data
  })
}

// 修改用户角色
export const setRoleApi = data => {
  return reques({
    url: '/user/set_role',
    method: 'post',
    data
  })
}
