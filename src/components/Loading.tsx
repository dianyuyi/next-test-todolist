'use client';
import { type ReactPortal, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';
import { LoadingIcon } from '@/components/Icons';
import tw, { styled } from 'twin.macro';

interface LoadingProps {
  $open: boolean;
}
const flexConfig = tw`flex items-center absolute z-20`;
const itemConfig = tw`
  max-w-[96px] max-h-[124px] flex-col p-5 bg-white/70
  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
`;

const LoadingLayout = styled.div<LoadingProps>(({ $open }) => [
  tw`
    w-screen h-screen fixed bg-white/60
    left-0 right-0 top-0 bottom-0 z-50
    invisible opacity-0 transition-all duration-100
  `,
  $open && tw`visible opacity-100`,
]);
const Container = styled.div(() => [flexConfig, itemConfig]);

export const Loading = ({ loading }: { loading: boolean | null }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!loading) return null;

  return isMounted
    ? createPortal(
        <LoadingLayout $open={loading}>
          <Container>
            <LoadingIcon tw="text-7xl text-gray-400" />
            <p tw="mt-2 text-sm">Loading...</p>
          </Container>
        </LoadingLayout>,
        document.body
      )
    : null;
};

export default Loading;
