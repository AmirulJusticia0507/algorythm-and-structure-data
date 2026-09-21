import { v4 as uuidv4 } from 'uuid';
import { query, getClient } from '../config/db.js';

export class StackService {
  static async create(stackId = null, name = 'Stack') {
    const id = stackId || uuidv4().substring(0, 8);
    await query(
      'INSERT INTO data_structures (id, type, name) VALUES ($1, $2, $3)',
      [id, 'stack', name]
    );
    return id;
  }

  static async getAll(stackId) {
    const result = await query(
      `SELECT id, value, position FROM stack_items 
       WHERE stack_id = $1 ORDER BY position DESC`,
      [stackId]
    );
    return result.rows;
  }

  static async push(stackId, value) {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      
      const maxPos = await client.query(
        'SELECT COALESCE(MAX(position), -1) as max_pos FROM stack_items WHERE stack_id = $1',
        [stackId]
      );
      
      const newPosition = parseInt(maxPos.rows[0].max_pos) + 1;
      
      const result = await client.query(
        `INSERT INTO stack_items (stack_id, value, position) 
         VALUES ($1, $2, $3) RETURNING id`,
        [stackId, value, newPosition]
      );
      
      await client.query('COMMIT');
      return result.rows[0].id;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async pop(stackId) {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      
      const top = await client.query(
        `SELECT id, value FROM stack_items WHERE stack_id = $1 ORDER BY position DESC LIMIT 1`,
        [stackId]
      );
      
      if (top.rows.length === 0) {
        throw new Error('Stack is empty');
      }
      
      const poppedItem = top.rows[0];
      
      await client.query(
        'DELETE FROM stack_items WHERE id = $1',
        [poppedItem.id]
      );
      
      await client.query('COMMIT');
      return poppedItem;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async peek(stackId) {
    const result = await query(
      `SELECT id, value, position FROM stack_items WHERE stack_id = $1 ORDER BY position DESC LIMIT 1`,
      [stackId]
    );
    return result.rows[0] || null;
  }

  static async getSize(stackId) {
    const result = await query(
      'SELECT COUNT(*) FROM stack_items WHERE stack_id = $1',
      [stackId]
    );
    return parseInt(result.rows[0].count);
  }

  static async isEmpty(stackId) {
    const size = await this.getSize(stackId);
    return size === 0;
  }

  static async clear(stackId) {
    await query('DELETE FROM stack_items WHERE stack_id = $1', [stackId]);
  }

  static async deleteStack(stackId) {
    await query('DELETE FROM stack_items WHERE stack_id = $1', [stackId]);
    await query('DELETE FROM data_structures WHERE id = $1', [stackId]);
  }

  static async search(stackId, value) {
    const result = await query(
      `SELECT id, value, position FROM stack_items WHERE stack_id = $1 AND value = $2 ORDER BY position DESC`,
      [stackId, value]
    );
    return result.rows;
  }

  static async toArray(stackId) {
    const items = await this.getAll(stackId);
    return items.map(item => ({ id: item.id, value: item.value }));
  }
}