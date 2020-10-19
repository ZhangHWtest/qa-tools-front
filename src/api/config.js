// const url = 'http://192.168.70.72:5000'
const url = '/api'
export default {
  baseUrl: url,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  data: {},
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  responseType: 'json'
}
