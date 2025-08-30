import Avatar from './avatar';
import BubbleNote from './bubble-note';
import BubbleNoteDetail from './bubble-note-detail';
const AvatarNote = ({
  className,
  isAddNote,
}: {
  className?: string;
  isAddNote?: boolean;
}) => {
  return (
    <div className='flex flex-col items-center'>
      {isAddNote ? <BubbleNoteDetail /> : <BubbleNote />}
      <Avatar className={className} />
    </div>
  );
};

export default AvatarNote;
