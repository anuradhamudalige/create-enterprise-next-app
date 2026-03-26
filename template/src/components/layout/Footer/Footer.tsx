import React from 'react';
import './Footer.scss';

export const Footer: React.FC<IHTMLProperties> = ({classNames = ''}) =>  {
  const version = process.env.NEXT_PUBLIC_APP_VERSION;
  return (
    <footer className={`flex justify-between item-center ${classNames}`}>
      <div></div>
      <div className='flex gap-2 items-center'>
        <p className='text-xs font-semibold'>&copy; {new Date().getFullYear()} </p>
      </div>
      <small className='text-xs font-semibold'>{`v.${version}`}</small>
    </footer>
  );
};
