import React from 'react';
import { CallState } from '../hooks/use-call-events';

type CallModalProps = {
  mode: 'outgoing' | 'incoming' | 'in-call' | 'hidden';
  call?: CallState;
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;

  // Add ref props
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
};

const CallModal: React.FC<CallModalProps> = ({
  mode,
  call,
  onCancel,
  onAccept,
  onReject,
  localVideoRef,
  remoteVideoRef,
}) => {
  return (
    <div
      className={
        mode === 'hidden'
          ? 'hidden'
          : 'fixed inset-0 bg-black/70 flex items-center justify-center z-50'
      }
    >
      <div className='bg-zinc-900 p-6 rounded-2xl flex flex-col items-center min-w-[300px] text-white'>
        {(mode === 'outgoing' || mode === 'incoming' || mode === 'in-call') && (
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className='w-48 h-48 rounded-lg border'
          />
        )}

        {(mode === 'in-call' || (mode === 'outgoing' && call?.isCalling)) && (
          <video
            ref={remoteVideoRef}
            autoPlay
            className='w-48 h-48 rounded-lg mt-2 border'
          />
        )}

        {mode === 'incoming' && (
          <div className='bg-zinc-900 text-white p-6 rounded-xl text-center'>
            <h3 className='text-lg font-semibold'>
              {call?.caller?.name} đang gọi cho bạn
            </h3>
            <div className='flex justify-center gap-4 mt-4'>
              <button
                onClick={onAccept}
                className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded'
              >
                Chấp nhận
              </button>
              <button
                onClick={onReject}
                className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded'
              >
                Từ chối
              </button>
            </div>
          </div>
        )}

        {mode === 'outgoing' && (
          <>
            <p className='text-lg font-semibold'>
              Đang gọi {call?.callee?.name}...
            </p>
            <button
              onClick={onCancel}
              className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-4 rounded'
            >
              Huỷ cuộc gọi
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CallModal;
