type StoryItemProps = {
  img: string;
  username: string;
  isViewed?: boolean;
};
const StoryItem = ({ img, username, isViewed }: StoryItemProps) => {
  return (
    <div className='flex flex-col items-center  cursor-pointer'>
      <div
        className={`p-[3px] rounded-full  ${
          isViewed
            ? 'bg-gray-300' // story đã xem -> viền xám
            : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'
        }`}
      >
        <div className='bg-black rounded-full p-[2px] '>
          <img
            src={img}
            alt={username}
            className='size-[75px] rounded-full object-cover'
          />
        </div>
      </div>
      <span className='text-xs text-white max-w-[70px] mt-1 block truncate w-full text-center'>
        {username ?? 'Test Userdsssssssssssss'}
      </span>
    </div>
  );
};

export default StoryItem;
