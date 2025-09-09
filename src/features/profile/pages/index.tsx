import CreateIcon from '@/shared/components/icons/create-icon';
import { Link, useParams } from 'react-router-dom';
import { useGetProfile } from '@/features/profile/profile.hooks';
import { useState } from 'react';
import ExistingNoteModal from '@/features/profile/components/existing-note.modal';
import Avatar from '@/shared/components/ui/avatar';
import BubbleNote from '@/shared/components/ui/bubble-note';
import '@/features/profile/styles/profile.module.css';
import AddNoteModal from '@/features/profile/components/add-note.modal';
import OwnProfileActions from '../components/own-profile-actions';
import OtherProfileActions from '../components/other-profile-actions';
import FollowersModal from '@/features/follow/components/followers.modal';
import FollowingsModal from '@/features/follow/components/followings.modal';
import Loading from '@/shared/components/ui/loading';
type ModalType =
  | 'none'
  | 'addNote'
  | 'existingNote'
  | 'followers'
  | 'followings';

const Profile = () => {
  const { user_name } = useParams();
  const { data, isLoading } = useGetProfile(user_name!);
  const user = data?.user;
  const relations = data?.relations;
  const note = data?.note;
  const isMe = data?.relations?.isMe ?? false;

  const [activeModal, setActiveModal] = useState<ModalType>('none');

  if (isLoading) {
    return <Loading />;
  }
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
                        const value = note?.content
                          ? 'existingNote'
                          : 'addNote';
                        setActiveModal(value);
                      }}
                    >
                      <BubbleNote
                        value={note?.content ?? ''}
                        variant='compact'
                      />
                    </div>
                    <Avatar className='size-[160px]' />
                  </div>
                  {activeModal === 'existingNote' && (
                    <ExistingNoteModal
                      value={note?.content ?? ''}
                      onClose={() => setActiveModal('none')}
                      onChangeStatusNote={setActiveModal}
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
                      {user?.user_name}
                    </Link>
                  </div>
                  {isMe ? (
                    <OwnProfileActions />
                  ) : (
                    <OtherProfileActions relations={relations!} />
                  )}
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
                  <li
                    className='mr-10 hover:cursor-pointer'
                    onClick={() => setActiveModal('followers')}
                  >
                    <div className='flex items-center gap-1 font-normal'>
                      <span className=' font-semibold'>
                        {user?.total_followers}
                      </span>
                      <span className=' opacity-60'>followers</span>
                    </div>
                  </li>
                  <li
                    className=' hover:cursor-pointer'
                    onClick={() => setActiveModal('followings')}
                  >
                    <div className='flex items-center gap-1 font-normal'>
                      <span className=' font-semibold'>
                        {user?.total_followings}
                      </span>
                      <span className=' opacity-60'>following</span>
                    </div>
                  </li>
                </ul>
              </section>
              <section className='w-full '>
                <div className=''>
                  <span className='text-sm font-normal'>{user?.bio}</span>
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
      {activeModal === 'addNote' && (
        <AddNoteModal
          open={activeModal === 'addNote'}
          onClose={() => setActiveModal('none')}
        />
      )}
      {activeModal === 'followers' && (
        <FollowersModal open onClose={() => setActiveModal('none')} />
      )}
      {activeModal === 'followings' && (
        <FollowingsModal open onClose={() => setActiveModal('none')} />
      )}
    </div>
  );
};

export default Profile;
