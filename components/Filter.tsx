import { useEffect, useRef, useState } from "react";

export default function Filter() {
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
        <div ref={dropdownRef} className='relative flex items-center '>
            <button
                onClick={onClick}
                onKeyDown={keyDownEvent}
                type="button" >
                <img className={` ${isActive ? 'border-gray-300' : ''}  object-cover w-8 h-8 hover:border-gray-300 rounded-lg`} src="images/setting.png" alt="filter icon" />
            </button>
            <div className={` z-10 ${isActive ? 'block' : 'hidden'} top-10 absolute border bg-white rounded-lg shadow-md px-3 py-2`}>
                <span className="block text-gray-900 hover:no-underline">filter</span>
                <span className="block mt-2 text-gray-900 hover:no-underline">filter</span>
                <span className="block mt-2 text-gray-900 hover:no-underline">filter</span>
            </div>
        </div>
    );
}
