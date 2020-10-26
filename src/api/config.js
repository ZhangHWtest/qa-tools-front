const url = 'http://192.168.100.38:5001'
// const url = 'http://10.20.4.158:5555'
export default {
  baseUrl: url,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  data: {},
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  responseType: 'json'
}
