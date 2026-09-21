import { v4 as uuidv4 } from 'uuid';
import { query, getClient } from '../config/db.js';

export class LinkedListService {
  static async create(listId = null, name = 'Linked List') {
    const id = listId || uuidv4().substring(0, 8);
    await query(
      'INSERT INTO data_structures (id, type, name) VALUES ($1, $2, $3)',
      [id, 'linked_list', name]
    );
    return id;
  }

  static async getAll(listId) {
    const result = await query(
      `SELECT id, value, next_node_id, position 
       FROM linked_list_nodes 
       WHERE list_id = $1 
       ORDER BY position`,
      [listId]
    );
    return result.rows;
  }

  static async getHead(listId) {
    const result = await query(
      `SELECT id, value, next_node_id, position 
       FROM linked_list_nodes 
       WHERE list_id = $1 
       ORDER BY position 
       LIMIT 1`,
      [listId]
    );
    return result.rows[0] || null;
  }

  static async insertAtHead(listId, value) {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      
      await client.query(
        'UPDATE linked_list_nodes SET position = position + 1 WHERE list_id = $1',
        [listId]
      );
      
      const result = await client.query(
        `INSERT INTO linked_list_nodes (list_id, value, position) 
         VALUES ($1, $2, 0) RETURNING id`,
        [listId, value]
      );
      
      const newNodeId = result.rows[0].id;
      
      const nextNode = await client.query(
        `SELECT id FROM linked_list_nodes WHERE list_id = $1 AND position = 1`,
        [listId]
      );
      
      if (nextNode.rows.length > 0) {
        await client.query(
          'UPDATE linked_list_nodes SET next_node_id = $1 WHERE id = $2',
          [nextNode.rows[0].id, newNodeId]
        );
      }
      
      await client.query('COMMIT');
      return newNodeId;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async insertAtTail(listId, value) {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      
      const maxPos = await client.query(
        'SELECT COALESCE(MAX(position), -1) as max_pos FROM linked_list_nodes WHERE list_id = $1',
        [listId]
      );
      
      const newPosition = parseInt(maxPos.rows[0].max_pos) + 1;
      
      const result = await client.query(
        `INSERT INTO linked_list_nodes (list_id, value, position) 
         VALUES ($1, $2, $3) RETURNING id`,
        [listId, value, newPosition]
      );
      
      const newNodeId = result.rows[0].id;
      
      if (newPosition > 0) {
        const prevNode = await client.query(
          `SELECT id FROM linked_list_nodes WHERE list_id = $1 AND position = $2`,
          [listId, newPosition - 1]
        );
        if (prevNode.rows.length > 0) {
          await client.query(
            'UPDATE linked_list_nodes SET next_node_id = $1 WHERE id = $2',
            [newNodeId, prevNode.rows[0].id]
          );
        }
      }
      
      await client.query('COMMIT');
      return newNodeId;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async insertAtPosition(listId, value, position) {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      
      const count = await client.query(
        'SELECT COUNT(*) FROM linked_list_nodes WHERE list_id = $1',
        [listId]
      );
      const size = parseInt(count.rows[0].count);
      
      if (position < 0 || position > size) {
        throw new Error('Invalid position');
      }
      
      if (position === 0) {
        await client.query('COMMIT');
        return this.insertAtHead(listId, value);
      }
      
      if (position === size) {
        await client.query('COMMIT');
        return this.insertAtTail(listId, value);
      }
      
      await client.query(
        'UPDATE linked_list_nodes SET position = position + 1 WHERE list_id = $1 AND position >= $2',
        [listId, position]
      );
      
      const result = await client.query(
        `INSERT INTO linked_list_nodes (list_id, value, position) 
         VALUES ($1, $2, $3) RETURNING id`,
        [listId, value, position]
      );
      
      const newNodeId = result.rows[0].id;
      
      const nextNode = await client.query(
        `SELECT id FROM linked_list_nodes WHERE list_id = $1 AND position = $2`,
        [listId, position + 1]
      );
      if (nextNode.rows.length > 0) {
        await client.query(
          'UPDATE linked_list_nodes SET next_node_id = $1 WHERE id = $2',
          [nextNode.rows[0].id, newNodeId]
        );
      }
      
      const prevNode = await client.query(
        `SELECT id FROM linked_list_nodes WHERE list_id = $1 AND position = $2`,
        [listId, position - 1]
      );
      if (prevNode.rows.length > 0) {
        await client.query(
          'UPDATE linked_list_nodes SET next_node_id = $1 WHERE id = $2',
          [newNodeId, prevNode.rows[0].id]
        );
      }
      
      await client.query('COMMIT');
      return newNodeId;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async deleteAtPosition(listId, position) {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      
      const node = await client.query(
        `SELECT id, next_node_id FROM linked_list_nodes WHERE list_id = $1 AND position = $2`,
        [listId, position]
      );
      
      if (node.rows.length === 0) {
        throw new Error('Node not found');
      }
      
      const nodeId = node.rows[0].id;
      const nextNodeId = node.rows[0].next_node_id;
      
      await client.query(
        'DELETE FROM linked_list_nodes WHERE id = $1',
        [nodeId]
      );
      
      await client.query(
        'UPDATE linked_list_nodes SET position = position - 1 WHERE list_id = $1 AND position > $2',
        [listId, position]
      );
      
      if (position > 0) {
        const prevNode = await client.query(
          `SELECT id FROM linked_list_nodes WHERE list_id = $1 AND position = $2`,
          [listId, position - 1]
        );
        if (prevNode.rows.length > 0) {
          await client.query(
            'UPDATE linked_list_nodes SET next_node_id = $1 WHERE id = $2',
            [nextNodeId, prevNode.rows[0].id]
          );
        }
      }
      
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async deleteHead(listId) {
    return this.deleteAtPosition(listId, 0);
  }

  static async deleteTail(listId) {
    const count = await query(
      'SELECT COUNT(*) FROM linked_list_nodes WHERE list_id = $1',
      [listId]
    );
    const size = parseInt(count.rows[0].count);
    if (size === 0) throw new Error('List is empty');
    return this.deleteAtPosition(listId, size - 1);
  }

  static async search(listId, value) {
    const result = await query(
      `SELECT id, value, position FROM linked_list_nodes WHERE list_id = $1 AND value = $2 ORDER BY position`,
      [listId, value]
    );
    return result.rows;
  }

  static async getSize(listId) {
    const result = await query(
      'SELECT COUNT(*) FROM linked_list_nodes WHERE list_id = $1',
      [listId]
    );
    return parseInt(result.rows[0].count);
  }

  static async clear(listId) {
    await query('DELETE FROM linked_list_nodes WHERE list_id = $1', [listId]);
  }

  static async deleteList(listId) {
    await query('DELETE FROM linked_list_nodes WHERE list_id = $1', [listId]);
    await query('DELETE FROM data_structures WHERE id = $1', [listId]);
  }

  static async toArray(listId) {
    const nodes = await this.getAll(listId);
    return nodes.map(n => ({ id: n.id, value: n.value, next: n.next_node_id }));
  }
}