import { http } from 'services/http';
import { ResponseSuggestion, SuggestionsProps } from '../models';

export const getSuggestionsList = async ({
  page = 1,
  pageSize,
}: SuggestionsProps) => {
  const response = await http.get<ResponseSuggestion>('suggestions', {
    params: {
      page,
      page_size: pageSize,
    },
  });

  return {
    ...(response.data as ResponseSuggestion),
  };
};
