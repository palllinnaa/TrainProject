import React, { useState } from "react";
import { MenuIcon, CloseIcon, LogoIcon, SearchIcon } from '../src/icons';
import Link from "next/link";
import AccountMenu from "./AccountMenu";

export const SiteHeader = () => {
    const dropdownRef = React.useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    return (
        <div>
            <header className='bg-gray-900 sm:flex sm:items-center sm:justify-between xl:bg-white'>
                <div className='flex justify-between px-4 py-3 xl:w-72 xl:bg-gray-900 xl:justify-center xl:py-4'>
                    <div>
                        <LogoIcon />
                    </div>
                    <div className="sm:hidden">
                        <button onClick={onClick} type='button' className='w-6 h-6 '>
                            <div >
                                {isActive ? <CloseIcon /> : <MenuIcon />}
                            </div>
                        </button>
                    </div>
                </div>
                <nav ref={dropdownRef} className={`menu ${isActive ? 'block' : 'hidden'} sm:flex sm:items-center sm:px-4 xl:flex-1 xl:justify-between`}>
                    <div className='hidden xl:relative xl:flex-1 xl:mr-2 xl:block'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
                            <SearchIcon />
                        </div>
                        <input className='w-3/4 py-2 pl-10 pr-4 text-gray-300 bg-gray-200 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-300' placeholder='Search by keywords' />
                    </div>
                    <div className="sm:flex sm:items-center">
                        <div className='px-5 pt-2 pb-4 border-b border-gray-800 sm:flex sm:border-b-0 sm:py-0 sm:px-0'>
                            <Link href="" className='block px-3 font-semibold text-white rounded sm:px-2 hover:no-underline hover:bg-gray-800 sm:text-sm xl:text-gray-900 xl:hover:bg-white '>List your property</Link>
                            <Link href="" className='block px-3 mt-1 font-semibold text-white rounded sm:px-2 sm:mt-0 hover:no-underline hover:bg-gray-800 sm:text-sm xl:text-gray-900 xl:hover:bg-white '>Trips</Link>
                            <Link href="" className='block px-3 mt-1 font-semibold text-white rounded sm:px-2 sm:mt-0 hover:no-underline hover:bg-gray-800 sm:text-sm xl:text-gray-900 xl:hover:bg-white '>Messages</Link>
                        </div>
                        <AccountMenu/>
                    </div>
                </nav>
            </header>
        </div>
    );
};