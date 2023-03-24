type ComplaintSendBy = 'bot' | 'web';
type ComplaintTypesId = 0 | 1 | 2 | 3;
type ComplaintTypesName = 'OFFLINE' | 'ONLINE' | 'OTHER' | 'SALE';
type ComplaintTypesLabel = 'Оффлайн' | 'Онлайн' | 'Другое' | 'Точки продаж';
type ComplaintStatusesId = 0 | 1 | 2;
type ComplaintStatusesName = 'ACCEPTED' | 'REVIEW' | 'DONE';
type ComplaintStatusesLabel = 'Принято' | 'На рассмотрении' | 'Исполнено';

export interface Type {
  name: ComplaintTypesName;
  label: ComplaintTypesLabel;
  value: ComplaintTypesId;
}

export interface Status {
  name: ComplaintStatusesName;
  label: ComplaintStatusesLabel;
  value: ComplaintStatusesId;
}

export interface Pagination {
  current_page: number;
  total: number;
  last_page: number;
  per_page: number;
}

export interface Complaint {
  id: number;
  comment: string | null;
  latitude: null | number;
  longitude: null | number;
  photo: string;
  address: string;
  url: null | string;
  type: Type;
  telegram_user_id: number;
  status: Status;
  admin_comment: null | string;
  result: null | any;
  send_by: ComplaintSendBy;
  created_at: '2023-02-23T09:04:55.000000Z';
  updated_at: '2023-02-23T09:04:55.000000Z';
}

export interface ResponseComplaint extends Pagination {
  status: string;
  data: Complaint[];
}

export interface FilterProps {
  value: number;
  field: string;
}

export interface ComplaintsListProps {
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
