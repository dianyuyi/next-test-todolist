import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import GlobalStyles from '@/styles/GlobalStyles';
import StyledComponentsRegistry from '@/lib/registry';
import StoreProvider from "@/app/StoreProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {props.children}
        </StyledComponentsRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
