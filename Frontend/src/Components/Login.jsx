// import React, { useState } from 'react';
// import { Link,useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios'

// const Login = () => {
//     const navigate = useNavigate()
//     // const [logformData,setlogformData] = useState({
//     //     email:'',
//     //     password:''
//     // })
//     const {register,handleSubmit,formState:errors,reset} = useForm();
//     const [loading,setLoading] = useState(false)
//     const onSubmit = async (data)=>{
//             // setlogformData(data);
//              setLoading(true)
//             try {
//               const response =  await axios.post('http://localhost:3000/api/login',data);
//                 if(response.status===200)
//                 {
//                     alert('login successfully done');
//                     navigate('/home')
                    
//                 }
//             } catch (error) {
//                 if(error.response)
//                 {
//                     if(error.response.status===400)
//                     {
//                         alert('user is not exist')
//                     }
//                     else{
//                         alert('error occur')
//                     }
//                 }
//                 else{
//                     alert('network down')
//                 }
//             }
//             finally
//             {
//                   reset()
//                   setLoading(false)
//             }
//     }

        
   
//       return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
//         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               name="email"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               {...register('email',{required:'enter the email'})}
//             />
//               {errors.email && (
//           <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
//         )}
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               name="password"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                {...register('password',{required:'enter the password must'})}

//             />
//                 {errors.password && (
//           <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
//         )}
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//           {loading?'Loging':'Login'}
        
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-sm text-gray-600">
//             Don't have an account?{' '}
    
//               <Link to='/'>Sign Up</Link>
           
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/login', data);
      if (response.status === 200) {
        alert('Login successfully done');
        navigate('/home');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert('User does not exist');
        } else {
          alert('An error occurred');
        }
      } else {
        alert('Network is down');
      }
    } finally {
      reset();
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...register('email', { required: 'Enter the email' })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...register('password', { required: 'Enter the password must' })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? 'Logging...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/" className="text-indigo-500 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
