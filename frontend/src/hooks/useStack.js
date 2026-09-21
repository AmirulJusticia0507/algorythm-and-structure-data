import { useState, useCallback, useEffect } from 'react';
import { stackApi } from '../services/api';

export function useStack(initialId = null) {
  const [stackId, setStackId] = useState(initialId);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!stackId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await stackApi.getAll(stackId);
      setItems(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [stackId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const create = async (customId, name) => {
    setLoading(true);
    try {
      const data = await stackApi.create(customId, name);
      setStackId(data.stackId);
      setItems([]);
      return data.stackId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const push = async (value) => {
    await stackApi.push(stackId, value);
    fetchData();
  };

  const pop = async () => {
    const data = await stackApi.pop(stackId);
    fetchData();
    return data.data;
  };

  const peek = async () => {
    const data = await stackApi.peek(stackId);
    return data.data;
  };

  const getSize = async () => {
    const data = await stackApi.getSize(stackId);
    return data.size;
  };

  const isEmpty = async () => {
    const data = await stackApi.isEmpty(stackId);
    return data.empty;
  };

  const clear = async () => {
    await stackApi.clear(stackId);
    setItems([]);
  };

  const deleteStack = async () => {
    await stackApi.deleteStack(stackId);
    setStackId(null);
    setItems([]);
  };

  return {
    stackId,
    items,
    loading,
    error,
    create,
    push,
    pop,
    peek,
    getSize,
    isEmpty,
    clear,
    deleteStack,
    refresh: fetchData
  };
}