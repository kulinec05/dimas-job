type ProjectsSendBy = 'bot' | 'web';
type ProjectsTypesId = 0 | 1 | 2 | 3;
type ProjectsTypesName = 'OFFLINE' | 'ONLINE' | 'OTHER' | 'SALE';
type ProjectsTypesLabel = 'Оффлайн' | 'Онлайн' | 'Другое' | 'Точки продаж';
type ProjectsStatusesId = 0 | 1 | 2;
type ProjectsStatusesName = 'ACCEPTED' | 'REVIEW' | 'DONE';
type ProjectsStatusesLabel = 'Принято' | 'На рассмотрении' | 'Исполнено';

export interface Type {
  name: ProjectsTypesName;
  label: ProjectsTypesLabel;
  value: ProjectsTypesId;
}

export interface Status {
  name: ProjectsStatusesName;
  label: ProjectsStatusesLabel;
  value: ProjectsStatusesId;
}

export interface Pagination {
  current_page: number;
  total: number;
  last_page: number;
  per_page: number;
}

export interface Projects {
  id: number;
  title: string | null;
  text: string | null;
  image: string | null;
  is_delete: boolean;
  created_at: string;
  updated_at: string;
  status?: {
    value: number;
    label: string;
  };
}

export interface ResponseProjects extends Pagination {
  status: string;
  data: Projects[];
}

export interface FilterProps {
  value: number;
  field: string;
}

export interface ProjectsListProps {
  page: number;
  pageSize: number;
  filter?: FilterProps[];
}

export interface FormFields {
  status?: {
    value: number;
    label: string;
  };
  type?: {
    value: number;
    label: string;
  };
  dateTime?: {
    [key: string]: Date | string;
    $d: Date | string;
  };
}
