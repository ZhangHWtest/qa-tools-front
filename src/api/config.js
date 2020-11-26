<<<<<<< HEAD
const url = 'http://192.168.100.38:5001'
// const url = '/api'
=======
// const url = 'http://192.168.100.38:5001'
const url = '/api'
// const url = '/'
>>>>>>> newCase
export default {
  baseUrl: url,
  data: {},
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  responseType: 'json'
}
