'use client';

import tw from 'twin.macro';
import { ReactNode } from 'react';

const styles = {
  container: () => [
    tw`w-full flex flex-col items-center justify-center h-screen`,
  ],
  title: () => [
    tw`mx-auto p-4 text-center my-4`,
  ]
};

const Container = (props: { children: ReactNode }) => (
  <div css={styles.container}>
    <div tw="flex flex-col justify-center h-full gap-y-5">{props.children}</div>
  </div>
);


export const PageTitle = (props: { children: ReactNode }) => (
  <div css={styles.title}>
    <h1 tw="text-4xl text-gray-800">{props.children}</h1>
  </div>
);


export default Container;
