import { SearchContext } from '@/context/search-context-provider';
import { useContext } from 'react';

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      'something went wrong trying to use SearchContext provider'
    );
  }

  return context;
};
