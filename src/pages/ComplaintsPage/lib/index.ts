import { useQuery } from 'react-query';
import { ComplaintsListProps } from '../models';
import {
  getComplaintsList,
  getComplaintStatuses,
  getComplaintTypes,
} from '../services';

export function useComplaintTypes() {
  return useQuery(['complaint_types'], () => getComplaintTypes(), {
    cacheTime: Infinity,
    staleTime: Infinity,
    retry: 1,
  });
}
export function useComplaintStatuses() {
  return useQuery(['complaint_statuses'], () => getComplaintStatuses(), {
    cacheTime: Infinity,
    staleTime: Infinity,
    retry: 1,
  });
}

export function useGetComplaints({
  page,
  pageSize,
  filter,
}: ComplaintsListProps) {
  return useQuery(
    ['complaints_list', page],
    () => getComplaintsList({ page, pageSize, filter }),
    {
      cacheTime: 60 * 10 * 1000, // chashed in 10 minets
      staleTime: 60 * 10 * 1000,
      keepPreviousData: true,
      retry: 1,
    },
  );
}
