const { response } = require('express');
const crypto = require('crypto');
const credentialsDAO = require('../dao/CredentialsDAO');
const { generateJWT } = require('../helpers/create-jwt');

const hash = async (text) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return hash.digest('hex');
}
/**
 * @swagger
 * /credentials:
 *  post:
 *    summary: create new credentials to loggin
 *    tags : [Credentials]
 *    requestBody:
 *      required.true
 *    content:
 *      username:
 *        type: String
 *        description: the username user
 *      password:
 *        type: String
 *        description: the password user
 *      email:
 *        type: String
 *        description: the school email user 
 *      rol:
 *        type: String
 *        description: the rol in the system user
 *    responses:
 *      201:
 *        description: created credentials
 *      500:
 *        description: error server
 */
const credentialsCreatePost = async (req, res = response) => {
  const { username, password, email, rol } = req.body;
  const pass = await hash(password);
  try {
    const credentials = { username, password: pass, email, rol };
    const newCredentials = await credentialsDAO.createUserCredentials(credentials);
    res.status(201).json(newCredentials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}
/**
 * @swagger
 * /credentials/login:
 *  post:
 *    summary: get credentials to loggin
 *    tags : [Credentials]
 *    requestBody:
 *      required.true
 *    content:
 *      username:
 *        type: String
 *        description: the username user
 *      password:
 *        type: String
 *        description: the password user
 *    responses:
 *      200:
 *        description: obtained credentials
 *      500:
 *        description: error server
 */
const credentialsLogin = async (req, res = response) => {
  const { username, password } = req.body;
  const pass = await hash(password);
  try {
    const credentials = await credentialsDAO.findCredentialsByUsernamePassword(username, pass);
    const token = await generateJWT(credentials.username);
    res.json({
      username: credentials.username,
      rol: credentials.rol,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Verify your access credentials", error });
  }
}
/**
 * @swagger
 * /credentials/:email:
 *  get:
 *    summary: search the same email
 *    tags : [Credentials]
 *    requestParameters:
 *      required.true
 *    content:
 *      email:
 *        type: String
 *        description: the school email user 
 *    responses:
 *      200:
 *        description: find the email
 *      500:
 *        description: error server
 */
const credentialsExisting = async (req, res = response ) =>{
  const {email} = req.params;
  try{
      const credentials = await credentialsDAO.findExistingCredentials(email);
      res.json({
        email: credentials.email
      });
  }catch (error){
      console.error(error);
      res.status(404).json({message:error});
  }
}


module.exports = {
  credentialsCreatePost,
  credentialsLogin,
  credentialsExisting
};
