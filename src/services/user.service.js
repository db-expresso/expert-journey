import {User }from '../database/models/user';


/**
 * @description This service deals with the User model
 */
export default class UserServices {
  /**
     * @description this service creates a new user in the db
     * @param {object} user
     * @returns {object} returns the newly created user object
     */
  static async createUser(user) {
    const newUser = await new User(user)
    return newUser.save()
  }

  /**
 * @description finds a user in the db by id
 * @param {string} id the id of a user 
 * @returns {object} it returns an object if found
 */
  static async getUserById(id) {
      const user = await User.findOne({ _id: id });
      return user;
  }

    /**
 * @description finds a user in the db by email
 * @param {string} value the email of a user
 * @returns {object} it returns an object if found
 */
     static async getUserByEmail(email) {
     
        const user = await User.findOne({email });
        return user;
      }
     
}
