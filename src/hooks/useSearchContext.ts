import { useContext } from 'react';

import { SearchContext } from '@/context/search-context-provider';

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      'something went wrong trying to use SearchContext provider'
    );
  }

  return context;
};
