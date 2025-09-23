import PhotosVideosIcon from '@/shared/components/icons/photos-videos-icon';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useCreatePost } from '../store';
const StepSelectMedia = ({
  filter,
}: {
  filter: { name: string; style: string } | null;
}) => {
  const swiperRef = React.useRef<SwiperType | null>(null);
  const setStep = useCreatePost((state) => state.setStep);
  const [files, setFiles] = React.useState<FileList | null>(null);
  const [urls, setUrls] = React.useState<string[] | []>([]);

  useEffect(() => {
    if (files && files.length > 0) {
      const newUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setUrls(newUrls);
      setStep('crop');
      return () => {
        newUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [files, setStep]);

  return (
    <div className=' lg:size-[781px] size-[473px] '>
      <div
        className={` flex  flex-col items-center w-full h-full rounded-bl-3xl rounded-br-3xl justify-center bg-[#262626] ${
          urls.length > 0 ? 'p-0' : 'p-6'
        }`}
      >
        {urls.length > 0 ? (
          <div className='relative w-full h-full '>
            <button
              type='button'
              onClick={() => swiperRef?.current?.slidePrev()}
              className='absolute p-[2px] hover:cursor-pointer  bg-[#E7E5EA] rounded-full left-4 z-20 top-[50%] -translate-y-1/2 flex items-center justify-center'
            >
              <ChevronLeftIcon className='text-black opacity-60 size-5' />
            </button>
            <Swiper
              modules={[Pagination]}
              className='w-full h-full [--swiper-pagination-color:#ffffff]              
        [--swiper-pagination-bullet-inactive-color:rgb(156,163,175)] 
        [--swiper-pagination-bullet-inactive-opacity:0.7]
        [--swiper-pagination-bullet-size:6px]
        [--swiper-pagination-bullet-horizontal-gap:6px]'
              pagination={{ clickable: true }}
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={(s) => console.log(s)}
              onSwiper={(s) => (swiperRef.current = s)}
            >
              {urls.map((url) => {
                return (
                  <SwiperSlide key={url}>
                    <img
                      src={url}
                      alt=''
                      style={{
                        filter: filter?.style,
                      }}
                      className='w-full h-full object-cover bg-no-repeat aspect-square'
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <button
              type='button'
              onClick={() => swiperRef?.current?.slideNext()}
              className='absolute hover:cursor-pointer  p-[2px]  bg-[#E7E5EA] rounded-full right-4 z-20 top-[50%] -translate-y-1/2 flex items-center justify-center'
            >
              <ChevronRightIcon className='text-black opacity-60 size-5' />
            </button>
          </div>
        ) : (
          <>
            <PhotosVideosIcon />
            <div className='mt-4'>
              <span className='text-xl'>Drag photos and videos here</span>
            </div>
            <div className='mt-6'>
              <button className='bg-[#4a5bf9] rounded-lg py-[7px] px-4 text-sm font-semibold'>
                <label htmlFor='media'>Select from computer</label>
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  type='file'
                  multiple
                  className='hidden'
                  id='media'
                />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StepSelectMedia;
