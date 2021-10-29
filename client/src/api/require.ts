import axios from 'axios'

const instance = axios.create({
  transformRequest: [
    function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})
instance.defaults.timeout = 30 * 1000
instance.defaults.baseURL = '/api'

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject(response.data)
    }
  }
)

export default instance

