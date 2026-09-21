import { LinkedListService } from '../services/linkedList.js';

export const linkedListController = {
  async create(req, res) {
    try {
      const { listId, name } = req.body;
      const id = await LinkedListService.create(listId, name);
      res.status(201).json({ success: true, listId: id });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const { listId } = req.params;
      const nodes = await LinkedListService.getAll(listId);
      res.json({ success: true, data: nodes });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async getHead(req, res) {
    try {
      const { listId } = req.params;
      const head = await LinkedListService.getHead(listId);
      res.json({ success: true, data: head });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async insertAtHead(req, res) {
    try {
      const { listId } = req.params;
      const { value } = req.body;
      const nodeId = await LinkedListService.insertAtHead(listId, value);
      res.status(201).json({ success: true, nodeId });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async insertAtTail(req, res) {
    try {
      const { listId } = req.params;
      const { value } = req.body;
      const nodeId = await LinkedListService.insertAtTail(listId, value);
      res.status(201).json({ success: true, nodeId });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async insertAtPosition(req, res) {
    try {
      const { listId } = req.params;
      const { value, position } = req.body;
      const nodeId = await LinkedListService.insertAtPosition(listId, value, position);
      res.status(201).json({ success: true, nodeId });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async deleteAtPosition(req, res) {
    try {
      const { listId, position } = req.params;
      await LinkedListService.deleteAtPosition(listId, parseInt(position));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async deleteHead(req, res) {
    try {
      const { listId } = req.params;
      await LinkedListService.deleteHead(listId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async deleteTail(req, res) {
    try {
      const { listId } = req.params;
      await LinkedListService.deleteTail(listId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async search(req, res) {
    try {
      const { listId } = req.params;
      const { value } = req.query;
      const results = await LinkedListService.search(listId, value);
      res.json({ success: true, data: results });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async getSize(req, res) {
    try {
      const { listId } = req.params;
      const size = await LinkedListService.getSize(listId);
      res.json({ success: true, size });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async clear(req, res) {
    try {
      const { listId } = req.params;
      await LinkedListService.clear(listId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async deleteList(req, res) {
    try {
      const { listId } = req.params;
      await LinkedListService.deleteList(listId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async toArray(req, res) {
    try {
      const { listId } = req.params;
      const array = await LinkedListService.toArray(listId);
      res.json({ success: true, data: array });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};