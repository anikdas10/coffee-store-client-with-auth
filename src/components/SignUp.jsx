import { useContext, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { AuthContext } from "../Providers/AuthProvider";


const SignUp = () => {
    const [toggle,setToggle] = useState(true);
    const {createUser} = useContext(AuthContext);

    const handleRegister = e =>{
        e.preventDefault();
         const form = new FormData(e.target);
        const name = form.get('name');
        const photo = form.get('photoUrl');
        const email = form.get('email');
        const password = form.get('password');
        const user = {name,email,photo}
        createUser(email,password)
        .then(result=>{
            console.log(result.user);

            fetch("http://localhost:5000/users",{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(user)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log("User created to db ",data);
            })
        })
        .catch(err=>{
            console.log(err.message);
        })

    }


    return (
        <div className="bg-[#e9f1fa] min-h-[90vh]">

        
        <div className="min-h-[500px] flex items-center justify-center py-24">
       
          <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
             <div className="text-center font-bold text-xl p-4">
            <h2>Register your account</h2>
             </div>
             <hr />
      <form className="card-body" onSubmit={handleRegister}>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Your Name</span>
          </label>
          <input type="text" 
          name="name"
          placeholder="Enter your Name" className="input bg-gray-100" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Photo URL</span>
          </label>
          <input type="text" 
          name="photoUrl"
          placeholder="Enter your photoURL" className="input bg-gray-100" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Email Address</span>
          </label>
          <input type="email" 
          name="email"
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
          {/* <div className="mt-4 text-red-500">
           <p>
            {err}
           </p>
          </div> */}
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[#00ABE4] text-white hover:text-black">Register</button>
        </div>
      </form>
      {/* <div className="border-t py-4 mx-9 ">
            <button onClick={handlegoogleLogin} className="btn bg-[#00ABE4] w-full text-white ">Login with Google <FaGoogle></FaGoogle></button>
            <h2 className="text-center font-semibold text-lg my-2">Already have and account? <Link to='/login' className="text-[#00ABE4]">Login.</Link></h2>
      </div> */}
    </div>
     </div>
       </div>
    );
};

export default SignUp;