type NewsSendBy = 'bot' | 'web';
type NewsTypesId = 0 | 1 | 2 | 3;
type NewsTypesName = 'OFFLINE' | 'ONLINE' | 'OTHER' | 'SALE';
type NewsTypesLabel = 'Оффлайн' | 'Онлайн' | 'Другое' | 'Точки продаж';
type NewsStatusesId = 0 | 1 | 2;
type NewsStatusesName = 'ACCEPTED' | 'REVIEW' | 'DONE';
type NewsStatusesLabel = 'Принято' | 'На рассмотрении' | 'Исполнено';

export interface Type {
  name: NewsTypesName;
  label: NewsTypesLabel;
  value: NewsTypesId;
}

export interface Status {
  name: NewsStatusesName;
  label: NewsStatusesLabel;
  value: NewsStatusesId;
}

export interface Pagination {
  current_page: number;
  total: number;
  last_page: number;
  per_page: number;
}

export interface News {
  id: number;
  title: string | null;
  text: string | null;
  image: string | null;
  is_delete: boolean;
  created_at: string;
  updated_at: string;

  // latitude: null | number;
  // longitude: null | number;
  // photo: string;
  // address: string;
  // url: null | string;
  // type: Type;
  // telegram_user_id: number;
  // admin_comment: null | string;
  // result: null | any;
  // send_by: NewsSendBy;
}

export interface ResponseNews extends Pagination {
  status: string;
  data: News[];
}

export interface FilterProps {
  value: number;
  field: string;
}

export interface NewsListProps {
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
