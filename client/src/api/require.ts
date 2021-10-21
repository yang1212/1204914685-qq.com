import axios from 'axios'

export default function() {
  const instance = axios.create()
  instance.defaults.timeout = 30 * 1000
  instance.defaults.method = 'post'
  return instance
}
