import { reques } from '../axios'

// 获取所有项目列表
export const getEnvironmentList = data => {
  return reques({
    url: '/api/environment/list',
    method: 'post',
    data
  })
}
