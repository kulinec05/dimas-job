import { http, httpPublick } from 'services/http';
import { NewsListProps, ResponseNews, Status, Type } from '../models';

export const getNewsTypes = async () => {
  const response = await httpPublick.get<Type[]>('complaints/types');

  return [...response.data];
};

export const getNewsStatuses = async () => {
  const response = await httpPublick.get<Status[]>('complaints/statuses');

  return [...response.data];
};

const mockRes = [
  {
    id: 30,
    title: 'Заголовок новости 2312',
    text: 'Текст новости 2',
    image: null,
    is_delete: false,
    created_at: '2023-02-23T09:17:01.000000Z',
    updated_at: '2023-02-23T09:17:01.000000Z',
  },
  {
    id: 20,
    title: 'Заголовок новости 1321',
    text: 'Текст новости 1',
    image: null,
    is_delete: true,
    created_at: '2023-02-23T09:16:57.000000Z',
    updated_at: '2023-02-23T09:16:57.000000Z',
  },
  {
    id: 11,
    title: 'Заголовок новости 123123',
    text: 'Текст новости',
    image: null,
    is_delete: false,
    created_at: '2023-02-23T09:16:39.000000Z',
    updated_at: '2023-02-23T09:16:39.000000Z',
  },
];
export const getNewsList = async ({
  page = 1,
  pageSize,
  filter,
}: NewsListProps) => {
  const response = await http.get<ResponseNews>('news', {
    params: {
      page,
      page_size: pageSize,
      filter,
      sort: {
        field: 'id',
        direction: 'DESC',
      },
    },
  });

  response.data.data = response.data.data.concat(mockRes);

  return {
    ...(response.data as ResponseNews),
  };
};
