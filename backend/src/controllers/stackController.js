import { StackService } from '../services/stack.js';

export const stackController = {
  async create(req, res) {
    try {
      const { stackId, name } = req.body;
      const id = await StackService.create(stackId, name);
      res.status(201).json({ success: true, stackId: id });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const { stackId } = req.params;
      const items = await StackService.getAll(stackId);
      res.json({ success: true, data: items });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async push(req, res) {
    try {
      const { stackId } = req.params;
      const { value } = req.body;
      const itemId = await StackService.push(stackId, value);
      res.status(201).json({ success: true, itemId });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async pop(req, res) {
    try {
      const { stackId } = req.params;
      const item = await StackService.pop(stackId);
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async peek(req, res) {
    try {
      const { stackId } = req.params;
      const item = await StackService.peek(stackId);
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async getSize(req, res) {
    try {
      const { stackId } = req.params;
      const size = await StackService.getSize(stackId);
      res.json({ success: true, size });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async isEmpty(req, res) {
    try {
      const { stackId } = req.params;
      const empty = await StackService.isEmpty(stackId);
      res.json({ success: true, empty });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async clear(req, res) {
    try {
      const { stackId } = req.params;
      await StackService.clear(stackId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async deleteStack(req, res) {
    try {
      const { stackId } = req.params;
      await StackService.deleteStack(stackId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async search(req, res) {
    try {
      const { stackId } = req.params;
      const { value } = req.query;
      const results = await StackService.search(stackId, value);
      res.json({ success: true, data: results });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async toArray(req, res) {
    try {
      const { stackId } = req.params;
      const array = await StackService.toArray(stackId);
      res.json({ success: true, data: array });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};