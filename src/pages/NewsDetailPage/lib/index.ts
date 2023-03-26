import { News } from 'pages/NewsPage/models';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { EditNewsProps } from '../models';
import { addNews, editNews, getNews } from '../services';

export function useNewsDetails(id?: string | number) {
  return useQuery(['news_details', id], () => getNews(id), {
    cacheTime: 60 * 10 * 1000,
    staleTime: 60 * 10 * 1000,
    enabled: !!id,
  });
}

export function useEditNews(isEdit: boolean) {
  const queryClient = useQueryClient();
  if (isEdit) {
    return useMutation(editNews, {
      onMutate: (editedItem: EditNewsProps) => {
        console.log(editedItem);
        // Снимок предыдущего значения
        const prevNewsList: News[] | undefined = queryClient.getQueryData([
          'news_list',
        ]);
        // Возвращаем объект контекста с зафиксированным значением
        return prevNewsList?.length
          ? prevNewsList.filter((it) => it.id !== editedItem.id)
          : [];
      },
      onSuccess: (editedItem: any) => {
        // Оптимистическое обновление
        queryClient.setQueryData(['news_list'], (oldNewsList?: News[]) => {
          if (oldNewsList?.length) {
            return oldNewsList.filter((it) => it.id !== editedItem.id);
          }
          return [];
        });
        console.log('Новость изменена ! \n', editedItem);
      },
      onError: () => {
        console.log('Ошибка изменения новости !');
      },
    });
  }

  return useMutation(addNews, {
    onMutate: (editedItem: EditNewsProps) => {
      console.log(editedItem);
      // Снимок предыдущего значения
      const prevNewsList: News[] | undefined = queryClient.getQueryData([
        'news_list',
      ]);
      // Возвращаем объект контекста с зафиксированным значением
      return prevNewsList?.length
        ? prevNewsList.filter((it) => it.id !== editedItem.id)
        : [];
    },
    onSuccess: (editedItem: any) => {
      // Оптимистическое обновление
      queryClient.setQueryData(['news_list'], (oldNewsList?: News[]) => {
        if (oldNewsList?.length) {
          return oldNewsList.filter((it) => it.id !== editedItem.id);
        }
        return [];
      });
      console.log(
        isEdit ? 'Новость изменена ! \n' : 'Новость добавлена ! \n',
        editedItem,
      );
    },
    onError: () => {
      console.log('Ошибка изменения новости !');
    },
  });
}
