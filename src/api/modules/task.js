import { reques } from '../axios'

// 获取所有项目列表
export const getTaskList = data => {
  return reques({
    url: '/task/list',
    method: 'post',
    data
  })
}
