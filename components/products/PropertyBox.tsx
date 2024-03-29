export default function PropertyBox(props) {
    const { properties } = props;
    
    return (
        <div className="mt-2">
            {
                properties?.map((item, index) => (
                    <span key={index} className='inline-block px-2 py-1 mr-2 text-xs leading-none tracking-wide text-gray-800 uppercase bg-gray-100 rounded-full'>{item}</span>
                ))
            }
        </div>
    )
}
