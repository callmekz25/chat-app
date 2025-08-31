import CreateIcon from '@/shared/components/icons/create-icon';
import SettingIcon from '@/shared/components/icons/setting-icon';
import { Link } from 'react-router-dom';
import { useGetNote, useGetProfile } from './profile.hook';
import { useState } from 'react';
import AddNoteModal from './components/add-note.modal';
import ExistingNoteModal from './components/existing-note.modal';
import Avatar from '@/shared/components/ui/avatar';
import BubbleNote from '@/shared/components/ui/bubble-note';
import './styles/profile.module.css';
const Profile = () => {
  const { data } = useGetProfile();
  const { data: note } = useGetNote();

  const [statusNote, setStatusNote] = useState<'add' | 'existed' | 'close'>(
    'close'
  );

  return (
    <div className='pt-[30px] max-w-[935px] mx-auto px-5'>
      <div className=''>
        <header className='w-full flex flex-col '>
          <div className='flex items-center'>
            <section className='mr-[28px] flex-[0_0_30%]  flex items-center justify-center'>
              <div className=' '>
                <div className='w-full relative'>
                  <div className='flex flex-col items-center justify-end min-h-[181px]'>
                    <div
                      className=''
                      onClick={() => {
                        const value = note?.data?.note?.content
                          ? 'existed'
                          : 'add';
                        setStatusNote(value);
                      }}
                    >
                      <BubbleNote
                        value={note?.data?.note?.content ?? ''}
                        variant='compact'
                      />
                    </div>
                    <Avatar className='size-[160px]' />
                  </div>
                  {statusNote === 'existed' && (
                    <ExistingNoteModal
                      value={note?.data?.note.content ?? ''}
                      onClose={() => setStatusNote('close')}
                      onChangeStatusNote={setStatusNote}
                    />
                  )}
                </div>
              </div>
            </section>
            <div className='flex flex-col   flex-1 '>
              <section className=' w-full flex  items-center mb-4'>
                <div className='flex items-center'>
                  <div className='mr-4'>
                    <Link to={``} className='text-xl font-normal'>
                      {data?.data?.user.user_name}
                    </Link>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Link className='w-auto h-[34px] font-semibold px-4 bg-[#25292e] rounded-lg flex items-center justify-center text-sm'>
                      Edit profile
                    </Link>
                    <Link className='w-auto h-[34px] font-semibold px-4 bg-[#25292e] rounded-lg flex items-center justify-center text-sm'>
                      View archive
                    </Link>
                  </div>
                  <div className=''>
                    <div className='p-2'>
                      <SettingIcon />
                    </div>
                  </div>
                </div>
              </section>
              <section className='w-full'>
                <ul className='mb-4 flex items-center'>
                  <li className='mr-10'>
                    <div className='flex items-center gap-1 font-normal'>
                      <span className=' font-semibold'>2</span>
                      <span className=' opacity-60'>posts</span>
                    </div>
                  </li>
                  <li className='mr-10'>
                    <div className='flex items-center gap-1 font-normal'>
                      <span className=' font-semibold'>2</span>
                      <span className=' opacity-60'>followers</span>
                    </div>
                  </li>
                  <li className=''>
                    <div className='flex items-center gap-1 font-normal'>
                      <span className=' font-semibold'>2</span>
                      <span className=' opacity-60'>following</span>
                    </div>
                  </li>
                </ul>
              </section>
              <section className='w-full '>
                <div className=''>
                  <span className='text-sm font-normal'>
                    {data?.data?.user.bio}
                  </span>
                </div>
              </section>
            </div>
          </div>
          <section className='mt-10 pl-4'>
            <div className='p-[15px] w-fit cursor-pointer'>
              <div className='p-1 flex items-center justify-center size-[92px] border-[3px] border-[#363636] rounded-full'>
                <div className=' bg-[#121212] flex items-center justify-center w-full h-full rounded-full'>
                  <CreateIcon className='size-[44px] text-[#737373]' />
                </div>
              </div>
              <div className='pt-2 text-center'>
                <span className='text-[12px] font-semibold leading-4'>New</span>
              </div>
            </div>
          </section>
        </header>
      </div>
      {statusNote === 'add' && (
        <AddNoteModal
          open={statusNote === 'add'}
          onClose={() => setStatusNote('close')}
        />
      )}
    </div>
  );
};

export default Profile;
