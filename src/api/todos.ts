import { AxiosResponse } from 'axios';
import request from '@/api/request';
import { TodoState } from '@/lib/features/todos/todoSlice';

const headers = {
  'Content-type': 'application/json; charset=UTF-8',
};

export const getTodoAPI = () =>
  request.get<TodoState[]>('/todos').then((response) => response);

export const createTodoAPI = (data: TodoState) =>
  request<TodoState>({
    method: 'post',
    url: '/todos',
    headers,
    data: JSON.stringify(data),
  });

export const updateTodoAPI = (data: TodoState) =>
  request<TodoState>({
    method: 'put',
    url: `/todos/${data.id}`,
    headers,
    data: JSON.stringify(data),
  });

export const deleteTodoAPI = (id: number) =>
  request({
    method: 'delete',
    url: `/todos/${id}`,
    headers,
  });
