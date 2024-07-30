import { AxiosResponse } from 'axios';
import request from '@/api/request';
import { TodoState } from '@/lib/features/todos/todoSlice';

export const getTodoAPI = () =>
  request.get<TodoState>('/todos').then((response) => response);

export const addTodoAPI = (payload: any): Promise<AxiosResponse<any>> =>
  request.post('/todos', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const updateTodoAPI = (payload: any): Promise<AxiosResponse<any>> =>
  request.put('/todos', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const deleteTodoAPI = (payload: any): Promise<AxiosResponse<any>> =>
  request.put('/todos', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
