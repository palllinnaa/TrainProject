import React from 'react'
import { useDispatch } from 'react-redux';
import { changePaginationParams } from '../redux/actions/action';
import { IPaginationFilter } from '../server/interfaces/common';

interface IPaginationButtonsProps {
    pageName: string;
    currentPage: number;
    totalCount: number;
    perPage: number;
    pagination: boolean;
    limits: number[];
    filter: IPaginationFilter;
}

function PaginationButtons(props: IPaginationButtonsProps) {
    const { pageName, currentPage, totalCount, perPage, filter, pagination, limits } = props;
    const count: number = Math.ceil(totalCount / perPage);
    const dispatch = useDispatch();

    return (
        pagination ? <div>
            <div className='flex justify-center'>
                <div className='table-caption py-3 caption-bottom'>
                    <div className='flex justify-center w-full'>
                        <p className='text-sm text-gray-400 caption-bottom'>
                            Showing {currentPage === 1 ?
                                1 :
                                (currentPage - 1) * perPage + 1} - {currentPage * perPage <= totalCount ?
                                    currentPage * perPage :
                                    totalCount} of {totalCount} results
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div className='sm:flex sm:justify-between'>
                    <div className='flex justify-center '>
                        <div>
                            <button
                                onClick={() => dispatch(changePaginationParams(pageName, 1, perPage, filter))}
                                className={`${currentPage === 1 && 'hidden'} px-2.5 text-gray-800 border border-gray-300 hover:bg-gray-200 rounded-l-md`}
                            >
                                &laquo;
                            </button>
                            <button
                                onClick={() => dispatch(changePaginationParams(pageName, currentPage - 1, perPage, filter))}
                                className={`${currentPage === 1 && 'hidden'} px-2.5 text-gray-800 border border-gray-300 hover:bg-gray-200`}
                            >
                                &lsaquo;
                            </button>
                            <button
                                className={`${(currentPage !== count || totalCount <= perPage) && 'hidden'} px-2.5 text-gray-800 border border-gray-300`}
                            >
                                ...
                            </button>
                            <button
                                disabled
                                className={`${totalCount <= perPage ? 'hidden' : currentPage === 1 ? 'rounded-l-md' : currentPage === count && 'rounded-r-md'} px-2.5 text-gray-800 border border-gray-300 hover:bg-gray-200`}
                            >
                                {currentPage}
                            </button>
                            <button
                                className={`${(currentPage !== 1 || totalCount <= perPage) && 'hidden'} px-2.5 text-gray-800 border border-gray-300`}
                            >
                                ...
                            </button>
                            <button
                                onClick={() => dispatch(changePaginationParams(pageName, currentPage + 1, perPage, filter))}
                                className={`${currentPage === count && 'hidden'} px-2.5 text-gray-800 border border-gray-300 hover:bg-gray-200`}
                            >
                                &rsaquo;
                            </button>
                            <button
                                onClick={() => dispatch(changePaginationParams(pageName, count, perPage, filter))}
                                className={`${currentPage === count && 'hidden'} px-2.5 text-gray-800 border border-gray-300 hover:bg-gray-200 rounded-r-md`}
                            >
                                &raquo;
                            </button>
                        </div>
                    </div>
                    <div className='mt-2 sm:mt-0'>
                        <div className='flex justify-center pb-6'>
                            {
                                limits ? limits.map(limit => (
                                    <button
                                        onClick={() => dispatch(changePaginationParams(pageName, currentPage * limit < totalCount ? currentPage : Math.ceil(totalCount / limit), limit, filter))}
                                        className={`${perPage === limit && 'bg-gray-200'} px-2.5 text-gray-800 border border-gray-300 hover:bg-gray-200`}
                                    >
                                        {limit}
                                    </button>
                                )) : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div> : <></>
    )
}

export default PaginationButtons;