import { useState, useCallback, useEffect } from 'react';
import { queueApi } from '../services/api';

export function useQueue(initialId = null) {
  const [queueId, setQueueId] = useState(initialId);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!queueId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await queueApi.getAll(queueId);
      setItems(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [queueId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const create = async (customId, name) => {
    setLoading(true);
    try {
      const data = await queueApi.create(customId, name);
      setQueueId(data.queueId);
      setItems([]);
      return data.queueId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const enqueue = async (value) => {
    await queueApi.enqueue(queueId, value);
    fetchData();
  };

  const dequeue = async () => {
    const data = await queueApi.dequeue(queueId);
    fetchData();
    return data.data;
  };

  const peek = async () => {
    const data = await queueApi.peek(queueId);
    return data.data;
  };

  const getSize = async () => {
    const data = await queueApi.getSize(queueId);
    return data.size;
  };

  const isEmpty = async () => {
    const data = await queueApi.isEmpty(queueId);
    return data.empty;
  };

  const clear = async () => {
    await queueApi.clear(queueId);
    setItems([]);
  };

  const deleteQueue = async () => {
    await queueApi.deleteQueue(queueId);
    setQueueId(null);
    setItems([]);
  };

  return {
    queueId,
    items,
    loading,
    error,
    create,
    enqueue,
    dequeue,
    peek,
    getSize,
    isEmpty,
    clear,
    deleteQueue,
    refresh: fetchData
  };
}