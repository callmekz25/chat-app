import React from 'react';

interface CallModalProps {
  mode: 'outgoing' | 'incoming' | 'in-call';
  targetName?: string;
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
}

const CallModal: React.FC<CallModalProps> = ({
  mode,
  targetName,
  onAccept,
  onReject,
  onCancel,
}) => {
  return (
    <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
      <div className='bg-zinc-900 p-6 rounded-2xl flex flex-col items-center min-w-[300px] text-white'>
        {mode === 'in-call' && (
          <>
            <video
              id='local-video'
              autoPlay
              muted
              className='w-48 h-48 rounded-lg border'
            />
            <video
              id='remote-video'
              autoPlay
              className='w-48 h-48 rounded-lg mt-2 border'
            />
          </>
        )}

        {mode === 'outgoing' && (
          <>
            <p className='text-lg font-semibold'>Đang gọi {targetName}...</p>
            <button
              onClick={onCancel}
              className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-4 rounded'
            >
              Huỷ cuộc gọi
            </button>
          </>
        )}

        {mode === 'incoming' && (
          <>
            <p className='text-lg font-semibold'>
              {targetName} đang gọi cho bạn 📞
            </p>
            <div className='flex gap-4 mt-4'>
              <button
                onClick={onAccept}
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded'
              >
                Chấp nhận
              </button>
              <button
                onClick={onReject}
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded'
              >
                Từ chối
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CallModal;
