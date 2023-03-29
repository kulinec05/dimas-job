import { http, httpPublick } from 'services/http';
import { ProjectsListProps, ResponseProjects, Status, Type } from '../models';

export const getProjectsTypes = async () => {
  const response = await httpPublick.get<Type[]>('complaints/types');

  return [...response.data];
};

export const getProjectsStatuses = async () => {
  const response = await httpPublick.get<Status[]>('events/statuses');

  return [...response.data];
};

export const getProjectsList = async ({
  page = 1,
  pageSize,
  filter,
}: ProjectsListProps) => {
  const response = await http.get<ResponseProjects>('events', {
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

  return {
    ...(response.data as ResponseProjects),
  };
};
