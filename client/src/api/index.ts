import request from './require'

export function login(params:any) {
  return request({
    url: 'bill/login',
    data: params,
    method: 'post'
  })
}

export function register(params:any) {
  return request({
    url: 'bill/register',
    data: params,
    method: 'post'
  })
}

export function getTypeData(params:any) {
  return request({
    url: 'bill/typeData',
    data: params,
    method: 'post'
  })
}

export function createBill(params:any) {
  return request({
    url: 'bill/createBill',
    data: params,
    method: 'post'
  })
}

export function getMemberInfo(params:any) {
  return request({
    url: 'bill/getMemberInfo',
    data: params,
    method: 'post'
  })
}

export function billTypeData(params:any) {
  return request({
    url: 'bill/initTypeList',
    data: params,
    method: 'post'
  })
}

export function billDetailList(params:any) {
  return request({
    url: 'bill/billDetailList',
    data: params,
    method: 'post'
  })
}

export function delListData(params:any) {
  return request({
    url: 'bill/delListData',
    data: params,
    method: 'post'
  })
}

export function forTimeCount(params:any) {
  return request({
    url: 'bill/forTimeCount',
    data: params,
    method: 'post'
  })
}

export function forYearCount(params:any) {
  return request({
    url: 'bill/forYearCount',
    data: params,
    method: 'post'
  })
}