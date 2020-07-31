import { reques } from '../axios'

export const mfList = data => {
  return reques({
    url: '/manufacturer/list',
    method: 'post',
    data
  })
}

export const mfAdd = data => {
  return reques({
    url: '/manufacturer/add',
    method: 'post',
    data
  })
}

export const mfDel = data => {
  return reques({
    url: '/manufacturer/del',
    method: 'post',
    data
  })
}

export const eqList = data => {
  return reques({
    url: '/equipment/list',
    method: 'post',
    data
  })
}

export const eqInfo = data => {
  return reques({
    url: '/equipment/info',
    method: 'post',
    data
  })
}

export const eqAdd = data => {
  return reques({
    url: '/equipment/add',
    method: 'post',
    data
  })
}

export const eqEdit = data => {
  return reques({
    url: '/equipment/edit',
    method: 'post',
    data
  })
}

export const eqSwitch = data => {
  return reques({
    url: '/equipment/switch',
    method: 'post',
    data
  })
}

export const eqDel = data => {
  return reques({
    url: '/equipment/del',
    method: 'post',
    data
  })
}

export const eqLog = data => {
  return reques({
    url: '/equipment/log',
    method: 'post',
    data
  })
}
