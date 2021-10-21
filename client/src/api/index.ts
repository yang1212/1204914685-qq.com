import Request from './require'

const request = Request()

export function login(params:any) {
  return request({
    url: 'bill/login',
    params,
    method: 'post'
  })
}

export function register(params:any) {
  return request({
    url: 'bill/register',
    params,
    method: 'post'
  })
}

export function getTypeData(params:any) {
  return request({
    url: 'bill/typeData',
    params,
    method: 'post'
  })
}

export function createBill(params:any) {
  return request({
    url: 'bill/createBill',
    params,
    method: 'post'
  })
}

export function getMemberInfo(params:any) {
  return request({
    url: 'bill/getMemberInfo',
    params,
    method: 'post'
  })
}

export function billTypeData(params:any) {
  return request({
    url: 'bill/initTypeList',
    params,
    method: 'post'
  })
}

export function billDetailList(params:any) {
  return request({
    url: 'bill/billDetailList',
    params,
    method: 'post'
  })
}

export function delListData(params:any) {
  return request({
    url: 'bill/delListData',
    params,
    method: 'post'
  })
}

export function forTimeCount(params:any) {
  return request({
    url: 'bill/forTimeCount',
    params,
    method: 'post'
  })
}

export function forYearCount(params:any) {
  return request({
    url: 'bill/forYearCount',
    params,
    method: 'post'
  })
}