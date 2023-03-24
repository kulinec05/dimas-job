import { Pagination } from 'models';

export interface Suggestion {
  id: number;
  comment: string | null;
  photo: string;
  created_at: '2023-02-23T09:04:55.000000Z';
  updated_at: '2023-02-23T09:04:55.000000Z';
}

export interface ResponseSuggestion extends Pagination {
  status: string;
  data: Suggestion[];
}

export interface SuggestionsProps {
  page: number;
  pageSize: number;
}
