import Image from 'next/image';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import HeaderIcon from './HeaderIcon';
import { signOut, useSession } from 'next-auth/client';

function Header() {
  const [session] = useSession();

  return (
    <div className='sticky top-0 bg-white flex items-center p-2 lg:px-5 shadow-md'>
      <div className='flex items-center'>
        <Image
          src='https://links.papareact.com/5me'
          width={40}
          height={40}
          layout='fixed'
        />
        <div className='flex space-x-3 ml-2 rounded-full items-center bg-gray-100 p-2'>
          <SearchIcon className='h-6 w-5 text-gray-600' />
          <input
            type='text'
            placeholder='Search Facebook'
            className=' ml-2 items-center bg-transparent outline-none flex-shrink hidden sm:inline-flex'
          />
        </div>
      </div>
      <div className='flex justify-center flex-grow'>
        <div className='flex space-x-6 md:space-x-2'>
          <HeaderIcon Icon={HomeIcon} active />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      <div className='flex items-center sm:space-x-2 justify-end'>
        {/* Profile pic */}
        <Image
          onClick={signOut}
          className='rounded-full cursor-pointer'
          src={session.user.image}
          width={40}
          height={40}
          layout='fixed'
        />
        <p className='font-semibold pr-3 whitespace-nowrap'>
          {session.user.name}
        </p>
        <ViewGridIcon className='icon' />
        <ChatIcon className='icon' />
        <BellIcon className='icon' />
        <ChevronDownIcon className='icon' />
      </div>
    </div>
  );
}

export default Header;
