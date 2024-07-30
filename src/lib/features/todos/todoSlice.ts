import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '@/lib/store';
import {
  getTodoAPI,
  addTodoAPI,
  updateTodoAPI,
  deleteTodoAPI,
} from '@/api/todos';

export interface TodoState {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface InitialState {
  response: Array<TodoState>;
  isLoading: null | boolean;
  errors: string[] | null | unknown;
}

const initialState = {
  response: [],
  isLoading: null,
  errors: null,
} as InitialState;

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const data = await getTodoAPI();
  return data;
});

const todoReducer = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.response.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.response.filter((task) => task.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.response.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.response[taskIndex] = updatedTask;
      }
    },
    clearAllTodo: () => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        state.response = payload;
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        state.response = initialState.response;
        state.errors = payload;
        state.isLoading = false;
      });
  },
});
export const { addTodo, deleteTodo, updateTodo, clearAllTodo } =
  todoReducer.actions;
export default todoReducer.reducer;
