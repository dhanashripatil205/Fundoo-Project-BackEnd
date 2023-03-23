import Note from '../models/note.model';

//get all users
export const getallNotes = async (body) => {
  const data = await Note.find({ userId: body });
  return data;
};

//create new Note
export const createnewNote = async (body) => {
  const data = await Note.create(body);
  return data;
};

//get sinngle note

export const getnewNote = async (id, userId) => {
  const data = await Note.findOne({ _id: id, userId: userId });
  return data;
};

//update single Note
export const updateNote = async (_id, body) => {
  const data = await Note.findOneAndUpdate(
    {
      _id: _id,
      userId: body.userId
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single Note
export const deleteNote = async (id, userId) => {
  await Note.findByIdAndDelete({ _id: id, userId: userId });
  return '';
};

//add note In trash
export const addNoteInTrash = async (_id, userId) => {
  const data = await Note.findOneAndUpdate(
    {
      _id: _id,
      userId: userId
    },

    {
      trash:true
    },
    
    {
      new: true
    }
  );

  return data;
};

//Remove note from trash
export const removeNoteFromTrash = async (_id, userId) => {
  const data = await Note.findOneAndUpdate(
    {
      _id: _id,
      userId: userId
    },

    {
      trash:false
    },

    {
      new: true
    }
  );

  return data;
};

//add note In archive
export const addNoteInArchive = async (_id, userId) => {
  const data = await Note.findOneAndUpdate(
    {
      _id: _id,
      userId: userId
    },

    {
      archieve:true
    },
    {
      new: true
    }
  );
  return data;
};

//Remove note from archive
export const removeNoteFromArchive = async (_id, userId) => {
  const data = await Note.findOneAndUpdate(
    {
      _id: _id,
      userId: userId
    },

    {
      archieve:false
    },
    {
      new: true
    }
  );

  return data;
};


