'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import { useAppDispatch } from '@/lib/hooks';
import { RootState } from '@/lib/store';

import Container, { PageTitle } from '@/components/layout/Container';
import Loading from '@/components/Loading';
import Item from '@/components/todo/Item';
import List from '@/components/todo/List';
import Input from '@/components/todo/Input';

import {
  fetchCreateTodo,
  fetchUpdateTodo,
  fetchDeleteTodo,
  TodoState,
  ErrorType,
} from '@/lib/features/todos/todoSlice';

export default function Home() {
  const {
    response: todoList,
    isLoading,
    errors,
    message
  } = useSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState<string>('');
  const virtuoso = useRef<VirtuosoHandle>(null);

  useEffect(() => {
    if (isLoading === false && message) {
      toast.success(message);
    }
    if (isLoading === false && typeof errors === 'string') {
      toast.error(errors);
    }
  
  }, [isLoading, message, errors])
  

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleScroll = () => {
    if (virtuoso.current) {
      virtuoso.current.scrollToIndex({
        index: todoList.length,
        align: 'end',
        behavior: 'smooth',
      });
    }
  };

  const addAction = async () => {
    if (todo) {
      const timestamp = new Date().getTime();
      const data = {
        userId: timestamp,
        id: timestamp,
        title: todo,
        completed: false,
      };
      await dispatch(fetchCreateTodo(data)).unwrap();
      handleScroll();
      return;
    }
    toast.error('Please fill content');
  };
  const updateAction = (data: TodoState) => {
    dispatch(fetchUpdateTodo(data)).unwrap();
  };
  const deleteAction = (id: number) => {
    dispatch(fetchDeleteTodo(id)).unwrap();
  };

  return (
    <Container>
      <Loading loading={isLoading} />
      <Toaster position="bottom-right" />
      <PageTitle>Todo List</PageTitle>
      <Input value={todo} onChange={onChange} addAction={addAction} />
      <List>
        <Virtuoso
          ref={virtuoso}
          style={{ height: 400 }}
          data={todoList}
          totalCount={todoList.length}
          itemContent={(_, item) => {
            return (
              <Item
                data={item}
                updateAction={updateAction}
                deleteAction={deleteAction}
              />
            );
          }}
        />
      </List>
    </Container>
  );
}
