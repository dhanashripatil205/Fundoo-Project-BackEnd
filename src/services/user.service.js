import User from '../models/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from '../utils/user.util';

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
  const secret_key = process.env.SECRET_KEY;

  var token = jwt.sign({ _id:data._id ,name: data.name ,email:data.email }, secret_key);
  return token;
};



//forget password
export const forgetPwd = async (body) => {
  const data = await User.findOne({ email: body.email });

  if (!data) {
    throw new Error('User does not exist in Database.');
  }

  const secret_key = process.env.SECRET_KEY1;
  const token = jwt.sign({ email: data.email, _id: data._id }, secret_key);
  data.token = token;
  await sendMail(data);
  return data;
};

// reset password
export const resetPwd = async (_id, body) => {
  if (body.password != body.confirmpassword) {
    throw new Error('password and confirm password should be same');
  }
  const hash = bcrypt.hashSync(body.password, 10); // 10 = saltRounds
  body.password = hash;
  const data = await User.findByIdAndUpdate(
    {
      _id: _id
    },
    {
       password: body.password
    },
    {
      new: true
    }
  );

  if (!data) {
    throw new Error('Failed to reset password');
  }
  return data;
};