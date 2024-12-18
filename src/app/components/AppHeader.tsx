'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routesLinks = [
  {
    name: 'DashBoard',
    path: '/app/dashboard'
  },
  {
    name: 'Account',
    path: '/app/account'
  }
];

export default function Appheader() {
  const pathName = usePathname();
  return (
    <header className='flex justify-between mx-7 items-center border-b border-white/40'>
      <Image
        src={`../icon.svg`}
        alt={'logo'}
        width={50}
        height={50}
        sizes='100px'
        className='rounded mr-5'
      />
      <nav>
        <ul className='flex gap-2'>
          {routesLinks.map((link, index) => (
            <li key={index}>
              <Link
                className={cn(
                  'text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition',
                  {
                    'bg-white/10 text-white': pathName === link.path,
                  }
                )}
                href={link.path}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
