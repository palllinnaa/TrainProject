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
        <div ref={dropdownRef} className='relative'>
            <button
                onClick={onClick}
                onKeyDown={keyDownEvent}
                type="button"
                className="sm:hidden"
            >
                <img className={` ${isActive ? 'border-gray-300' : ''}  object-cover w-8 h-8 border-gray-300 rounded-full hover:border-2`} src="../images/user.png" alt="default profile picture" />
            </button>
            <div className={`menu z-10 ${isActive ? 'block' : 'hidden'} sm:flex sm:border-0 sm:shadow-none absolute sm:right-0 border sm:bg-inherit sm:mt-0 mt-1 bg-white rounded-lg shadow-md sm:px-0 px-3 py-2`}>
                <Link className="block text-gray-900 border-gray-100 rounded-full sm:px-4 hover:no-underline sm:ml-2 sm:text-sm sm:py-1 sm:focus:border-gray-200 sm:border sm:hover:border-gray-200 " href='/login'>Login</Link>
                <Link className="block mt-2 text-gray-900 sm:mt-0 sm:px-4 sm:border sm:focus:bg-blue-100 sm:hover:bg-blue-100 sm:border-blue-200 sm:py-1 sm:rounded-full hover:no-underline sm:ml-2 sm:text-sm sm:text-blue-600 sm:bg-blue-200" href='/register'>Register</Link>
            </div>
        </div>
    );
}
