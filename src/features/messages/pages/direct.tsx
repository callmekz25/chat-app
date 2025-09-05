import { Link, useParams } from 'react-router-dom';
import { useGetDirectById } from '../direct.hook';
import EmojiIcon from '@/shared/components/icons/emoji-icon';
import VoiceIcon from '@/shared/components/icons/voice-icon';
import StickerIcon from '@/shared/components/icons/sticker-icon';
import ImageIcon from '@/shared/components/icons/image-icon';
import CallIcon from '@/shared/components/icons/call-icon';
import CallVideoIcon from '@/shared/components/icons/call-video-icon';
import InformationIcon from '@/shared/components/icons/information-icon';
import Avatar from '@/shared/components/ui/avatar';
import UserSkeleton from '@/shared/components/loading/user-skeleton';
import { Loader2Icon } from 'lucide-react';

const Direct = () => {
  const { conversation_id } = useParams();
  const { data, isLoading, isError } = useGetDirectById(conversation_id!);

  return (
    <div className='h-dvh flex flex-col min-h-0'>
      <div className='p-4 border-b border-gray-700'>
        <div className='min-h-[44px]'>
          {isLoading ? (
            <UserSkeleton />
          ) : (
            <div className='flex items-center  justify-between'>
              <Link to={`/${data?.direct.user_name}`} className=''>
                <div className='mr-2'>
                  <div className=' flex '>
                    <Avatar className=' mr-3 size-[44px]' />
                    <div className='flex flex-col'>
                      <div className=''>
                        <span className='leading-5 line-clamp-1 whitespace-nowrap break-words font-semibold'>
                          {data?.direct.name}
                        </span>
                      </div>
                      <span className='leading-4 font-normal text-[12px] break-words opacity-60'>
                        {data?.direct?.user_name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className='flex items-center'>
                <div className='p-2'>
                  <CallIcon />
                </div>
                <div className='p-2'>
                  <CallVideoIcon />
                </div>
                <div className='p-2'>
                  <InformationIcon />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <main className='flex-1 min-h-0 overflow-y-auto'>
        {isLoading ? (
          <div className='flex items-center justify-center mt-2'>
            <Loader2Icon className=' animate-spin size-8 text-gray-400' />
          </div>
        ) : (
          <div className='mt-5'>
            <div className='flex flex-col items-center'>
              <div className='py-4'>
                <Avatar className='size-[96px]' />
              </div>
              <div className=' text-center'>
                <span className='leading-6 font-semibold text-xl'>
                  {data?.direct.name}
                </span>
              </div>
              <div className=''>
                <span className='leading-[18px] text-sm font-normal opacity-60'>
                  {data?.direct.user_name}
                </span>
              </div>
              <div className='py-6'>
                <Link
                  to={`/${data?.direct.user_name}`}
                  className=' hover:opacity-90 flex items-center justify-center font-semibold text-sm rounded-lg border border-[#2b3036] h-[32px] px-4 bg-[#2b3036]'
                >
                  View profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <div className=''>
        <div className='m-4'>
          <div className='min-h-[44px] pr-4 pl-[11px] rounded-full border border-gray-700 flex items-center'>
            <div className='p-1'>
              <EmojiIcon />
            </div>
            <div className='flex-1 ml-2 mr-1'>
              <input
                type='text'
                className='w-full outline-none text-[15px]'
                placeholder='Message...'
              />
            </div>
            <div className='flex items-center'>
              <div className='p-2'>
                <VoiceIcon />
              </div>
              <div className='p-1'>
                <ImageIcon />
              </div>
              <div className='p-2'>
                <StickerIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Direct;
