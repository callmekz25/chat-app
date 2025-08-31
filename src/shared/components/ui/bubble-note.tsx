import { useEffect, useRef } from 'react';

type BaseProps = {
  className?: string;
  maxLength?: number;
  placeholder?: string;
  maxHeight?: number;
};

type ViewProps =
  | { variant?: 'compact' | 'detail'; value?: string; onChange?: never }
  | { variant: 'add'; value: string; onChange: (v: string) => void };

type BubbleNoteProps = BaseProps & ViewProps;

const styles = {
  compact: {
    shell: 'mb-[-24px] z-10 hover:cursor-pointer',
    row: 'min-h-[55px]',
    bubble:
      'p-2 min-h-[42px] flex items-center rounded-[14px] relative w-fit max-w-[96px] bg-[#363636]',
    text: 'min-w-[16px] max-h-[40px] line-clamp-3 text-[11px] leading-[13px] whitespace-normal break-words',
    t1: 'absolute bottom-[-3px] left-3 bg-[#363636] rounded-full size-2',
    t2: 'absolute bottom-[-7px] left-[18px] bg-[#363636] rounded-full size-[4px]',
  },
  detail: {
    shell: 'mb-[-24px] z-10 hover:cursor-pointer min-w-[160px] max-w-[230px]',
    row: 'min-w-[32px]',
    bubble:
      'relative w-fit min-h-[70px] rounded-3xl bg-[#363636] p-4 flex items-center',
    text: 'min-w-[32px] max-w-[230px] text-xl leading-6 whitespace-pre-wrap break-words',
    t1: 'absolute -bottom-2 left-8 bg-[#363636] rounded-full size-5',
    t2: 'absolute -bottom-4 left-12 bg-[#363636] rounded-full size-2',
  },
  add: {
    shell: 'mb-[-24px] z-10 min-w-[160px] max-w-[230px]',
    row: 'min-w-[32px]',
    bubble:
      'relative w-fit min-h-[70px] rounded-3xl bg-[#363636] p-4 flex items-center',

    t1: 'absolute -bottom-2 left-8 bg-[#363636] rounded-full size-5',
    t2: 'absolute -bottom-4 left-12 bg-[#363636] rounded-full size-2',
  },
} as const;

export default function BubbleNote({
  variant = 'compact',
  value,
  onChange,
  className,
  maxLength = 60,
  placeholder = 'Share a thought...',
  maxHeight = 150,
}: BubbleNoteProps) {
  const s = styles[variant as keyof typeof styles];

  // only for 'add'
  const ref = useRef<HTMLTextAreaElement>(null);
  const autoResize = () => {
    if (!ref.current) return;
    const el = ref.current;
    el.style.height = 'auto';
    const h = Math.min(el.scrollHeight, maxHeight);
    el.style.height = h + 'px';
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  };
  useEffect(() => {
    if (variant === 'add') autoResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, value]);

  const hasText = Boolean(value && value.trim());

  return (
    <div className={`${s.shell} ${className ?? ''}`}>
      <div className={`${s.row} flex items-center`}>
        <div className='relative w-fit'>
          <div className={s.bubble}>
            {variant === 'add' ? (
              <textarea
                ref={ref}
                maxLength={maxLength}
                placeholder={placeholder}
                onInput={autoResize}
                value={value as string}
                onChange={(e) => onChange?.(e.target.value)}
                rows={2}
                className='min-w-[160px] w-[160px] h-[32px] leading-6 outline-none text-xl font-normal
                           whitespace-pre-wrap break-words resize-none overflow-hidden bg-transparent'
                style={{ maxHeight }}
              />
            ) : (
              <div
                className={`${(styles as any)[variant].text} ${
                  hasText ? 'opacity-100' : 'opacity-50'
                }`}
              >
                {hasText ? value : 'Note...'}
              </div>
            )}

            <div className={s.t1} />
            <div className={s.t2} />
          </div>
        </div>
      </div>
    </div>
  );
}
