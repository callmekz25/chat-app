import { EditIcon, SearchIcon } from 'lucide-react';
import SearchUsersModal from './search-users.modal';
import React from 'react';

const NewInbox = () => {
  const [openSearch, setOpenSearch] = React.useState(false);
  return (
    <div className='flex items-center justify-between'>
      <h3 className='text-2xl font-bold text-[#053ADF] '>Messages</h3>
      <div className='flex items-center gap-2'>
        <button>
          <EditIcon className='size-5' />
        </button>
        <button onClick={() => setOpenSearch(true)}>
          <SearchIcon className='size-5' />
        </button>
      </div>
      {openSearch && (
        <SearchUsersModal
          open={openSearch}
          onClose={() => setOpenSearch(false)}
        />
      )}
    </div>
  );
};

export default NewInbox;
