'use client';

import tw from 'twin.macro';
import { ReactNode } from 'react';

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ $hasBackground }: { $hasBackground: boolean }) => [
    tw`flex flex-col items-center justify-center h-screen`,
    $hasBackground && tw`bg-gradient-to-b from-blue-50 to-gray-200`,
  ],
};

const Container = (props: { $hasBackground: boolean; children: ReactNode }) => (
  <div css={styles.container({ $hasBackground: props.$hasBackground })}>
    <div tw="flex flex-col justify-center h-full gap-y-5">{props.children}</div>
  </div>
);

export default Container;
