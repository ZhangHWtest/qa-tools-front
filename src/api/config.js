// const url = 'http://39.97.102.74:5001'
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
