import { ChevronLeftIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import SearchResults from './search-results';

const SearchUsers = () => {
  const [focusSearch, setFocusSearch] = useState(false);

  return (
    <div className=' w-full'>
      <div
        className={`flex flex-1 items-center  min-h-[40px]  ${
          focusSearch ? '' : 'rounded-lg bg-white/10'
        }`}
      >
        <div className='min-w-[35px] min-h-[40px] flex items-center h-full justify-end  '>
          {focusSearch ? (
            <ChevronLeftIcon
              onClick={() => setFocusSearch(false)}
              className='size-10 hover:cursor-pointer'
            />
          ) : (
            <SearchIcon
              onClick={() => setFocusSearch(true)}
              className=' opacity-50 size-4.5 '
            />
          )}
        </div>
      </div>

      {focusSearch && <SearchResults />}
    </div>
  );
};

export default SearchUsers;
