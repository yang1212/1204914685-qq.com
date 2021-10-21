import axios from 'axios'

export default function() {
  const instance = axios.create()
  instance.defaults.timeout = 30 * 1000
  instance.defaults.method = 'post'
  instance.defaults.baseURL = '/api'
  instance.defaults.headers = {
    'Content-Type': 'application/json; charset=utf-8'
  }
  return instance
}
