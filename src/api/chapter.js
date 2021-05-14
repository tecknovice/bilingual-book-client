import request from '@/utils/request';

export function getList(params) {
  return request({
    url: '/chapter',
    method: 'get',
    params,
  });
}

export function getChapter(id) {
  return request({
    url: `/chapter/${id}`,
    method: 'get',
  });
}

export function createChapter(data) {
  return request({
    url: '/chapter',
    method: 'post',
    data,
  });
}
