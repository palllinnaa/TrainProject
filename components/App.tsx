import React from 'react';
import { SearchFilters } from '../components/SearchFilters';
import { SiteHeader } from '../components/SiteHeader';
import { ICardData } from '../src/interfaces';
import PropertyCard from './PropertyCard';


const data: ICardData[] = [
    {
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        bads: 3,
        baths: 2,
        title: 'Modern home at city center',
        price: '$1,400',
        reviewCount: 34,
        rating: 5,
    },
    {
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
        bads: 4,
        baths: 2,
        title: 'Isolated house outside of...        ',
        price: '$1,250',
        reviewCount: 56,
        rating: 4,
    },
    {
        image: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1481&q=80",
        bads: 5,
        baths: 4,
        title: 'Large dream home with...        ',
        price: '$1,300',
        reviewCount: 30,
        rating: 4,
    },
    {
        image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        bads: 3,
        baths: 1,
        title: 'Modern home at city center',
        price: '$1,100',
        reviewCount: 22,
        rating: 3,
    },
    {
        image: "https://images.unsplash.com/photo-1604014238170-4def1e4e6fcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        bads: 2,
        baths: 1,
        title: 'Modern home at city center',
        price: '$1,000',
        reviewCount: 17,
        rating: 3,
    },
]

export default function App(props) {
    return (
        <div>
            <div id="app" className='min-h-screen antialiased bg-gray-200 xl:flex xl:flex-col xl:h-screen'>
                <div className='xl:flex-shrink-0'>
                    <SiteHeader />
                </div>
                <div className='xl:flex-1 xl:flex xl:overflow-y-hidden'>
                    <SearchFilters />

                    <main className='py-6 xl:flex-1 xl:overflow-x-hidden'>
                    <div className='px-4'>
                            <h3 className='text-xl text-gray-900'>Los Angeles</h3>
                            <p className='text-gray-600'>Live like a stars in these luxurious Southern California estates.</p>
                        </div>
                        <div className='mt-5 sm:overflow-x-auto'>
                            <PropertyCard data={data} />
                        </div>
                        <div className='px-4 mt-6'>
                            <h3 className='text-xl text-gray-900'>Los Angeles</h3>
                            <p className='text-gray-600'>Live like a stars in these luxurious Southern California estates.</p>
                        </div>
                        <div className='mt-5 sm:overflow-x-auto'>
                            <PropertyCard data={data} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
