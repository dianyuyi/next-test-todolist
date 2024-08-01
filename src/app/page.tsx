'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import { useAppDispatch } from '@/lib/hooks';
import { RootState } from '@/lib/store';

import Container, { PageTitle, Subtitle } from '@/components/layout/Container';
import Loading from '@/components/Loading';
import Item, { EventEl } from '@/components/todo/Item';
import List from '@/components/todo/List';
import Input from '@/components/todo/Input';
import { AddIcon, SearchIcon } from '@/components/Icons';

import {
  fetchCreateTodo,
  fetchUpdateTodo,
  fetchDeleteTodo,
  TodoState,
  selectTodoByKeyword,
} from '@/lib/features/todos/todoSlice';

export default function Home() {
  const { response: list, isLoading, errors, message } = useSelector(
    (state: RootState) => state.todos
  );
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const virtuoso = useRef<VirtuosoHandle>(null);
  const renderList = useSelector((state) => selectTodoByKeyword(state, keyword));

  useEffect(() => {
    if (isLoading === false && message) {
      toast.success(message);
    }
    if (isLoading === false && typeof errors === 'string') {
      toast.error(errors);
    }
  }, [isLoading, message, errors]);

  const handleNewTodo = (e: EventEl) => {
    setTodo(e.target.value);
  };

  const handleSearchContent = (e: EventEl) => {
    setSearch(e.target.value);
  };
  const searchAction = () => {
    setKeyword(search);
  };

  const handleScroll = () => {
    if (virtuoso.current) {
      virtuoso.current.scrollToIndex({
        index: list.length,
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
      setKeyword('');
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
      <Input
        value={search}
        placeholder="Fill & click to search"
        buttonIcon={<SearchIcon />}
        changeAction={handleSearchContent}
        clickAction={searchAction}
      />
      <Input
        value={todo}
        placeholder="Fill you todo task"
        changeAction={handleNewTodo}
        clickAction={addAction}
        buttonIcon={<AddIcon />}
        buttonText="Add"
      />
      <List>
        {renderList.length ? (
          <Virtuoso
            ref={virtuoso}
            style={{ height: 400 }}
            data={renderList}
            totalCount={renderList.length}
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
        ) : (
          <Subtitle>No Result</Subtitle>
        )}
      </List>
    </Container>
  );
}
