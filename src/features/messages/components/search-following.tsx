import { SearchIcon } from 'lucide-react';

const SearchFollowing = () => {
  return (
    <div className='w-full flex flex-1 items-center relative'>
      <SearchIcon className=' absolute left-3 top-[50%] opacity-50 -translate-y-1/2 size-5' />
      <input
        type='text'
        placeholder='Search'
        autoComplete='off'
        className='w-full py-2 pl-10 pr-2 bg-white/10 outline-none rounded-lg'
      />
    </div>
  );
};

export default SearchFollowing;
