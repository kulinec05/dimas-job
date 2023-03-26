import { useQuery } from 'react-query';
import { NewsListProps } from '../models';
import { getNewsList, getNewsStatuses, getNewsTypes } from '../services';

export function useNewsTypes() {
  return useQuery(['complaint_types'], () => getNewsTypes(), {
    cacheTime: Infinity,
    staleTime: Infinity,
    retry: 1,
  });
}
export function useNewsStatuses() {
  return useQuery(['complaint_statuses'], () => getNewsStatuses(), {
    cacheTime: Infinity,
    staleTime: Infinity,
    retry: 1,
  });
}

export function useGetNews({ page, pageSize, filter }: NewsListProps) {
  return useQuery(
    ['news', page],
    () => getNewsList({ page, pageSize, filter }),
    {
      cacheTime: 60 * 10 * 1000, // chashed in 10 minets
      staleTime: 60 * 10 * 1000,
      keepPreviousData: true,
      retry: 1,
    },
  );
}
