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

export function updateChapter(data) {
  return request({
    url: `/chapter/${data._id}`,
    method: 'patch',
    data,
  });
}

export function deleteChapter(id) {
  return request({
    url: `/chapter/${id}`,
    method: 'delete',
  });
}
