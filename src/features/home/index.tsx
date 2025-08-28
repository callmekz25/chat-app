import PostItem from '../posts/components/post-item';
import StoryList from './components/story-list';

const Home = () => {
  return (
    <div className='w-full flex justify-center px-6 lg:px-10 '>
      <div className='w-full max-w-[630px]'>
        <div className='mt-4'>
          <div className='mb-6'>
            <StoryList />
          </div>
          <div className='flex justify-center'>
            <PostItem />
          </div>
        </div>
      </div>
      <div className='w-[320px] h-[100vh] pl-[64px]'></div>
    </div>
  );
};
export default Home;
