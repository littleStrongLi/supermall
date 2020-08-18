//首页数据请求的封装，统一管理首页的请求

import {request} from './request'

export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}