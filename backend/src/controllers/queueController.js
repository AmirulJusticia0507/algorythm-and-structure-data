import { QueueService } from '../services/queue.js';

export const queueController = {
  async create(req, res) {
    try {
      const { queueId, name } = req.body;
      const id = await QueueService.create(queueId, name);
      res.status(201).json({ success: true, queueId: id });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const { queueId } = req.params;
      const items = await QueueService.getAll(queueId);
      res.json({ success: true, data: items });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async enqueue(req, res) {
    try {
      const { queueId } = req.params;
      const { value } = req.body;
      const itemId = await QueueService.enqueue(queueId, value);
      res.status(201).json({ success: true, itemId });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async dequeue(req, res) {
    try {
      const { queueId } = req.params;
      const item = await QueueService.dequeue(queueId);
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async peek(req, res) {
    try {
      const { queueId } = req.params;
      const item = await QueueService.peek(queueId);
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async getSize(req, res) {
    try {
      const { queueId } = req.params;
      const size = await QueueService.getSize(queueId);
      res.json({ success: true, size });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async isEmpty(req, res) {
    try {
      const { queueId } = req.params;
      const empty = await QueueService.isEmpty(queueId);
      res.json({ success: true, empty });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async clear(req, res) {
    try {
      const { queueId } = req.params;
      await QueueService.clear(queueId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async deleteQueue(req, res) {
    try {
      const { queueId } = req.params;
      await QueueService.deleteQueue(queueId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async search(req, res) {
    try {
      const { queueId } = req.params;
      const { value } = req.query;
      const results = await QueueService.search(queueId, value);
      res.json({ success: true, data: results });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async toArray(req, res) {
    try {
      const { queueId } = req.params;
      const array = await QueueService.toArray(queueId);
      res.json({ success: true, data: array });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};