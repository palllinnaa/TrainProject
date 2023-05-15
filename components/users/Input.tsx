import React from 'react'

interface IInputProps {
    name: string;
    type?: string;
    label?: string,
    value: any;
    placeholder?: string;
    onChange: (value: any) => void;
    onBlur: (e: any) => void;
    error?: string | boolean;
}

export default function InputForm(props: IInputProps) {
    const { label, error, ...rest } = props;
    return (
        <div className='font-serif'>
            <div>
                <label className='font-semibold text-gray-800'>{label}</label>
            </div>
            <div>
                <input
                    {...rest}
                    className={` ${error ? 'border-2 border-red-500' : 'border border-white focus:border-gray-200'} w-64 px-2 py-3 my-2 text-gray-800 bg-gray-100 rounded-lg lg:py-4 lg:w-96 sm:w-80 focus:outline-none focus:bg-white focus:text-gray-900`} />
            </div>
            <div>
                <p className='px-2 mb-2 -mt-2 text-xs text-red-500'>{error}</p>
            </div>
        </div>
    )
}