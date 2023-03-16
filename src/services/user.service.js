import User from '../models/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//create new user
export const userRegistration = async (body) => {

  const Existingemail = await User.findOne({email:body.email})

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

//get single user
export const userLogin = async (body) => {
  const data = await User.findOne({email:body.email});

  if( !data ){
    throw new Error("Invalid email id");
  }

  if( !bcrypt.compareSync(body.password, data.password)){  
    // here data.password will be dcrypted and compared with body.password
    throw new Error("Invalid password")
  }
 
  var token = jwt.sign({ _id:data._id ,name: data.name ,email:data.email }, 'SecretKeyyyyy');
  return token;
};
