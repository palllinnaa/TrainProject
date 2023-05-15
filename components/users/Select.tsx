import React from 'react'

interface ISelectProps {
    name: string;
    value: any;
    onChange: (value: any) => void;
    onBlur: (e: any) => void;
    error?: string | boolean;
    options: {
        label: string;
        value: string;
    }[]
}

export default function Select(props: ISelectProps) {
    const { error, options, ...rest } = props;
    return (
        <div>
            <select
                {...rest}
                className={`${error ? 'border-2 border-red-500' : 'border border-white focus:border-gray-200'} w-64 px-2 py-4 my-2 font-serif text-sm text-gray-800 bg-gray-100  rounded-lg appearance-none lg:w-96 lg:py-5 sm:w-80 focus:outline-none focus:bg-white focus:text-gray-900`} >
                <option className='font-serif text-sm text-gray-800' value="" disabled selected>Select your role</option>
                {
                    options.map((option) => (
                        <option value={option.value} label={option.label} />
                    ))
                }
            </select>
            <div>
                <p className='px-2 -mt-2 text-xs text-red-500'>{error}</p>
            </div>
        </div>
    )
}
