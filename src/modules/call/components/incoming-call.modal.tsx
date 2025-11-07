export const IncomingCallModal = ({
  callerName,
  onAccept,
  onReject,
}: {
  callerName: string;
  onAccept: () => void;
  onReject: () => void;
}) => {
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='bg-zinc-900 text-white p-6 rounded-xl text-center'>
        <h3 className='text-lg font-semibold'>
          {callerName} đang gọi cho bạn 📞
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
    </div>
  );
};
