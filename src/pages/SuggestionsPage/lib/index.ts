import { useQuery } from 'react-query';
import { SuggestionsProps } from '../models';
import { getSuggestionsList } from '../services';

export function useGetSuggestions({ page, pageSize }: SuggestionsProps) {
  return useQuery(
    ['Suggestions_list', page],
    () => getSuggestionsList({ page, pageSize }),
    {
      cacheTime: 60 * 10 * 1000, // chashed in 10 minets
      staleTime: 60 * 10 * 1000,
      keepPreviousData: true,
      retry: 1,
    },
  );
}
