import clsx from 'clsx';

const Avatar = ({ className }: { className?: string }) => {
  return (
    <div className={clsx('size-[56px] select-none', className)}>
      <img
        src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt=''
        className=' aspect-square object-cover w-full rounded-full'
      />
    </div>
  );
};

export default Avatar;
