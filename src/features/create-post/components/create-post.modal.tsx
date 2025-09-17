import BaseModal from '@/shared/components/ui/base-modal';
import StepSelectMedia from './step-select-media';
import { useCreatePost } from '../store';
import { ArrowLeftIcon } from 'lucide-react';
import StepAddFilter from './step-add-filter';
import { Step } from '../types/step';
import React, { useEffect } from 'react';

const CreatePostModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const step = useCreatePost((state) => state.step);
  const setStep = useCreatePost((state) => state.setStep);
  const steps = ['select', 'crop', 'edit', 'details'];
  const reset = useCreatePost((state) => state.reset);
  const [selectFilter, setSelectFilter] = React.useState<{
    name: string;
    style: string;
  } | null>(null);
  const handleNext = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1] as Step);
    }
  };
  const handleBack = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex !== 0) {
      setStep(steps[currentIndex - 1] as Step);
    }
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <BaseModal open={open} onClose={onClose}>
      <div className='flex flex-col'>
        <div className='m-5'>
          <div className=' rounded-3xl overflow-hidden max-h-[898px]   min-w-[348px] min-h-[391px]  flex flex-col transition-all duration-500 '>
            <div className='bg-black py-1  flex items-center justify-between'>
              <div className=''>
                {step !== 'select' && (
                  <div className='p-2' onClick={() => handleBack()}>
                    <ArrowLeftIcon className='size-6' />
                  </div>
                )}
              </div>
              <span className='text-[16px] font-semibold leading-6'>
                {step === 'select' || step === 'details'
                  ? 'Create new Post'
                  : step}
              </span>
              <div className=''>
                {step !== 'select' && (
                  <div className='p-2' onClick={() => handleNext()}>
                    <span className='  text-[#85a1ff] text-sm font-semibold'>
                      Next
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-1'>
              <StepSelectMedia filter={selectFilter} />
              <StepAddFilter
                filter={selectFilter}
                setFilter={setSelectFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default CreatePostModal;
