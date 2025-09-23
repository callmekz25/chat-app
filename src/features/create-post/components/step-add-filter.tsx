import React from 'react';
import { useCreatePost } from '../store';
import { FILTERS } from '../filters';
import BaseFilterImage from '@/assets/base_filter.jpg';
const StepAddFilter = ({
  filter,
  setFilter,
}: {
  filter: { name: string; style: string } | null;
  setFilter: (f: { name: string; style: string }) => void;
}) => {
  const step = useCreatePost((state) => state.step);
  return (
    <div
      className={` bg-[#262626]  transition-all duration-300 ${
        step === 'edit' ? 'w-[340px] opacity-100' : ' w-0 opacity-0 '
      }`}
    >
      <div className=''>
        <div className='flex items-center'>
          <div className='py-3.5 w-full text-center'>Filters</div>
          <div className='py-3.5 w-full text-center'>Adjustments</div>
        </div>
        <div className='m-2 flex items-center flex-wrap'>
          {step === 'edit' &&
            FILTERS.map((f) => {
              return (
                <div
                  onClick={() => setFilter(f)}
                  key={f.name}
                  className='mt-4 hover:cursor-pointer '
                >
                  <div className='mx-2 mb-2'>
                    <img
                      src={BaseFilterImage}
                      alt=''
                      className='size-[88px] aspect-square object-cover rounded'
                    />
                  </div>
                  <div
                    className={`text-[12px] opacity-60 text-center ${
                      filter?.name === f.name ? 'text-blue-600 font-medium' : ''
                    }`}
                  >
                    {f.name}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default StepAddFilter;
