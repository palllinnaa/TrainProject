import React from 'react';
import { LogoIconLightTheme } from '../src/icons';
import Link from 'next/link';

export default function HomePage(props) {
    return (
        <div>
            <div className='antialiased bg-gray-100'>
                <div className='max-w-xl px-8 py-12 mx-auto lg:py-20 lg:max-w-full lg:px-0 lg:relative lg:min-h-screen'>
                    <div className='xl:max-w-6xl lg:mx-auto'>
                        <div className='lg:w-7/12 lg:pl-12 lg:pr-8'>
                            <LogoIconLightTheme />
                            <div className='mt-8 lg:mt-0 lg:w-5/12 lg:inset-y-0 lg:right-0 lg:absolute'>
                                <img className='object-cover object-center w-full rounded-lg shadow-xl lg:object-left h-46 sm:h-56 lg:inset-0 lg:h-full lg:shadow-none lg:rounded-none' src="https://klike.net/uploads/posts/2023-01/1674112604_2-2.jpg" alt="Woman workcationing on beach" />
                                <svg className='absolute inset-y-0 left-0 hidden w-16 h-full lg:block' viewBox="0 0 100 100" preserveAspectRatio='none' fill="none" height="32" width="185" xmlns="http://www.w3.org/2000/svg">
                                    <polygon className='text-gray-100' fill='currentColor' points='0,0 0,100 100,0' />
                                </svg>
                            </div>
                            <h1 className='mt-8 text-3xl font-bold leading-tight text-gray-900 lg:mt-12 sm:text-4xl'>
                                You can work from anywhere.
                                <br className='hidden sm:inline' />
                                <span className='text-indigo-500'> Take advantage of it.</span>
                            </h1>
                            <p className='mt-4 text-xl text-gray-600'>
                                Workcation helps you find work-friendly rentals in beautiful locations so you can enjoy some nice weather even when you're not on vacation.
                            </p>
                            <div className='mt-6'>
                                <Link href="/WorKcation?" className='inline-block px-5 py-3 font-semibold tracking-wide text-white uppercase bg-indigo-500 rounded-lg shadow-lg hover:no-underline hover:bg-indigo-400' >Book your escape</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );

}

