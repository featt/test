import db from '../db.js'


class Order {
    static async create(userId, productName, quantity) {
      const query = 'INSERT INTO orders (user_id, product_name, quantity, order_date) VALUES ($1, $2, $3, NOW())';
      const values = [userId, productName, quantity];
      try {
        await db.none(query, values);        
      } catch (error) {
        throw { message: 'Error while creating order', error };
      }
    }
    static async findByUserId(userId) {
      const query = 'SELECT * FROM orders WHERE user_id = $1';
      try {
          const result = await db.any(query, userId);
          return result;
      } catch (error) {
          throw { message: 'Error while finding orders by user id', error };
      }
    }
  
    static async findById(id) {
      const query = 'SELECT * FROM orders WHERE id = $1';
      try {
        const result = await db.one(query, id);
        return result;
      } catch (error) {
        throw new Error('Error while finding order by id');
      }
    }
  
    static async getAll(pageSize, pageNumber) {
      const offset = pageSize * (pageNumber - 1);
      const query = `SELECT * FROM orders ORDER BY id LIMIT $1 OFFSET $2`;
      const values = [pageSize, offset]
      try {
        const result = await db.any(query, values);
        return result;
      } catch (error) {
        throw { message: 'empty orders table', error };
      }
    }
  
    static async update(id, product_name, quantity) {
      const query = 'UPDATE orders SET product_name = $2, quantity = $3 WHERE id = $1';
      const values = [id, product_name, quantity];
      try {
        await db.none(query, values);
      } catch (error) {
        throw { message: 'Error while updating order', error };
      }
    }
  
    static async delete(id) {
      const query = 'DELETE FROM orders WHERE id = $1';
      const values = [id];
      try {
        await db.none(query, values);
      } catch (error) {
        throw { message: 'Error while deleting order', error };      
      }
    }
}

export default Order;