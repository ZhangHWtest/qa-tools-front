import { reques } from '../axios'

// 获取直播详情
export const getLiveMsg = data => {
  return reques({
    url: '/tools/course_info_by_live_id',
    method: 'post',
    data
  })
}

// 获取今日直播列表
export const getTodayLiveList = data => {
  return reques({
    url: '/tools/live_lesson_today',
    method: 'post',
    data
  })
}
