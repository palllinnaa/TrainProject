export default function Search() {
  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 flex items-center pl-3 right-4">
        <img className="w-5 h-5" src="images/search_icon.png" alt="search icon" />
      </div>
      <input className="w-full py-2 pl-10 pr-4 font-serif text-gray-800 bg-gray-100 border border-white rounded-full  focus:border-gray-200 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search by name" />
    </div>
  )
}