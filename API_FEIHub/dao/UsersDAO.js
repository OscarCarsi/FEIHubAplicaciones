const { users, Sequelize } = require ('../models');
class UsersDAO {
    static async createUserStudent (user){
        return await users.create(user);
    }
    static async createUserAcademic (user){
        return await users.create(user);
    }
    static async updateUser (username, user){
        const updatedUser = await users.update(user, { where: { username } });
        return updatedUser;
    }
    static async findUserByUsername(username) {
        return await users.findByPk(username);
    }
    static async updateProfilePhoto(username, profilePhoto){
        const updatedUser = await users.update({profilePhoto : profilePhoto}, { where: { username } });
        return updatedUser;
    }
    static async findSimilarUsersByUsername(username) {
        const Op = Sequelize.Op;
        const similarUsername = `%${username}%`;
    
        return await users.findAll({
          where: {
            username: {
              [Op.like]: similarUsername
            }
          }
        })
    }
}

module.exports = UsersDAO;