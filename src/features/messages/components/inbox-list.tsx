import InboxItem from './inbox-item';

const InboxList = () => {
  return (
    <div className=' h-full min-h-0 flex flex-col'>
      <div className='pt-[14px] pb-2.5 flex items-center justify-between px-6'>
        <span className='font-bold leading-5'>Messages</span>
      </div>
      <div className=' overflow-y-auto flex-1 min-h-0'>
        <InboxItem />
        <InboxItem />
        <InboxItem />
        <InboxItem />
        <InboxItem />
        <InboxItem />
        <InboxItem />
        <InboxItem />
        <InboxItem />
        <InboxItem />
      </div>
    </div>
  );
};

export default InboxList;
