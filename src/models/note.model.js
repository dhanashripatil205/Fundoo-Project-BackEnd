import {Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: 
    {
      type: String
    },

    description: 
    {
      type: String
    },

    archieve: 
    {
      type: Boolean,
      default:false
    },

    trash: 
    {
      type: Boolean,
      default:false
    },

    userid: 
    {
      type: String
    },

    color: 
    {
      type: String
    },
    
    
  },
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);
