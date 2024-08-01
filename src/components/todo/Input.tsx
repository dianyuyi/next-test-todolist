'use client';
import { TodoState } from '@/lib/features/todos/todoSlice';
import tw, { styled } from 'twin.macro';
import { AddIcon } from '@/components/Icons';

interface InputProps {
  $completed?: boolean;
  $isBasis?: boolean;
}

export const Wrapper = styled.div<InputProps>(() => [
  tw`w-full flex justify-between items-center overflow-hidden
  rounded-lg shadow-md shadow-gray-300/30 border border-gray-200 bg-gray-700`,
]);
export const TextInput = styled.input(() => [
  tw`w-full flex justify-between items-center p-2 outline-none bg-gray-100 duration-300
  focus:bg-white
  `,
]);

export const Button = styled.button<InputProps>(() => [
  tw`flex items-center gap-2 bg-gray-700 text-white outline-none px-4 py-2`,
]);

export const IconWrap = styled.div<InputProps>(() => [
  tw`*:text-white *:text-xl`,
]);

export const Input = ({
  value,
  placeholder = '',
  buttonIcon = null,
  buttonText = '',
  clickAction,
  changeAction,
}: {
  value: string;
  placeholder?: string;
  buttonIcon?: null | React.JSX.Element;
  buttonText?: string;
  clickAction: () => void ;
  changeAction: (arg0: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Wrapper>
      <TextInput
        type="text"
        value={value}
        onChange={changeAction}
        placeholder={placeholder}
      />
      <Button type="button" onClick={clickAction}>
        {buttonText}
        <IconWrap>{buttonIcon}</IconWrap>
      </Button>
    </Wrapper>
  );
};

export default Input;
