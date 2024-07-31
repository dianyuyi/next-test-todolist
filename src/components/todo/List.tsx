'use client';

import tw, { styled } from 'twin.macro';
import { ReactNode } from 'react';

export const Wrapper = styled.div(() => [
  tw`w-full mx-auto min-w-80 sm:min-w-96 lg:min-w-[900px]`,
]);

const List = (props: { children: ReactNode }) => (
  <Wrapper>{props.children}</Wrapper>
);

export default List;
