import User from '../models/user.model';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const UserRegistration = async (userDetails) => {
  if(userDetails.password!=userDetails.confirmpassword)
  {
    throw new Error("Password should be same with confirm password.");
  }

  const data = await User.create(userDetails);
  console.log("Response from Database-------",data)
  return data;
};

//update single user
// export const updateUser = async (_id, body) => {
//   const data = await User.findByIdAndUpdate(
//     {
//       _id
//     },
//     body,
//     {
//       new: true
//     }
//   );
//   return data;
// };

// //delete single user
// export const deleteUser = async (id) => {
//   await User.findByIdAndDelete(id);
//   return '';
// };

//get single user
export const UserLogin = async (body) => {
  const data = await User.findOne({email:body.email});

  if(!data){
    throw new Error("Invalis Email ID.");
  }
  return data;
}
