import User from '../models/user.model';
import bcrypt from "bcrypt";


// //get all users
// export const getAllUsers = async () => {
//   const data = await User.find();
//   return data;
// };

//create new user
export const UserRegistration = async (body) => {

  const Existingemail = await User.findOne({email:body.email})

  console.log("----------------------->",Existingemail)

  if(Existingemail)
  {
    throw new Error("The Email ID already Exist.")
  }
  if(body.password != body.confirmpassword){
    throw new Error("password and confirm password should be same"); 
  }


  const hash = bcrypt.hashSync(body.password, 10);  // 10=saltRounds  
  body.password = hash;
  body.confirmpassword=hash;

  const data = await User.create(body);

  return data;
  
};

// //update single user
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

  if( !data ){
    throw new Error("Invalid email id");
  }

  if( !bcrypt.compareSync(body.password, data.password)){  
    // here data.password will be dcrypted and compared with body.password
    throw new Error("Invalid password")
  }

 
  return data;
};
