import request from '@/utils/request';

export function getList(params) {
  return request({
    url: '/book',
    method: 'get',
    params,
  });
}

export function getBook(id) {
  return request({
    url: `/book/${id}`,
    method: 'get',
  });
}

export function addChapter(bookId, chapterId) {
  const data = { bookId, chapterId };
  return request({
    url: `/book/chapter`,
    method: 'put',
    data,
  });
}

export function createBook(data) {
  return request({
    url: '/book',
    method: 'post',
    data,
  });
}
