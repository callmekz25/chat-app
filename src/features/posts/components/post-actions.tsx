import CommentIcon from '@/shared/components/icons/comment-icon';
import HeartIcon from '@/shared/components/icons/heart-icon';
import MessageIcon from '@/shared/components/icons/message-icon';
import SaveIcon from '@/shared/components/icons/save-icon';

const PostActions = () => {
  return (
    <div className='my-2 flex justify-between'>
      <div className='flex items-center'>
        <div className='p-2 flex items-center justify-center'>
          <button>
            <HeartIcon fill={true} />
          </button>
        </div>
        <div className='p-2 flex items-center justify-center'>
          <button>
            <CommentIcon />
          </button>
        </div>
        <div className='p-2 flex items-center justify-center'>
          <button>
            <MessageIcon />
          </button>
        </div>
      </div>
      <div className='p-2 flex items-center justify-center'>
        <button>
          <SaveIcon />
        </button>
      </div>
    </div>
  );
};

export default PostActions;
