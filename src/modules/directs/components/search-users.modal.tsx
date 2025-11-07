import { SearchIcon, XIcon } from 'lucide-react';
import BaseModal from '@/shared/components/ui/base-modal';
import { useGetUsers } from '@/modules/user/hooks/use-get-users';
import UserSkeleton from '@/shared/components/loading/user-skeleton';
import SearchUserItem from './search-user-item';
import { User } from '@/modules/user/types/user';

const SearchUsersModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { data, isLoading, isError } = useGetUsers();

  return (
    <BaseModal open={open} onClose={onClose}>
      <div className='bg-white rounded-xl px-4 py-5'>
        <div className='flex items-center justify-end'>
          <button onClick={() => onClose()}>
            <XIcon />
          </button>
        </div>
        <div className='relative mt-2'>
          <SearchIcon className='size-4.5 opacity-70  left-2.5 absolute top-[50%] -translate-y-1/2' />
          <input
            type='text'
            className=' rounded-full py-2.5 pl-8 pr-2 text-sm w-full bg-[#f0f2f5] outline-none'
            placeholder='Tìm kiếm...'
          />
        </div>
        <div className='mt-4 flex flex-col gap-2 max-h-[450px] overflow-y-auto'>
          {isLoading
            ? [...Array(10)].map((_, i) => {
                return (
                  <div className='py-2 px-2' key={i}>
                    <UserSkeleton className='size-[56px]' />
                  </div>
                );
              })
            : data &&
              data.map((item: User) => (
                <SearchUserItem key={item._id} item={item} />
              ))}
        </div>
      </div>
    </BaseModal>
  );
};

export default SearchUsersModal;
