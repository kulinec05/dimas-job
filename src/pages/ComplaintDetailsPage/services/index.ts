import { Complaint } from 'pages/ComplaintsPage/models';
import { http } from 'services/http';
import { EditComplaintProps } from '../models';

export const getComplaint = async (id?: string | number) => {
  const response = await http.get<Complaint>(`complaints/${id}`);
  return response.data;
};

export const editComplaint = async ({
  id,
  adminComment,
  result,
  status,
}: EditComplaintProps) => {
  const response = await http.put<{ status: string; data: Complaint }>(
    `complaints/${id}`,
    {
      admin_comment: adminComment,
      result,
      status,
    },
  );

  return {
    ...response.data,
  } as unknown as Complaint;
};
