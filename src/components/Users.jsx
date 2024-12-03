import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
    const loadedUsers = useLoaderData();
    const [users,setUsers] = useState(loadedUsers);
   
    const handleDelete = id =>{
        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
//    delete form the database
fetch(`http://localhost:5000/users/${id}`,{
    method:'DELETE'
})
.then(res=>res.json())
.then(data=>{
    if(data.deletedCount)
    {
        console.log(data);
        Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
    });

    const remaining = users.filter(user=> user._id !==id)
    setUsers(remaining);
    }
})
  }
});
    }

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-3xl font-bold">Users:{users.length}</h2>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Favorite Color</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map(user=><tr key={user._id}>
        <th>1</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>Blue</td>
        <td>
            <button className="btn mr-4" onClick={()=>handleDelete(user._id)}>X</button>
            <button className="btn">E</button>
        </td>
      </tr>)
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Users;