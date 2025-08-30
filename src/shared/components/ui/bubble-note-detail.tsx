import { useRef } from 'react';

const BubbleNoteDetail = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const MAX_H = 150;

  const autoResize = () => {
    const el = ref.current!;
    el.style.height = 'auto';
    const h = Math.min(el.scrollHeight, MAX_H);
    el.style.height = h + 'px';
    el.style.overflowY = el.scrollHeight > MAX_H ? 'auto' : 'hidden';
  };

  return (
    <div className='mb-[-24px] z-10 min-w-[160px] max-w-[230px]'>
      <div className='min-w-[32px] flex items-center'>
        <div className='relative w-fit min-h-[70px] rounded-3xl bg-[#363636] p-4 flex items-center'>
          <textarea
            ref={ref}
            maxLength={60}
            placeholder='Share a thought...'
            onInput={autoResize}
            rows={2}
            className='min-w-[160px] w-[160px] h-[32px] leading-6   outline-none text-xl  font-normal
                       whitespace-pre-wrap break-words resize-none overflow-hidden'
            style={{ maxHeight: MAX_H }}
          />

          <div className='absolute -bottom-2 left-8 bg-[#363636] rounded-full size-5' />
          <div className='absolute -bottom-4 left-12 bg-[#363636] rounded-full size-2' />
        </div>
      </div>
    </div>
  );
};

export default BubbleNoteDetail;
