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

export const addreport = data => {
  return reques({
    url: '/report/add',
    method: 'post',
    data
  })
}

export const updatereport = data => {
  return reques({
    url: '/report/update',
    method: 'post',
    data
  })
}
