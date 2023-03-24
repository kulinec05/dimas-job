import { http, httpPublick } from 'services/http';
import {
  ComplaintsListProps,
  ResponseComplaint,
  Status,
  Type,
} from '../models';

export const getComplaintTypes = async () => {
  const response = await httpPublick.get<Type[]>('complaints/types');

  return [...response.data];
};

export const getComplaintStatuses = async () => {
  const response = await httpPublick.get<Status[]>('complaints/statuses');

  return [...response.data];
};

export const getComplaintsList = async ({
  page = 1,
  pageSize,
  filter,
}: ComplaintsListProps) => {
  const response = await http.get<ResponseComplaint>('complaints', {
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
    ...(response.data as ResponseComplaint),
  };
};
