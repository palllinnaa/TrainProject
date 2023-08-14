import React from 'react'
import { useDispatch } from 'react-redux';
import { changePaginationParams } from '../redux/actions/action';
import { makePaginationFilter } from '../server/constants';
import { ITableColumn } from '../server/interfaces/common';

interface IPaginationFilterProps {
  pagination: boolean;
  column: ITableColumn;
  pageName: string;
  currentPage: number;
  perPage: number;
}

export default function PaginationFilter(props: IPaginationFilterProps) {
  const { pagination, column, pageName, currentPage, perPage } = props;
  const dispatch = useDispatch();

  return (
    pagination ? column.filter.comparativeFilter ? <div className='table-cell px-2 py-2 text-sm text-gray-400 uppercase lg:px-4'>
      {column.label}
      {
        column.filter.values.map(value => (
          Object.keys(column.filter.filterActions).map(actionKey => (
            actionKey !== value ? <></> :
              column.filter.filterActions[actionKey] === '=' ?
                <button
                  onClick={() => dispatch(changePaginationParams(pageName, 1, perPage, makePaginationFilter(column.key, column.label, value, column.filter.filterActions[actionKey])))}
                  className={` ${column.filter.values[0] === value && 'ml-1'} px-2 text-gray-800 border border-gray-200 hover:border-gray-300 hover:bg-gray-200`}
                >
                  is {value}
                </button> : <button
                  onClick={() => dispatch(changePaginationParams(pageName, 1, perPage, makePaginationFilter(column.key, column.label, value, column.filter.filterActions[actionKey])))}
                  className={` ${column.filter.values[0] === value && 'ml-1'} px-2 text-gray-800 border border-gray-200 hover:border-gray-300 hover:bg-gray-200`}
                >
                  {column.filter.filterActions[actionKey]} {value}
                </button>
          ))
        ))
      }
    </div> : <div className='table-cell px-2 py-2 text-sm text-gray-400 uppercase lg:px-4'>
      {column.label}
      <button
        onClick={() => dispatch(changePaginationParams(pageName, currentPage, perPage, makePaginationFilter(column.key, column.label, 'upSort')))}
        className='px-2 ml-1.5 text-gray-800 border border-gray-200 hover:border-gray-300 hover:bg-gray-200'
      >
        &#x25b4;
      </button>
      <button
        onClick={() => dispatch(changePaginationParams(pageName, currentPage, perPage, makePaginationFilter(column.key, column.label, 'downSort')))}
        className='px-2 text-gray-800 border border-gray-200 hover:bg-gray-200 hover:border-gray-300'
      >
        &#x25be;
      </button>
    </div> : <></>
  )
}
