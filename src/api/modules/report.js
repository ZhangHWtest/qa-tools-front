import { reques } from '../axios'

export const reportList = data => {
  return reques({
    url: '/report/list',
    method: 'post',
    data
  })
}

export const reportInfo = data => {
  return reques({
    url: '/report/info',
    method: 'post',
    data
  })
}

// 登出
export const reportProductList = () => {
  return reques({
    url: '/report/product/list',
    method: 'get'
  })
}

export const updatereport = data => {
  return reques({
    url: '/report/update',
    method: 'post',
    data
  })
}
