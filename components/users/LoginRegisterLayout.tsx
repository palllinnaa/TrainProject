import React from 'react'
interface IParentComponentProps {
    children?: React.ReactNode;
}

export default function LoginRegisterLayout({children}: IParentComponentProps) {
    return (
        <div className='w-screen h-full lg:flex'>
            <div className='w-full py-4 bg-blue-100 lg:pb-0 lg:w-3/4 '>
                <div className='flex justify-center'>
                    <img className='px-8 mt-2 lg:my-32 w-72' src="../images/logo_transparent.png" alt="logo" />
                </div>
                <div className='flex justify-center lg:mt-8'>
                    <img className='mx-4 mt-4 lg:mt-6 sm:max-w-sm lg:max-w-md' src="../images/LoginRegisterLayoutImage.png" alt="login register layout image" />
                </div>
            </div>
            <div className='lg:w-full lg:flex lg:items-center lg:justify-center'>
                {children}
            </div>
        </div>
    )
}