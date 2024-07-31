'use client';
import React, { useState } from 'react';

import { TodoState } from '@/lib/features/todos/todoSlice';
import tw, { styled } from 'twin.macro';
import { CheckedIcon, UncheckedIcon, TrashIcon } from '@/components/Icons';

interface ItemProps {
  $completed?: boolean;
  $isBasis?: boolean;
}
export type EventEl = React.ChangeEvent<HTMLInputElement>;

export const Wrapper = styled.div<ItemProps>(({ $completed }) => [
  tw`w-full flex justify-between items-center gap-2 shadow-md shadow-gray-300/30`,
  $completed && tw`line-through text-gray-400`,
]);

export const Box = styled.div(() => [
  tw`w-full flex justify-between items-center`,
]);

export const Cell = styled.div<ItemProps>(({ $isBasis }) => [
  tw`w-full flex justify-between items-center gap-0.5 px-2 py-4`,
  $isBasis && tw`basis-20 justify-center`,
]);

export const Input = styled.input(() => [
  tw`outline-none rounded-md p-1 border border-transparent focus:border-gray-300`,
]);

export const Item = ({
  data,
  updateAction,
  deleteAction,
}: {
  data: TodoState;
  updateAction: (arg0: TodoState) => void;
  deleteAction: (arg0: number) => void;
}) => {
  const { completed, id, title } = data;
  const [tempTitle, setTmpTitle] = useState<string>(() => title);

  const handleTextChange = (e: EventEl) => {
    setTmpTitle(e.target.value);
  };

  const handleUpdate = (type: string) => {
    const submitData = { ...data };
    if (type === 'title') {
      submitData.title = tempTitle;
    }
    if (type === 'status') {
      submitData.completed = !data.completed;
    }
    updateAction(submitData);
  };
  return (
    <Wrapper $completed={completed}>
      <Box>
        <Cell
          $isBasis
          onClick={() => handleUpdate('status')}
          tw="cursor-pointer"
        >
          {completed ? <CheckedIcon /> : <UncheckedIcon />}
        </Cell>

        <Cell $isBasis>{id}</Cell>
        <Cell>
          <Input
            value={tempTitle}
            onChange={handleTextChange}
            onBlur={() => {
              if (tempTitle !== title) {
                handleUpdate('title');
              }
            }}
          />
        </Cell>
      </Box>
      <Cell $isBasis onClick={() => deleteAction(id)} tw="cursor-pointer">
        <TrashIcon />
      </Cell>
    </Wrapper>
  );
};

export default Item;
