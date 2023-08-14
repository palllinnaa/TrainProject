import React from 'react'
import { useDispatch } from 'react-redux';
import { changePaginationParams } from '../redux/actions/action';
import { makePaginationFilter } from '../server/constants';
import { IPaginationFilter } from '../server/interfaces/common'

interface IClosePaginationFiltersButtonProps {
    pageName: string;
    perPage: number;
    filter: IPaginationFilter
}

export default function ClosePaginationFiltersButton(props: IClosePaginationFiltersButtonProps) {
    const { pageName, perPage, filter } = props;
    const dispatch = useDispatch();

    return (
        <div className='flex justify-end px-4 my-2'>
            {
                filter?.columnName && <div>
                    <button
                        onClick={() => dispatch(changePaginationParams(pageName, 1, perPage, makePaginationFilter()))}
                        className='px-2 border border-gray-200 hover:border-gray-300 hover:bg-gray-200'
                    >
                        &#x2715;
                    </button>
                </div>
            }
        </div>
    )
}
