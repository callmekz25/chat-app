import StoryItem from './story-item';

const StoryList = () => {
  return (
    <div className='py-2 px-[9px] flex items-center gap-4'>
      <StoryItem />
      <StoryItem />
      <StoryItem />
    </div>
  );
};

export default StoryList;
