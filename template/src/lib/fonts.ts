import localFont from 'next/font/local';

export const CustomFont = localFont({
  variable: '--custom-font-family',
  src: [
    {
      path: '../../public/fonts/CoolveticaRg.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CoolveticaRgIt.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/CoolveticaRg.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CoolveticaRgIt.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/CoolveticaRg.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CoolveticaRgIt.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/CoolveticaRg.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CoolveticaRgIt.otf',
      weight: '700',
      style: 'italic',
    },
  ],
});
