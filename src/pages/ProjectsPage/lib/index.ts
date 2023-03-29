import { useQuery } from 'react-query';
import { ProjectsListProps } from '../models';
import {
  getProjectsList,
  getProjectsStatuses,
  getProjectsTypes,
} from '../services';

export function useProjectsTypes() {
  return useQuery(['complaint_types'], () => getProjectsTypes(), {
    cacheTime: Infinity,
    staleTime: Infinity,
    retry: 1,
  });
}
export function useProjectsStatuses() {
  return useQuery(['projects_statuses'], () => getProjectsStatuses(), {
    cacheTime: Infinity,
    staleTime: Infinity,
    retry: 1,
  });
}

export function useGetProjects({ page, pageSize, filter }: ProjectsListProps) {
  return useQuery(
    ['events', page],
    () => getProjectsList({ page, pageSize, filter }),
    {
      cacheTime: 60 * 10 * 1000, // chashed in 10 minets
      staleTime: 60 * 10 * 1000,
      keepPreviousData: true,
      retry: 1,
    },
  );
}
