const Navbar = () => {
  return (
    <nav className="flex justify-between bg-purple-300 p-2 px-5 sm:w-[100vw] w-full">
        <div className="logo">
            <span className="font-bold text-2xl mx-9 my-2">iToDO</span>
        </div>
        <ul className="flex gap-5 mx-9 my-1">
            <li className="cursor-pointer hover:font-bold transition-all duration-150">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all duration-150 w-20">Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
