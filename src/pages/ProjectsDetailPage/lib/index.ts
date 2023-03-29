import { Projects } from 'pages/ProjectsPage/models';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { EditProjectsProps } from '../models';
import { addProjects, editProjects, getProjects } from '../services';

export function useProjectsDetails(id?: string | number) {
  return useQuery(['events_details', id], () => getProjects(id), {
    cacheTime: 60 * 10 * 1000,
    staleTime: 60 * 10 * 1000,
    enabled: !!id,
  });
}

export function useEditProjects(isEdit: boolean) {
  const queryClient = useQueryClient();
  if (isEdit) {
    return useMutation(editProjects, {
      onMutate: (editedItem: EditProjectsProps) => {
        console.log(editedItem);
        // Снимок предыдущего значения
        const prevProjectsList: Projects[] | undefined =
          queryClient.getQueryData(['events_list']);
        // Возвращаем объект контекста с зафиксированным значением
        return prevProjectsList?.length
          ? prevProjectsList.filter((it) => it.id !== editedItem.id)
          : [];
      },
      onSuccess: (editedItem: any) => {
        // Оптимистическое обновление
        queryClient.setQueryData(
          ['events_list'],
          (oldProjectsList?: Projects[]) => {
            if (oldProjectsList?.length) {
              return oldProjectsList.filter((it) => it.id !== editedItem.id);
            }
            return [];
          },
        );
        console.log('Проект изменена ! \n', editedItem);
      },
      onError: () => {
        console.log('Ошибка изменения проекта !');
      },
    });
  }
  return useMutation(addProjects, {
    onMutate: (editedItem: EditProjectsProps) => {
      console.log(editedItem);
      // Снимок предыдущего значения
      const prevProjectsList: Projects[] | undefined = queryClient.getQueryData(
        ['events_list'],
      );
      // Возвращаем объект контекста с зафиксированным значением
      return prevProjectsList?.length
        ? prevProjectsList.filter((it) => it.id !== editedItem.id)
        : [];
    },
    onSuccess: (editedItem: any) => {
      // Оптимистическое обновление
      queryClient.setQueryData(
        ['events_list'],
        (oldProjectsList?: Projects[]) => {
          if (oldProjectsList?.length) {
            return oldProjectsList.filter((it) => it.id !== editedItem.id);
          }
          return [];
        },
      );
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
