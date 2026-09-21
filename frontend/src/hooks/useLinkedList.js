import { useState, useCallback, useEffect } from 'react';
import { linkedListApi } from '../services/api';

export function useLinkedList(initialId = null) {
  const [listId, setListId] = useState(initialId);
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!listId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await linkedListApi.getAll(listId);
      setNodes(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [listId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const create = async (customId, name) => {
    setLoading(true);
    try {
      const data = await linkedListApi.create(customId, name);
      setListId(data.listId);
      setNodes([]);
      return data.listId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const insertAtHead = async (value) => {
    await linkedListApi.insertAtHead(listId, value);
    fetchData();
  };

  const insertAtTail = async (value) => {
    await linkedListApi.insertAtTail(listId, value);
    fetchData();
  };

  const insertAtPosition = async (value, position) => {
    await linkedListApi.insertAtPosition(listId, value, position);
    fetchData();
  };

  const deleteAtPosition = async (position) => {
    await linkedListApi.deleteAtPosition(listId, position);
    fetchData();
  };

  const deleteHead = async () => {
    await linkedListApi.deleteHead(listId);
    fetchData();
  };

  const deleteTail = async () => {
    await linkedListApi.deleteTail(listId);
    fetchData();
  };

  const search = async (value) => {
    const data = await linkedListApi.search(listId, value);
    return data.data;
  };

  const getSize = async () => {
    const data = await linkedListApi.getSize(listId);
    return data.size;
  };

  const clear = async () => {
    await linkedListApi.clear(listId);
    setNodes([]);
  };

  const deleteList = async () => {
    await linkedListApi.deleteList(listId);
    setListId(null);
    setNodes([]);
  };

  return {
    listId,
    nodes,
    loading,
    error,
    create,
    insertAtHead,
    insertAtTail,
    insertAtPosition,
    deleteAtPosition,
    deleteHead,
    deleteTail,
    search,
    getSize,
    clear,
    deleteList,
    refresh: fetchData
  };
}