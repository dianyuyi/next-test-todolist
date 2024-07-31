'use client';
import { TodoState } from '@/lib/features/todos/todoSlice';
import tw, { styled } from 'twin.macro';
import { CheckedIcon, UncheckedIcon, TrashIcon } from '@/components/Icons';

interface ItemProps {
  $completed?: boolean;
  $isBasis?: boolean;
}

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
  return (
    <Wrapper $completed={completed}>
      <Box>
        <Cell
          $isBasis
          onClick={() => updateAction({ ...data, completed: !data.completed })}
          tw="cursor-pointer"
        >
          {completed ? <CheckedIcon /> : <UncheckedIcon />}
        </Cell>

        <Cell $isBasis>{id}</Cell>
        <Cell>{title}</Cell>
      </Box>
      <Cell $isBasis onClick={() => deleteAction(id)} tw="cursor-pointer">
        <TrashIcon />
      </Cell>
    </Wrapper>
  );
};

export default Item;
