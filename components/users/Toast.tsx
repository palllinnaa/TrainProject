import React from 'react'

export default function Toast(props) {
    const { show } = props;
    const { text } = props;

    if (show === true) {
        return (
            <div>
                <div className='flex items-center justify-center w-64 mt-4 bg-red-200 border border-red-300 rounded-lg shadow-md shadow-red-500/75 h-14 lg:h-16 lg:w-96 sm:w-80'>
                    <p className='text-sm font-semibold text-center text-red-500 lg:text-lg'>ERROR: {text}</p>
                </div>
            </div>
        )
    } else {
        return (
            <></>
        )
    }

}