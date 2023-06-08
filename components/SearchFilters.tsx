//use in old files (file example)

import React, { useState } from "react";
import { FilterIcon, SearchIcon } from '../src/icons';

export const SearchFilters = () => {
    const dropdownRef = React.useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    return (
        <div className='bg-gray-800 xl:w-72'>
            <div className='flex p-4 py-3 text-white xl:hidden'>
                <div className='relative flex-1 mr-2'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
                        <SearchIcon />
                    </div>
                    <input className='w-3/4 py-2 pl-10 pr-4 text-white bg-gray-900 rounded-lg focus:outline-none focus:bg-white focus:text-gray-900' placeholder='Search by keywords' />
                </div>

                <button onClick={onClick} type="button" className='flex py-2 pl-3 pr-4 bg-gray-700 rounded-lg shadow focus:outline-none focus:shadow-outline'>
                    <FilterIcon />
                    <span className='ml-1 font-medium text-white'>Filters</span>

                </button>
            </div>
            <form ref={dropdownRef} className={`menu ${isActive ? '' : 'hidden'} xl:flex xl:flex-col xl:justify-between xl:h-s h-full overflow-y-auto`}>
                <div className="lg:flex xl:block">
                    <div className='px-4 py-4 border-t border-gray-900 lg:w-1/3 xl:border-t-0 xl:w-full'>
                        <div className="flex flex-wrap -mx-2">
                            <label className='block w-1/2 px-2 sm:w-1/4 lg:w-1/2'>
                                <span className='text-sm font-semibold text-gray-500 '>Bedrooms</span>
                                <select className='block w-full mt-1 text-white shadow form-select focus:bg-gray-600'>
                                    <option>4</option>
                                </select>
                            </label>
                            <label className='block w-1/2 px-2 sm:w-1/4 lg:w-1/2'>
                                <span className='text-sm font-semibold text-gray-500 '>Bathrooms</span>
                                <select className='block w-full mt-1 text-white shadow form-select focus:bg-gray-600'>
                                    <option>2</option>
                                </select>
                            </label>
                            <label className="block w-full px-2 mt-4 sm:w-1/2 sm:mt-0 lg:w-full lg:mt-4">
                                <span className='text-sm font-semibold text-gray-500 '>Price Range</span>
                                <select className='block w-full mt-1 text-white shadow form-select focus:bg-gray-600'>
                                    <option className='form-select '>Up to $2,000/wk</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className='px-4 py-4 border-t border-gray-900 lg:border-l lg:w-1/3 xl:w-full'>
                        <span className='block text-sm font-semibold text-gray-500'>Property type</span>
                        <div className="sm:flex sm:-mx-2 lg:block lg:mx-0">
                            <label className='flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-full lg:px-0'>
                                <input className='bg-gray-900 form-radio focus:bg-gray-700' type="radio" name="propertyType" value="house" />
                                <span className='ml-2 text-white'>House</span>
                            </label>
                            <label className='flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-full lg:px-0'>
                                <input className='bg-gray-900 form-radio focus:bg-gray-700' type="radio" name="propertyType" value="apartment" />
                                <span className='ml-2 text-white'>Apartment</span>
                            </label>
                            <label className='flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-full lg:px-0'>
                                <input className='bg-gray-900 form-radio focus:bg-gray-700' type="radio" name="propertyType" value="loft" />
                                <span className='ml-2 text-white'>Loft</span>
                            </label>
                            <label className='flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-full lg:px-0'>
                                <input className='bg-gray-900 form-radio focus:bg-gray-700' type="radio" name="propertyType" value="townhouse" />
                                <span className='ml-2 text-white'>Townhouse</span>
                            </label>
                        </div>
                    </div>
                    <div className='px-4 py-4 border-t border-gray-900 lg:border-l lg:w-1/3 xl:w-full'>
                        <span className='block text-sm font-semibold text-gray-500'>Amenities</span>
                        <div className="sm:flex sm:-mx-2 sm:flex-wrap">
                            <label className='flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full'>
                                <input className='bg-gray-900 form-checkbox focus:bg-gray-700' type="checkbox" name="balcony" />
                                <span className='ml-2 text-white'>Balcony</span>
                            </label>
                            <label className='flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full'>
                                <input className='bg-gray-900 form-checkbox focus:bg-gray-700' type="checkbox" name="pool" />
                                <span className='ml-2 text-white'>Pool</span>
                            </label>
                            <label className='flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full'>
                                <input className='bg-gray-900 form-checkbox focus:bg-gray-700' type="checkbox" name="beach" />
                                <span className='ml-2 text-white'>Beach</span>
                            </label>
                            <label className='flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full'>
                                <input className='bg-gray-900 form-checkbox focus:bg-gray-700' type="checkbox" name="petFriendly" />
                                <span className='ml-2 text-white'>Pet friendly</span>
                            </label>
                            <label className='flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full'>
                                <input className='bg-gray-900 form-checkbox focus:bg-gray-700' type="checkbox" name="kidFriendly" />
                                <span className='ml-2 text-white'>Kid friendly</span>
                            </label>
                            <label className='flex items-center mt-3 sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full'>
                                <input className='bg-gray-900 form-checkbox focus:bg-gray-700' type="checkbox" name="perking" />
                                <span className='ml-2 text-white'>Parking</span>
                            </label>
                            <label className='flex items-center mt-3 sm:w-1/2 sm:px-2 lg:w-full'>
                                <input className='bg-gray-900 form-checkbox focus:bg-gray-700' type="checkbox" name="airConditioning" />
                                <span className='ml-2 text-white'>Air conditioning</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='px-4 py-4 bg-gray-900'>
                    <button className='block w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded-lg xl:block xl:w-full sm:w-auto sm:inline-block hover:bg-indigo-400'>Update results</button>
                </div>
            </form>
        </div>

    )
}