import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String
    },

    lastname: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },

    confirmpassword: {
      type: String
    }
   
  },

  {
    timestamps: true
  }
);

export default model('User', userSchema);
