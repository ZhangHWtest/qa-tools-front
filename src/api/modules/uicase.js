import { reques } from '../axios'

export const addUiCase = data => {
  return reques({
    url: '/uitest/addcase',
    method: 'post',
    data
  })
}

