import Request from './require'

const request = Request()

export function getTypeData(params:any) {
  return request({
    url: 'api/billType/typeData',
    params,
    method: 'post'
  })
}