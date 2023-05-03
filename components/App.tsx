import Link from 'next/link';
import React from 'react';
import Filter from './Filter';
import ProductBox from './products';
import Search from './Search';
import SiteHeader from './SiteHeader';

export default function App(props) {
    return (
        <div >
            <div className='px-3 font-serif '>
                <SiteHeader />
                <div className='flex mt-3'>
                    <div className='flex-1'>
                        <Search />
                    </div>
                    <div className='flex ml-3'>
                        <Filter />
                    </div>
                </div>
            </div>
            <div className='mt-1 sm:my-4' >
                <img className='object-cover object-center w-full sm:h-60 lg:h-96' src="images/banner.png" alt="food banner" />
            </div>
            <div className='flex px-3 my-3 font-serif'>
                <Link className='px-8 py-1.5 focus:bg-red-500 focus:border-red-500 hover:bg-red-500 hover:border-red-500 mx-1 mb-4 text-gray-900 border border-gray-200 rounded-full sm:mx-2 hover:no-underline' href=''>All</Link>
                <Link className='px-4 py-1.5 focus:bg-red-500 focus:border-red-500 hover:bg-red-500 hover:border-red-500 mx-1 mb-4 text-gray-900 border border-gray-200 rounded-full sm:mx-2 hover:no-underline' href=''>Meals</Link>
                <Link className='px-4 py-1.5 focus:bg-red-500 focus:border-red-500 hover:bg-red-500 hover:border-red-500 mx-1 mb-4 text-gray-900 border border-gray-200 rounded-full sm:mx-2 hover:no-underline' href=''>Drinks</Link>
            </div>
            <div className='flex px-3 my-3 font-serif'>
                <Link className='px-8 py-1.5 focus:bg-red-500 focus:border-red-500 hover:bg-red-500 hover:border-red-500 mx-1 mb-4 text-gray-900 border border-gray-200 rounded-full sm:mx-2 hover:no-underline' href='/users'>Users</Link>
                <Link className='px-4 py-1.5 focus:bg-red-500 focus:border-red-500 hover:bg-red-500 hover:border-red-500 mx-1 mb-4 text-gray-900 border border-gray-200 rounded-full sm:mx-2 hover:no-underline' href='/stores'>Stores</Link>
                <Link className='px-4 py-1.5 focus:bg-red-500 focus:border-red-500 hover:bg-red-500 hover:border-red-500 mx-1 mb-4 text-gray-900 border border-gray-200 rounded-full sm:mx-2 hover:no-underline' href='/reviews'>Reviews</Link>
                <Link className='px-4 py-1.5 focus:bg-red-500 focus:border-red-500 hover:bg-red-500 hover:border-red-500 mx-1 mb-4 text-gray-900 border border-gray-200 rounded-full sm:mx-2 hover:no-underline' href='/reviewsUsers'>Reviews Users</Link>
            </div>
            <div className='justify-center font-serif sm:px-4 lg:px-6'>
                <ProductBox data={props.data} />
            </div>
        </div>
    );
}
