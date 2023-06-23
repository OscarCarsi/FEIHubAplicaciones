const { credentials } = require ('../models');
class CredentialsDAO {
    static async createUserCredentials (userCredentials){
        return await credentials.create(userCredentials);
    }
    static async findCredentialsByUsernamePassword(username, password){
        return await credentials.findOne({ where: {username, password} });
    }
    static async updateUsername(actualUsername, usernameModified){
        const updateCredentials = await credentials.update(
          { username: usernameModified }, 
          { where: { username: actualUsername } }
        );
        return updateCredentials;
    }
    static async findExistingCredentials(email){
        return await credentials.findOne({ where: {email}});
    }
      
}
module.exports = CredentialsDAO;