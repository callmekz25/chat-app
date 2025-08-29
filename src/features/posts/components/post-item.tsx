import {
  EllipsisIcon,
  DotIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import PostActions from './post-actions';
const PostItem = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className='w-[470px]'>
      <div className='flex items-center justify-between pb-3'>
        <div className='flex items-center   text-sm font-semibold'>
          <div className='mr-3'>
            <img src='' alt='' />
          </div>
          <span>v_nguyen04</span>
          <DotIcon className='font-normal opacity-50' />
          <span className='font-normal opacity-50'>1d</span>
        </div>
        <button>
          <EllipsisIcon />
        </button>
      </div>
      <div className='relative'>
        <button
          type='button'
          onClick={() => swiperRef?.current?.slidePrev()}
          className='absolute p-[2px] hover:cursor-pointer  bg-[#E7E5EA] rounded-full left-4 z-20 top-[50%] -translate-y-1/2 flex items-center justify-center'
        >
          <ChevronLeftIcon className='text-black opacity-60 size-5' />
        </button>
        <Swiper
          modules={[Pagination]}
          className='w-full [--swiper-pagination-color:#ffffff]              
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
          <SwiperSlide>
            <img
              src='https://images.unsplash.com/photo-1756260897483-7cfc313b7534?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt=''
              className='w-full  object-cover aspect-square'
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src='https://plus.unsplash.com/premium_photo-1756298027388-05fcfc5e8169?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt=''
              className='w-full  object-cover aspect-square'
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src='https://images.unsplash.com/photo-1756370473190-4c41ddbd5e59?q=80&w=692&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt=''
              className='w-full  object-fit aspect-square'
            />
          </SwiperSlide>
        </Swiper>
        <button
          type='button'
          onClick={() => swiperRef?.current?.slideNext()}
          className='absolute hover:cursor-pointer  p-[2px]  bg-[#E7E5EA] rounded-full right-4 z-20 top-[50%] -translate-y-1/2 flex items-center justify-center'
        >
          <ChevronRightIcon className='text-black opacity-60 size-5' />
        </button>
      </div>
      <div className=''>
        <PostActions />
        <section>
          <div className='text-sm font-semibold'>1,203,115 likes</div>
        </section>
        <div className='mt-2'>
          <div className='flex items-start text-sm'>
            <p className='text-sm leading-6 font-normal'>
              <span className='font-semibold'>myphwn_</span>
              &nbsp;Mỗi năm chúng mình phấn đấu đi du lịch với nhau, một lần
              hoặc nhiều lần 😁 (mơ). Thường thì mình hay thích nơi náo nhiệt
              chút, đợt này thì không hiểu sao chọn Măng Đen.
            </p>
          </div>
        </div>
        <div className='mt-2'>
          <span className=' text-sm text-[#A8A8A8]'>View all 15 comments</span>
        </div>
        <div className='mt-2 border-b pb-3 border-gray-800'>
          <textarea
            autoComplete='off'
            name=''
            className='w-full text-sm font-normal resize-none h-[18px] max-h-[80px] outline-none'
            placeholder='Add a comment...'
            id=''
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
