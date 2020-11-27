import { reques } from '../axios'

// 获取所有项目列表
export const getLiveMsg = data => {
  return reques({
    url: '/tools/course_info_by_live_id',
    method: 'post',
    data
  })
}
