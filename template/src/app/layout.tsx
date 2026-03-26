import type { Metadata } from 'next';
import FavIcon from '../../public/favicon.ico';
import '@/styles/globals.scss';
import { CustomFont } from '@/lib/fonts';
import Loading from '@/app/loading';
import { Suspense } from 'react';
import Header from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { Providers } from '@/context/providers';

/**
 * Entry point for NextJS application.
 * Supports caching by default.
 *
 * @author Anuradha Mudalige
 * @since August 2025
 */
export const metadata: Metadata = {
  title: 'Manulife Singapore - Title',
  description: 'Your description',
  icons: [{rel: 'icon', url: FavIcon.src}],
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
    <body className={`${CustomFont.className} antialiased m-0 flex flex-col gap-0 w-full min-h-dvh relative`}>
    <Providers>
      <div className='flex flex-col gap-0 w-full min-h-dvh relative'>
        <Header/>
        <main className='w-full grow h-full'>
          <Suspense fallback={<Loading/>}>
            {children}
          </Suspense>
        </main>
        <Footer/>
      </div>
    </Providers>
    </body>
    </html>
  );
}
