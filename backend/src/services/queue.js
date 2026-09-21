import { v4 as uuidv4 } from 'uuid';
import { query, getClient } from '../config/db.js';

export class QueueService {
  static async create(queueId = null, name = 'Queue') {
    const id = queueId || uuidv4().substring(0, 8);
    await query(
      'INSERT INTO data_structures (id, type, name) VALUES ($1, $2, $3)',
      [id, 'queue', name]
    );
    return id;
  }

  static async getAll(queueId) {
    const result = await query(
      `SELECT id, value, position FROM queue_items 
       WHERE queue_id = $1 ORDER BY position`,
      [queueId]
    );
    return result.rows;
  }

  static async enqueue(queueId, value) {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      
      const maxPos = await client.query(
        'SELECT COALESCE(MAX(position), -1) as max_pos FROM queue_items WHERE queue_id = $1',
        [queueId]
      );
      
      const newPosition = parseInt(maxPos.rows[0].max_pos) + 1;
      
      const result = await client.query(
        `INSERT INTO queue_items (queue_id, value, position) 
         VALUES ($1, $2, $3) RETURNING id`,
        [queueId, value, newPosition]
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

  static async dequeue(queueId) {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      
      const front = await client.query(
        `SELECT id, value FROM queue_items WHERE queue_id = $1 ORDER BY position LIMIT 1`,
        [queueId]
      );
      
      if (front.rows.length === 0) {
        throw new Error('Queue is empty');
      }
      
      const dequeuedItem = front.rows[0];
      
      await client.query(
        'DELETE FROM queue_items WHERE id = $1',
        [dequeuedItem.id]
      );
      
      await client.query(
        'UPDATE queue_items SET position = position - 1 WHERE queue_id = $1',
        [queueId]
      );
      
      await client.query('COMMIT');
      return dequeuedItem;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async peek(queueId) {
    const result = await query(
      `SELECT id, value, position FROM queue_items WHERE queue_id = $1 ORDER BY position LIMIT 1`,
      [queueId]
    );
    return result.rows[0] || null;
  }

  static async getSize(queueId) {
    const result = await query(
      'SELECT COUNT(*) FROM queue_items WHERE queue_id = $1',
      [queueId]
    );
    return parseInt(result.rows[0].count);
  }

  static async isEmpty(queueId) {
    const size = await this.getSize(queueId);
    return size === 0;
  }

  static async clear(queueId) {
    await query('DELETE FROM queue_items WHERE queue_id = $1', [queueId]);
  }

  static async deleteQueue(queueId) {
    await query('DELETE FROM queue_items WHERE queue_id = $1', [queueId]);
    await query('DELETE FROM data_structures WHERE id = $1', [queueId]);
  }

  static async search(queueId, value) {
    const result = await query(
      `SELECT id, value, position FROM queue_items WHERE queue_id = $1 AND value = $2 ORDER BY position`,
      [queueId, value]
    );
    return result.rows;
  }

  static async toArray(queueId) {
    const items = await this.getAll(queueId);
    return items.map(item => ({ id: item.id, value: item.value }));
  }
}