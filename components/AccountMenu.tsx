import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

export default function AccountMenu() {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    const keyDownEvent = (event: any) => {
        if (event.code === "Escape") {
            setIsActive(() => false);
        }
    };

    function useOutsideAlerter(ref) {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsActive(false);
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }
    
    useOutsideAlerter(dropdownRef);

    return (
        <div ref={dropdownRef} className='relative px-5 py-3 sm:py-0 sm:ml-3 sm:px-0'>
            <div className='flex items-center sm:hidden'>
                <img className='object-cover w-10 h-10 border-2 border-gray-600 rounded-full' src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80" alt="" />
                <span className='ml-2 font-semibold text-gray-200 sm:hidden'>Isla Schoger</span>
            </div>
            <div className="relative">
                <button
                    onClick={onClick}
                    onKeyDown={keyDownEvent}
                    type="button"
                    className="hidden sm:block sm:focus:outline-none"
                >
                    <img className={`hover:border-indigo-500 object-cover w-8 h-8 border-2 rounded-full ${isActive ? "border-indigo-500" : ""}`} src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80" alt="" />
                </button>
                <div  className={`menu z-10 ${isActive ? 'sm:block' : 'sm:hidden'} xl:border mt-4 sm:bg-white sm:rounded-lg sm:absolute sm:right-0 sm:w-48 sm:mt-3 sm:shadow-xl sm:py-2`}>
                    <Link href="" className='block text-gray-400 hover:text-white hover:no-underline sm:text-gray-800 sm:px-4 sm:py-2 sm:hover:bg-indigo-500'>Account Settings</Link>
                    <Link href="" className='block mt-3 text-gray-400 hover:text-white hover:no-underline sm:text-gray-800 sm:px-4 sm:mt-0 sm:py-2 sm:hover:bg-indigo-500'>Support</Link>
                    <Link href="" className='block mt-3 text-gray-400 hover:text-white hover:no-underline sm:text-gray-800 sm:px-4 sm:mt-0 sm:py-2 sm:hover:bg-indigo-500'>Sign out</Link>
                </div>
            </div>
        </div>
    );


}