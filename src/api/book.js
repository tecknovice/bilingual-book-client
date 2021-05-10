import request from '@/utils/request';

export function getList(params) {
  return request({
    url: '/book',
    method: 'get',
    params,
  });
}

export function createBook(data) {
  return request({
    url: '/book',
    method: 'post',
    data,
  });
}
