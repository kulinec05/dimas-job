import { News } from 'pages/NewsPage/models';
import { http } from 'services/http';
import { EditNewsProps } from '../models';

export const getNews = async (id?: string | number) => {
  const response = await http.get<News>(`news/${id}`);
  return response.data;
};

export const editNews = async ({
  id,
  title,
  text,
  result,
  is_delete,
}: EditNewsProps) => {
  const response = await http.put<{ status: string; data: News }>(
    `news/${id}`,
    {
      title: title,
      text: text,
      result,
      is_delete: is_delete,
    },
  );

  return {
    ...response.data,
  } as unknown as News;
};

export const addNews = async ({
  title,
  text,
  result,
  is_delete,
}: EditNewsProps) => {
  const response = await http.post<{ status: string; data: News }>(`news`, {
    title: title,
    text: text,
    result,
    is_delete,
  });

  return {
    ...response.data,
  } as unknown as News;
};
