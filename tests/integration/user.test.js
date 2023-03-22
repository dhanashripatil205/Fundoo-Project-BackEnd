import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';
import HttpStatus from 'http-status-codes';

let authToken;
let notesId;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  //User registration

  describe('POST /users', () => {

    const user = {
      "name": "Dhanashri",
      "lastname": "Patil",
      "email" : "dhanashri@gmail.com",
      "password": "Dhanu@1235",
      "confirmpassword": "Dhanu@1235"
    }
    it('Given valid user details it should return created', (done) => {
      
      request(app)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });

  //user login

  describe('GET /users/', () => {
    const user = {
      "email" : "dhanashri@gmail.com",
      "password": "Dhanu@1235",
    };
    
    it('Given valid User Login details it should return 200', (done) => {
      
      request(app)
        .get('/api/v1/users/')
        .send(user)
        .end((err, res) => {
          //token = res.body.userToken
          authToken = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

// //get All Notes

describe('GET /notes/', () => {
    it('Get all notes and it should return 200', (done) => {
      request(app)
        .get('/api/v1/notes/')
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
       
        });
    });
  });

// //Create Single Note

  describe('POST /notes', () => {
    const note = {
      "title":" Frontend Developer",
      "description":"Frontend Developer using .net",
    };
    it('Given note details should return 201 & Create a note', (done) => {
      request(app)
        .post('/api/v1/notes')
        .set("Authorization", `Bearer ${authToken}`)
        .send(note)
        .end((err, res) => {
          notesId = res.body.data._id
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });

// //Get single Note By ID

  describe('GET /notes/:_id', () => {
    it('Get single note using id should return 200', (done) => {
      request(app)
        .get(`/api/v1/notes/${notesId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
//Update Single Note by ID


  describe('PUT /notes/:_id', () => {
    const note = {
      "title" : "This is updated title",
      "description":"Updated Description"
    }
    it('Update the note', (done) => {
      request(app)
        .put(`/api/v1/notes/${notesId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
  });

//Update Trash status from false to true

  describe('PUT /notes/:_id/addNoteInTrash', () => {
    it('Note is added to trash & it should return 200', (done) => {
      request(app)
        .put(`/api/v1/notes/${notesId}/addNoteInTrash`)
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          expect(res.body.data.trash).to.be.equal(true)
          console.log(res.body.data.trash)
          done();
        });
    });
  });

//Update Trash status from True to False

  describe('PUT /notes/:_id/removeNoteFromTrash', () => {
    it('Note is removed from trash & it should return 200 and update the record', (done) => {
      request(app)
        .put(`/api/v1/notes/${notesId}/removeNoteFromTrash`)
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          expect(res.body.data.trash).to.be.equal(false)
          console.log(res.body.data.trash)
          done();
        });
    });
  });

 //Update Archive status from false to true

  describe('PUT /notes/:_id/addNoteInArchive', () => {
    it('should return 200 and update the record', (done) => {
      request(app)
        .put(`/api/v1/notes/${notesId}/addNoteInArchive`)
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          expect(res.body.data.archieve).to.be.equal(true)
          done();
        });
    });
  });

//Update Archive status from True to False

  describe('PUT /notes/:_id/removeNoteFromArchive', () => {
    it('recover note from archive & it should return 200 and update the record', (done) => {
      request(app)
        .put(`/api/v1/notes/${notesId}/removeNoteFromArchive`)
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          expect(res.body.data.archieve).to.be.equal(false)
          done();
        });
    });
  });

//Delete Single Note by ID

//   describe(`DELETE /notes/:_id`, () => {
//     it('Delete note from database and it should return 200', (done) => {
//       request(app)
//         .delete(`/api/v1/notes/${notesId}`)
//         .set("Authorization", `Bearer ${authToken}`)
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(HttpStatus.OK);
//           done();
//         });
//     });
//   });


});
