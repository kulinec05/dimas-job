import { Projects } from 'pages/ProjectsPage/models';
import { http } from 'services/http';
import { EditProjectsProps } from '../models';

export const getProjects = async (id?: string | number) => {
  const response = await http.get<Projects>(`events/${id}`);
  return response.data;
};

export const editProjects = async ({
  id,
  title,
  text,
  result,
  is_delete,
  status,
}: EditProjectsProps) => {
  const response = await http.put<{ status: string; data: Projects }>(
    `events/${id}`,
    {
      title: title,
      text: text,
      result,
      is_delete: is_delete,
      status,
    },
  );

  return {
    ...response.data,
  } as unknown as Projects;
};

export const addProjects = async ({
  title,
  text,
  result,
  is_delete,
  status,
}: EditProjectsProps) => {
  const response = await http.post<{ status: string; data: Projects }>(
    `events`,
    {
      title: title,
      text: text,
      result,
      is_delete,
      status,
    },
  );

  return {
    ...response.data,
  } as unknown as Projects;
};
