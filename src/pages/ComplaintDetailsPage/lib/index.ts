import { Complaint } from 'pages/ComplaintsPage/models';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { EditComplaintProps } from '../models';
import { editComplaint, getComplaint } from '../services';

export function useComplaintDetails(id?: string | number) {
  return useQuery(['complaint_details', id], () => getComplaint(id), {
    cacheTime: 60 * 10 * 1000,
    staleTime: 60 * 10 * 1000,
    enabled: !!id,
  });
}

export function useEditComplaint() {
  const queryClient = useQueryClient();

  return useMutation(editComplaint, {
    onMutate: (editedItem: EditComplaintProps) => {
      console.log(editedItem);
      // Снимок предыдущего значения
      const prevComplaintsList: Complaint[] | undefined =
        queryClient.getQueryData(['complaints_list']);
      // Возвращаем объект контекста с зафиксированным значением
      return prevComplaintsList?.length
        ? prevComplaintsList.filter((it) => it.id !== editedItem.id)
        : [];
    },
    onSuccess: (editedItem: any) => {
      // Оптимистическое обновление
      queryClient.setQueryData(
        ['complaints_list'],
        (oldComplaintsList?: Complaint[]) => {
          if (oldComplaintsList?.length) {
            return oldComplaintsList.filter((it) => it.id !== editedItem.id);
          }
          return [];
        },
      );
      console.log('Жалоба изменена ! \n', editedItem);
    },
    onError: () => {
      console.log('Ошибка изменения жалобы !');
    },
  });
}
