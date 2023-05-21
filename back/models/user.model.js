import db from '../db.js'
import { getCurrentDate } from '../utils/index.js'


class User {
  static async create(name, email, age) {
    const query = 'INSERT INTO users (name, age, email, registration_date) VALUES ($1, $2, $3, $4)';
    const registration_date = getCurrentDate();
    const values = [name, age, email, registration_date];
    try {
      await db.none(query, values);      
    } catch (error) {
      throw { message: 'Error while creating user', error };
    }
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    try {
      const result = await db.one(query, id);
      return result;
    } catch (error) {
      throw new Error('Error while finding user by id');
    }
  }

  static async getAll(pageSize, pageNumber) {
    const offset = pageSize * (pageNumber - 1);
    const query = `SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2`;
    const values = [pageSize, offset]
    try {
      const result = await db.any(query, values);
      return result;
    } catch (error) {
      throw new Error('Unable to retrieve users');
    }
  }

  static async update(id, name, email, age) {
    const query = 'UPDATE users SET name = $2, email = $3, age = $4 WHERE id = $1';
    const values = [id, name, email, age];
    try {
      await db.none(query, values);
    } catch (error) {
      throw { message: 'Error while updating user', error };
    }
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1';
    try {
      await db.none('DELETE FROM orders WHERE user_id = $1', id);
      await db.none(query, id);
    } catch (error) {
      throw new Error(`Error while deleting user with ID ${id}: ${error.message}`);
    }
  }
}

export default User;