import { reques } from '../axios'

// 获取所有项目列表
export const getCaseList = data => {
  return reques({
    url: '/api/case/list',
    method: 'post',
    data
  })
}
