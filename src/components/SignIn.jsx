import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProvider";


const SignIn = () => {
    const {signInUser} = useContext(AuthContext);
    const [toggle,setToggle] = useState(true);


    const handleSubmit = e =>{
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');
        console.log(email,password);
        signInUser(email,password)
        .then(result=>{
            console.log(result.user);

            // update  last login time
            const lastSignInTime = result?.user?.metadata?.lastSignInTime;
            const loginInfo = {email,lastSignInTime};
            fetch(`http://localhost:5000/users`,{
                method:'PATCH',
               headers:{
                'content-type':'application/json'
               },
               body:JSON.stringify(loginInfo)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
            })

        })
        .catch(err=>{
            console.log(err.message);
        })

    }
    return (
         <div className="bg-[#e9f1fa] min-h-[90vh]">
          
          <div className="min-h-[600px] flex items-center justify-center border mt-20">
       
          <div className="card bg-base-100 w-full max-w-sm shrink-0 py-4">
             <div className="text-center font-bold text-xl py-2">
            <h2>Login your Account</h2>
             </div>
             <hr />
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Email Address</span>
          </label>
          <input type="email" 
          name="email"
        //   onChange={(e)=>setInputEmail(e.target.value)}
          placeholder="Enter your email" className="input bg-gray-100" required />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <input type={toggle?'text':'password'} 
          name="password"
          placeholder="Enter your password" className="input bg-gray-100" required />
          <div onClick={()=>setToggle(!toggle)} className="absolute right-3 top-[51px] cursor-pointer">
           {
            toggle?<FaEyeSlash />:<FaEye />
           } 
          </div>
          {/* <label className="label">
            <Link to='/resetPassword' className="label-text-alt link link-hover mt-3 md:text-lg" state={{inputEmail}}>Forgot password?</Link>
          </label> */}
        </div>
        {/* <div>
          <p className="text-red-500">{err}</p>
        </div> */}
        <div className="form-control mt-6">
          <button className="btn bg-[#00ABE4] text-white">Login</button>
          
        </div>
      </form>

      {/* <div className="border-t py-4 mx-9 ">
            <button onClick={handlegoogleLogin} className="btn bg-[#00ABE4] w-full text-white ">Login with Google <FaGoogle/></button>
            <h2 className="text-center font-semibold text-lg my-2">Don't have and account? <Link to='/register' className="text-[#00ABE4]">Register.</Link></h2>
      </div> */}
    </div>
     </div>
        </div>
    );
};

export default SignIn;