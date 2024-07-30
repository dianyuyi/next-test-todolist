
'use client';
import React from 'react';
import Container from '@/components/Container';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/lib/hooks';

import { RootState } from '@/lib/store';
import { Virtuoso } from 'react-virtuoso';

export default function Home() {
  const { response: todoList } = useSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();
  const [todo, setTodo] = React.useState("");

  return (
    <Container $hasBackground>
      <Virtuoso
        style={{ width: 400, height: 400 }}
        data={todoList}
        totalCount={todoList.length}
        itemContent={(_, item) => {
          return (
            <div style={{display: 'flex', gap: '0.5rem'}}>
            <div>
            {item.userId}
            </div>
            <div>
            {item.title}
            </div>
            <div>
            {item.completed ? 'Y' : 'N'}
            </div>
          </div>
          );
        }}
      />
    </Container>
  );
}
