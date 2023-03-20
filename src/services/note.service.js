import Note from '../models/note.model';

//get all users
export const getallNotes = async () => {
  const data = await Note.find();
  return data;
};

//create new Note
export const createnewNote = async (body) => {
  const data = await Note.create(body);
  return data;
  
};

//get sinngle note

export const getnewNote = async (_id) => {
  const data = await Note.findById(_id);
  return data;
};

//update single Note
export const updateNote = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single Note
export const deleteNote = async (id) => {
  await Note.findByIdAndDelete(id);
  return '';
};


//add note in trash
export const addNoteInTrash = async (_id) => {
  const data = await Note.findOneAndUpdate(
    {
      _id
    },
    
    {
      trash: true,
    },
    {
      new:true
    });
  
   return data;
};

//Remove note from trash
export const removeNoteFromTrash = async (_id) => {
  const data = await Note.findOneAndUpdate(
    {
      _id
    },
    
    {
      trash: false,
    },
    {
      new:true
    });
  
   return data;
};



//add note in archive
export const addNoteInArchive = async (_id) => {
  const data = await Note.findOneAndUpdate(
    {
      _id
    },
    
    {
      archieve: true
    },

    {
      new:true
    });
  return data;
};

//remove note from archive
export const removeNoteFromArchive = async (_id) => {
  const data = await Note.findOneAndUpdate(
    {
      _id
    },
    
    {
      archieve: false
    },

    {
      new:true
    });
  
  return data;
};
