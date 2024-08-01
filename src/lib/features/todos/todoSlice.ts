import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import {
  getTodoAPI,
  createTodoAPI,
  updateTodoAPI,
  deleteTodoAPI,
} from '@/api/todos';
import { RootState } from '@/lib/store';

export interface TodoState {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type ErrorType = string | null | unknown;

interface InitialState {
  response: Array<TodoState>;
  isLoading: null | boolean;
  errors: ErrorType;
  message: string;
}

const initialState = {
  response: [],
  isLoading: null,
  errors: null,
  message: '',
} as InitialState;

export const fetchTodos = createAsyncThunk('todos/get', async (_, thunkAPI) => {
  try {
    const { data } = await getTodoAPI();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }
    return thunkAPI.rejectWithValue(err);
  }
});

export const fetchCreateTodo = createAsyncThunk(
  'todos/create',
  async (reqData: TodoState, thunkAPI) => {
    try {
      const { data } = await createTodoAPI(reqData);
      if (typeof data === 'object') {
        return data;
      }
      return thunkAPI.rejectWithValue('Create failed');
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchUpdateTodo = createAsyncThunk(
  'todos/update',
  async (reqData: TodoState, thunkAPI) => {
    try {
      const { data } = await updateTodoAPI(reqData);
      if (typeof data === 'object') {
        return data;
      }
      return thunkAPI.rejectWithValue('Update failed');
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const fetchDeleteTodo = createAsyncThunk(
  'todos/delete',
  async (id: number, thunkAPI) => {
    try {
      const { data } = await deleteTodoAPI(id);
      if (typeof data === 'object') {
        return id;
      }
      return thunkAPI.rejectWithValue('Delete failed');
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

const todoReducer = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    clearAllTodo: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.message = '';
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        state.response = payload;
        state.message = 'Success Load List';
        state.isLoading = false;
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        state.errors = payload;
        state.isLoading = false;
      })

      .addCase(fetchCreateTodo.pending, (state) => {
        state.message = '';
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(fetchCreateTodo.fulfilled, (state, { payload }) => {
        state.response.push(payload);
        state.message = 'Success Create';
        state.isLoading = false;
      })
      .addCase(fetchCreateTodo.rejected, (state, { payload }) => {
        state.errors = payload;
        state.isLoading = false;
      })

      .addCase(fetchUpdateTodo.pending, (state) => {
        state.message = '';
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(fetchUpdateTodo.fulfilled, (state, { payload }) => {
        if (payload) {
          const taskIndex = state.response.findIndex(
            (todo) => todo.id === payload.id
          );
          state.response[taskIndex] = payload;
        }
        state.message = 'Success Update';
        state.isLoading = false;
      })
      .addCase(fetchUpdateTodo.rejected, (state, { payload }) => {
        state.errors = payload;
        state.isLoading = false;
      })

      .addCase(fetchDeleteTodo.pending, (state) => {
        state.message = '';
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(fetchDeleteTodo.fulfilled, (state, { payload }) => {
        state.response = state.response.filter((task) => task.id !== payload);
        state.message = 'Success Delete';
        state.isLoading = false;
      })
      .addCase(fetchDeleteTodo.rejected, (state, { payload }) => {
        state.errors = payload;
        state.isLoading = false;
      });
  },
});

export const selectTodoByKeyword = createSelector(
  [(state: RootState) => state.todos.response, (_, keyword: string) => keyword],
  (todos, keyword) => {
    return todos.filter((item) => item.title.includes(keyword));
  }
);

export const { clearAllTodo } = todoReducer.actions;
export default todoReducer.reducer;
