import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react'

interface ITableProps {
  data: object[];
  tableName?: string;
  caption?: string;
  columns: {
    key: string;
    label: string;
    type?: string;
    linkRout?: string;
    render?: (data: any) => ReactNode;
  }[]
}

function useWindowSize(data) {
  const [numberToMap, setNumberToMap] = useState(0);

  useEffect(() => {
    function handleResize() {
      // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
      if (window.innerWidth < 640) {
        setNumberToMap(2);
      } else if (640 <= window.innerWidth && window.innerWidth < 1024) {
        setNumberToMap(3);
      } else if (1021 <= window.innerWidth && window.innerWidth < 1280) {
        setNumberToMap(5);
      } else {
        setNumberToMap(data.length);
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize();
  });
  return numberToMap;
}

export default function Table(props: ITableProps) {
  const { data, tableName, columns, caption } = props;
  const numberToMap = useWindowSize(columns);

  const mapData = (number) => (
    data.map(item => (
      <div className='table-row'>
        {
          columns?.slice(0, (number)).map((column) => (
            !column.linkRout && !column.render ? <div className='table-cell px-4 py-2 border-y'>
              {item[column.key]}
            </div> : column.linkRout ? <div className='table-cell px-4 py-2 border-y'>
              <Link className='text-black hover:no-underline hover:font-semibold' href={`/${column.linkRout}/${item.id}`}>{item[column.key]}</Link>
            </div> : column.render && <div className='table-cell px-4 py-2 border-y'>
              {column.render(item[column.key])}
            </div>
          ))
        }
      </div>
    ))
  )

  const mapColumns = (number) => (
    columns?.slice(0, (number)).map(column => (
      <div className='table-cell px-2 py-2 text-sm text-gray-400 uppercase lg:px-4'>{column.label}</div>
    ))
  )

  return (
    <div className='font-serif'>
      <div className='flex justify-center py-5'>
        <h1 className='items-center font-bold'>{tableName}</h1>
      </div>
      <div className='px-2 lg:px-4'>
        <div className='table w-full text-left '>
          <div className='table-header-group'>
            <div className="table-row">
              {mapColumns(numberToMap)}
            </div>
          </div>
          <div className='table-row-group'>
            {mapData(numberToMap)}
            <div className={` ${numberToMap === 0 ? 'block' : 'hidden'} flex justify-center pt-2 pb-6 `}>
              <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>
          </div>
          <div className='table-caption py-3 caption-bottom'>
            <div className='flex justify-center w-full'>
              <p className='text-sm text-gray-400 caption-bottom'>
                {caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}