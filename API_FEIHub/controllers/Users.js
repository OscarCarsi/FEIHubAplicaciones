const {response} = require('express');
const usersDAO = require('../dao/UsersDAO');
const { use } = require('../routes/users');
/**
 * @swagger
 * /users:
 *  post:
 *    summary: create new user depending rol
 *    tags : [Users]
 *    requestBody:
 *      required.true
 *    content:
 *      username:
 *        type: String
 *        description: the username user
 *      name:
 *        type: String
 *        description: the name user
 *      paternalSurname:
 *        type: String
 *        description: the paternal surname user 
 *      maternalSurname:
 *        type: String
 *        description: the maternal surname user 
 *      schoolId:
 *        type: String
 *        description: the schoolId user 
 *      educationalProgram:
 *        type: String
 *        description: the educationalProgram user 
 *      rol:
 *        type: String
 *        description: the rol in the system user
 *    responses:
 *      201:
 *        description: created user
 *      500:
 *        description: error server
 */
const createUserPost = async (req, res = response) => {
    const { username, name, paternalSurname, maternalSurname, schoolId, educationalProgram, rol } = req.body;
  
    switch (rol) {
      case 'STUDENT':
        const userStudent = { username, name, paternalSurname, maternalSurname, schoolId, educationalProgram };
        try {
          const existingUser = await usersDAO.findUserByUsername(username);
          if (existingUser) {
            res.status(400).json({ message: 'The user already exists' });
          } else {
            const newUserStudent = await usersDAO.createUserStudent(userStudent);
            res.status(201).json(newUserStudent);
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "We were unable to create the user, try again later", error });
        }
        break;
  
      case 'ACADEMIC':
        const userAcademic = { username, name, paternalSurname, maternalSurname };
        try {
          const existingUser = await usersDAO.findUserByUsername(username);
          if (existingUser) {
            res.status(400).json({ message: 'The user already exists' });
          } else {
            const newUserAcademic = await usersDAO.createUserAcademic(userAcademic);
            res.status(201).json(newUserAcademic);
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "We were unable to create the user, try again later",error });
        }
        break;
  
      default:
        res.status(400).json({ message: 'Invalid role' });
    }
  };
/**
 * @swagger
 * /users/:username:
 *  get:
 *    summary: get user by username
 *    tags : [Users]
 *    requestParameters:
 *      required.true
 *    content:
 *      username:
 *        type: String
 *        description: the username userr
 *    responses:
 *      201:
 *        description: get user
 *      500:
 *        description: error server
 */
const userByUsernameGet = async (req, res = response ) =>{
    const {username} = req.params;
    try{
        const user = await usersDAO.findUserByUsername(username);
        res.status(200).json(user);
    }catch (error){
        console.error(error);
        res.status(500).json({message:error});
    }
}
/**
 * @swagger
 * /users/findUsers/:username:
 *  get:
 *    summary: search user by username like username send
 *    tags : [Users]
 *    requestParameters:
 *      required.true
 *    content:
 *      username:
 *        type: String
 *        description: the username userr
 *    responses:
 *      201:
 *        description: get users
 *      500:
 *        description: error server
 */
const similarUserByUsernameGet = async (req, res = response ) =>{
  const {username} = req.params;
  try{
      const users = await usersDAO.findSimilarUsersByUsername(username);
      res.status(200).json(users);
  }catch (error){
      console.error(error);
      res.status(500).json({message:error});
  }
}
/**
 * @swagger
 * /users/:username:
 *  put:
 *    summary: update user
 *    tags : [Users]
 *    requestParameters:
 *      required.true
 *    content:
 *      username:
 *        type: String
 *        description: the username user
 *    responses:
 *      201:
 *        description: get user updated
 *      500:
 *        description: error server
 */
const userUpdatePut = async (req, res = response) => {
    const {username} = req.params;
    const { name, paternalSurname, maternalSurname, profilePhoto} = req.body;
    const user = { name, paternalSurname, maternalSurname, profilePhoto };
    try {
      const updatedUser = await usersDAO.updateUser(username, user);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "There was an error updating your profile, try again later.", error });
    }
}
/**
 * @swagger
 * /users/:username:
 *  patch:
 *    summary: update user
 *    tags : [Users]
 *    requestBody:
 *      required.true
 *    content:
 *      profilePhotoLink:
 *        type: String
 *        description: the url of profile photo user
 *    responses:
 *      201:
 *        description: get user updated
 *      500:
 *        description: error server
 */
const userUpdateProfilePhotoPatch = async (req, res = response) => {
    const {username} = req.params;
    const { profilePhotoLink } = req.body;
    try {
      const updatedPhoto = await usersDAO.updateProfilePhoto(username, profilePhotoLink);
      res.status(200).json(updatedPhoto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "There was an error updating your profile picture, try again later.", error });
    }
}
module.exports = {
    createUserPost,
    userByUsernameGet,
    userUpdatePut,
    userUpdateProfilePhotoPatch,
    similarUserByUsernameGet
};

