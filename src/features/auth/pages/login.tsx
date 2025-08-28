import Landing from '@/assets/landing.png';
import Logo from '@/assets/logo.png';
const Login = () => {
  return (
    <main className=''>
      <article className='w-full min-h-screen  items-center justify-center mt-[32px] pb-[32px] ml-auto flex flex-shrink-0'>
        <div className=''>
          <img src={Landing} alt='landing' className=' object-fill w-auto' />
        </div>
        <div className=' w-full max-w-[350px] flex flex-col justify-center items-center grow'>
          <div className='mt-[36px] mb-3'>
            <img src={Logo} alt='' className='w-auto object-cover' />
          </div>
          <div className='max-w-[350px] mt-8'>
            <form action='' className='flex flex-col gap-2'>
              <input
                type='text'
                name=''
                id=''
                placeholder='Email'
                className='w-full border border-gray-100 rounded bg-[#292828]  outline-none opacity-40 px-2 py-1.5'
              />
              <input
                type='password'
                name=''
                id=''
                placeholder='Password'
                className='w-full border border-gray-100 rounded bg-[#292828]  outline-none opacity-40 px-2 py-1.5'
              />
              <button className='py-2 px-2 flex items-center justify-center bg-[#3441AF] rounded-lg font-medium text-sm mt-2'>
                Log in
              </button>
            </form>
            <div className=''>Or</div>
            <div className=''>
              <span>Log in with Google</span>
            </div>
            <span>Forgot password?</span>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Login;
