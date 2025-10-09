import Landing from '@/assets/landing.png';
import Logo from '@/assets/logo.png';
import { useForm } from 'react-hook-form';
import { LoginPayload } from '../types/login-payload';
import { useLogin } from '../auth.hooks';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();
  const { mutate: login, isPending } = useLogin();
  const handleLogin = (payload: LoginPayload) => {
    login(payload, {
      onSuccess: (data) => {
        if (data) {
          localStorage.setItem('accessToken', data.data!.accessToken);
          navigate('/', { replace: true });
        }
      },
      onError: (error) => alert(error),
    });
  };
  return (
    <main className=''>
      <article className='w-full min-h-screen  items-center justify-center mt-[32px] pb-[32px] ml-auto flex flex-shrink-0'>
        <div className=''>
          <img src={Landing} alt='landing' className=' object-fill w-auto' />
        </div>
        <div className=' w-[350px] max-w-[350px] flex flex-col justify-center items-center grow'>
          <div className='mt-[36px] mb-3'>
            <img src={Logo} alt='' className='w-auto object-cover' />
          </div>
          <div className=' mt-8 w-full'>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className='flex flex-col gap-2'
            >
              <div className='mb-[6px] mx-[40px]'>
                <input
                  type='text'
                  id='email'
                  placeholder='Email'
                  {...register('email', { required: true })}
                  className='w-full border  border-gray-700 rounded bg-white/10  outline-none  px-2 py-1.5  '
                />
              </div>
              <div className='mb-[6px] mx-[40px]'>
                <input
                  type='password'
                  id='password'
                  placeholder='Password'
                  {...register('password', { required: true })}
                  className='w-full border border-gray-700 rounded bg-white/10  outline-none  px-2 py-1.5 '
                />
              </div>
              <div className='flex items-center mx-[40px] my-2  justify-center'>
                <button className='py-2.5 hover:cursor-pointer px-2 flex items-center justify-center bg-[#3441AF] rounded-lg font-medium text-sm  w-full '>
                  Log in
                </button>
              </div>
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
